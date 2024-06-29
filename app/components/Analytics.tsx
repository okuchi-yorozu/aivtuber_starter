"use client";

import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Spin,
  Statistic,
  Table,
  Typography,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
const { Title } = Typography;

import { useFetchVideos } from "@/app/hooks/useFetchVideos";
import { toDurationString, toSeconds } from "@/app/lib/time";
import { fetchChannels } from "@/app/lib/youtube";

const { RangePicker } = DatePicker;

// # 取得するのが無理な項目
// - 特定のライブ配信からチャンネル登録してくれた人の数
// - 最大同接/平均同接
const Analytics = () => {
  const { data: session, status } = useSession();
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const queryClient = new QueryClient();
  const { mutate, data: videosResponse, isPending } = useFetchVideos();

  const { data: channels, isPending: isChannelsPending } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });
  const handleClick = () => {
    if (session?.accessToken == null) return;
    if (dateRange == null || dateRange[0] == null || dateRange[1] == null)
      return;

    mutate({
      accessToken: session.accessToken,
      startDate: dateRange[0].toISOString(),
      endDate: dateRange[1].toISOString(),
    });
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates);
  };

  if (status === "unauthenticated") {
    return (
      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
    );
  }

  const columns = [
    {
      title: "",
      dataIndex: "snippet",
      key: "thumbnails",
      render: (text: any) => (
        <img
          src={text.thumbnails.maxres.url}
          width={160}
          height={90}
          alt="thumbnails"
        />
      ),
      width: 200,
    },
    {
      title: "タイトル",
      dataIndex: "snippet",
      key: "title",
      render: (text: any, record: any) => (
        <a href={`https://www.youtube.com/watch?v=${record.id}`}>
          {text.title}
        </a>
      ),
      width: 400,
    },
    {
      title: "公開日",
      dataIndex: "snippet",
      key: "publishedAt",
      sorter: (a: any, b: any) =>
        dayjs(a.snippet.publishedAt).unix() -
        dayjs(b.snippet.publishedAt).unix(),
      render: (text: any) => (
        <span>{dayjs(text.publishedAt).format("YYYY-MM-DD HH:mm")}</span>
      ),
    },
    {
      title: <LikeOutlined />,
      dataIndex: "statistics",
      key: "likeCount",
      sorter: (a: any, b: any) =>
        a.statistics.likeCount - b.statistics.likeCount,
      render: (text: any) => <span>{text?.likeCount}</span>,
      defaultSortOrder: "descend" as const,
      width: 100,
    },
    {
      title: <EyeOutlined />,
      dataIndex: "statistics",
      key: "viewCount",
      sorter: (a: any, b: any) =>
        a.statistics.viewCount - b.statistics.viewCount,
      render: (text: any) => <span>{text?.viewCount}</span>,
      width: 100,
    },
    {
      title: "配信時間",
      dataIndex: "contentDetails",
      key: "duration",
      sorter: (a: any, b: any) =>
        toSeconds(a.contentDetails.duration) -
        toSeconds(b.contentDetails.duration),
      render: (text: any) => <span>{toDurationString(text?.duration)}</span>,
      width: 100,
    },
    {
      title: "最大/平均",
      key: "concurrentViewers",
      render: (text: any, record: any) => {
        const videoId = record.id;
        const analyticsUrl = `https://studio.youtube.com/video/${videoId}/analytics/tab-overview/period-default`;
        return (
          <a href={analyticsUrl} target="_blank" rel="noopener noreferrer">
            同時視聴者数
          </a>
        );
      },
    },
  ];

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Title>YouTube Analytics</Title>
          <Spin spinning={isChannelsPending}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="チャンネル登録者数"
                    value={channels?.items[0].statistics.subscriberCount}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="視聴回数"
                    value={channels?.items[0].statistics.viewCount}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="動画数"
                    value={channels?.items[0].statistics.videoCount}
                  />
                </Card>
              </Col>
            </Row>
          </Spin>
          <div style={{ margin: "20px 0" }}>
            <RangePicker onChange={handleDateChange} />
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              onClick={handleClick}
            >
              Search
            </Button>
          </div>
          <Table
            dataSource={videosResponse?.videos ?? []}
            columns={columns}
            rowKey={(row) => row.id}
            loading={isPending}
          />
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Analytics;
