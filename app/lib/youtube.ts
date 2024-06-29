import axios from "axios";

export const fetchVideos = async (
  _accessToken: string,
  startDate: string,
  endDate: string,
) => {
  const response = await axios.get("/api/youtube/videos", {
    // headers: {
    //   Authorization: `Bearer ${_accessToken}`,
    // },
    params: {
      startDate,
      endDate,
    },
  });

  return response.data;
};

export const fetchChannels = async () => {
  const response = await axios.get("/api/youtube/channels");

  return response.data;
};
