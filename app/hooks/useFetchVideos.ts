import { DefaultError, useMutation } from "@tanstack/react-query";

import { fetchVideos } from "@/app/lib/youtube";

type VideosResponse = {
  videos: Video[];
};

type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    thumbnails: {
      maxres: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
};

export const useFetchVideos = () => {
  return useMutation<
    VideosResponse,
    DefaultError,
    { accessToken: string; startDate: string; endDate: string }
  >({
    mutationFn: ({ accessToken, startDate, endDate }) =>
      fetchVideos(accessToken, startDate, endDate),
  });
};
