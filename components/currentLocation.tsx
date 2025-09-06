export async function getCurrentLocation(): Promise<{ address: string; lat: number; lng: number } | null> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
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

          console.log(data);
          

          if (data.status === "OK" && data.results.length > 0) {
            let finalAddress = "Unknown Area";

            // Look for Burari / North Delhi / 110084
            for (const result of data.results) {
              const addr = result.formatted_address;

              if (
                addr.includes("Burari") ||
                addr.includes("Ajit Vihar") ||
                addr.includes("110084") ||
                addr.includes("North Delhi")
              ) {
                finalAddress = addr;
                break;
              }
            }

            // If not found, fallback to a sublocality/neighborhood
            if (finalAddress === "Unknown Area") {
              for (const result of data.results) {
                if (
                  result.types.includes("sublocality_level_1") ||
                  result.types.includes("neighborhood")
                ) {
                  finalAddress = result.formatted_address;
                  break;
                }
              }
            }

            // Final fallback
            if (finalAddress === "Unknown Area") {
              finalAddress = data.results[0].formatted_address;
            }

            resolve({ address: finalAddress, lat: latitude, lng: longitude });
          } else {
            resolve({ address: "Unknown Area", lat: latitude, lng: longitude });
          }
        } catch (err) {
          reject("Failed to fetch address");
          console.error("error: ",err)
        }
      },
      (error) => {
        reject(error.message || "Unable to retrieve location");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // ✅ force GPS
    );
  });
}
