// utils/getCurrentLocation.ts
export async function getCurrentLocation(): Promise<{ address: string; lat: number; lng: number } | null> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject("Geolocation not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await res.json();

          if (data.status === "OK" && data.results.length > 0) {
            let finalAddress = data.results[0].formatted_address;

            // Prefer neighborhood/sublocality if available
            const preferredResult = data.results.find((result: any) =>
              result.types.includes("sublocality_level_1") || result.types.includes("neighborhood")
            );
            if (preferredResult) finalAddress = preferredResult.formatted_address;

            resolve({ address: finalAddress, lat: latitude, lng: longitude });
          } else {
            resolve({ address: "Unknown Area", lat: latitude, lng: longitude });
          }
        } catch (err) {
          console.error("Error fetching address:", err);
          resolve({ address: "Unknown Area", lat: latitude, lng: longitude });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        reject(error.message || "Unable to retrieve location");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}
