import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "statistics",
          id: process.env.YOUTUBE_CHANNEL_ID ?? "",
          key: process.env.YOUTUBE_API_KEY ?? "",
        },
      },
    );

    const channels = response.data;

    return NextResponse.json(channels);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed fetch channels";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
