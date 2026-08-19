// Utility functions for working with and generating dates
export async function generatePickupTimes(date: Date, location?: string) {
  const url = new URL("/api/v2/get-location-hours", window.location.origin);
  // https://rydio.com/api/v2/get-location-hours
  url.searchParams.set("date", date.toISOString());
  // https://rydio.com/api/v2/get-location-hours?date=2011-10-05T14:48:00.000Z
  if (location) {
    url.searchParams.set("location", location);
  }
  // https://rydio.com/api/v2/get-location-hours?date=2011-10-05T14:48:00.000Z&location=3g45k6j345k
  const response = await fetch(url.toString());

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(`Failed to fetch pickup times: ${response.status} ${bodyText}`);
  }

  const openHours = await response.json();

  if (!Array.isArray(openHours) || openHours.length === 0) {
    return [];
  }

  // const openHours = [
  //   {
  //     open: '00:00:00', // HH:MM:SS
  //     close: '01:00:00',
  //   },
  //   {
  //     open: "06:00:00",
  //     close: "23:59:00",
  //   },
  // ];

  let pickupTime = new Date(date);
  const pickupTimes = [];
  const today = new Date();

  // if the pickup date is today
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    pickupTime = new Date(today);
    // Round the current time to the next 30 minute mark
    if (pickupTime.getMinutes() >= 30) {
      pickupTime.setMinutes(0);
      pickupTime.setHours(pickupTime.getHours() + 1);
    } else {
      pickupTime.setMinutes(30);
    }
  }
  // if the pickup is not today, set start time equal to midnight OR when the store opens
  else {
    const openingTime = openHours[0].open; // "00:00:00"

    pickupTime.setHours(parseInt(openingTime.slice(0, 2)));
    pickupTime.setMinutes(parseInt(openingTime.slice(3, 5)));
  }

  // Add our initial time to our pickupTimes array and keep adding times 30 minutes after the previous until we reach 23:30
  let pickupDay = pickupTime.getDate(); // 17

  let latestPickupTime = new Date(pickupTime);
  const closingTime = openHours[0].close; // "01:00:00"
  latestPickupTime.setHours(parseInt(closingTime.slice(0, 2)));
  latestPickupTime.setMinutes(parseInt(closingTime.slice(3, 5)));

  while (pickupTime.getDate() === pickupDay && pickupTime <= latestPickupTime) {
    pickupTimes.push({
      label: pickupTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      value: pickupTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "numeric",
        hour12: false,
      }),
    });
    pickupTime.setMinutes(pickupTime.getMinutes() + 30);
  }

  return pickupTimes;
}

// The optional pickup time would extend the function such that if there was a defined pickup time, the earliest option for drop off would be the pickup time plus 1 hour
export function generateDropOffTimes(date: Date, pickupTime?: Date) {
  let dropOffTime = new Date(date);
  const dropOffTimes = [];
  const today = new Date();

  // if the pickup date is today
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    dropOffTime = new Date(today);
    // Round the current time to the next 30 minute mark
    if (dropOffTime.getMinutes() >= 30) {
      dropOffTime.setMinutes(0);
      dropOffTime.setHours(dropOffTime.getHours() + 2);
    } else {
      dropOffTime.setMinutes(30);
      dropOffTime.setHours(dropOffTime.getHours() + 1);
    }
  }
  // if the pickup is not today
  else {
    dropOffTime.setHours(0);
    dropOffTime.setMinutes(0);
  }

  // Add our initial time to our dropOffTimes array and keep adding times 30 minutes after the previous until we reach 23:30
  let dropOffDay = dropOffTime.getDate();
  while (dropOffTime.getDate() === dropOffDay) {
    dropOffTimes.push({
      label: dropOffTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      value: dropOffTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "numeric",
        hour12: false,
      }),
    });
    dropOffTime.setMinutes(dropOffTime.getMinutes() + 30);
  }

  return dropOffTimes;
}
