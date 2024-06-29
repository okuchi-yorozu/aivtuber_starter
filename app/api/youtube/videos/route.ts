import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 },
    );
  }

  // const authorization = req.headers.get("authorization");
  // if (!authorization) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  // const accessToken = authorization.split(" ")[1];

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
        params: {
          part: "snippet",
          channelId: process.env.YOUTUBE_CHANNEL_ID ?? "",
          publishedAfter: startDate,
          publishedBefore: endDate,
          type: "video",
          key: process.env.YOUTUBE_API_KEY ?? "",
          maxResults: "50",
        },
      },
    );

    const videoIds = response.data.items
      .map((item: any) => item.id.videoId)
      .join(",");

    const videoResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "statistics,snippet,contentDetails,liveStreamingDetails",
          id: videoIds,
          key: process.env.YOUTUBE_API_KEY ?? "",
        },
      },
    );

    const videos = videoResponse.data.items;

    return NextResponse.json({ videos });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed fetch videos";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
