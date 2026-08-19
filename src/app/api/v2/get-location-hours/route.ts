// should go into the src/app/v2/get-location-hours folder
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const location = request.nextUrl.searchParams.get("location");

  // console.log(`date: ${date}`);
  // console.log(`location: ${location}`);

  // Using the date and location, the API, safely on the server side, can connect to a database and retrieve the necessary data

  const locationHourData = [
    {
      open: "00:00:00", // HH:MM:SS
      close: "01:00:00",
    },
    {
      open: "06:00:00",
      close: "23:59:00",
    },
  ];

  // static method call
  return NextResponse.json(locationHourData);
}
