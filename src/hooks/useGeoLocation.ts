import { useEffect, useState } from 'react';

export function useGeoLocation(address: string) {
  const [geoCode, setGeoCode] = useState({ lat: '', lng: '' });

  useEffect(() => {
    window
      .fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
      )
      .then((res) => {
        if (res.ok) return res.json();

        throw res;
      })
      .then((data) => {
        const retrievedGeoCode = data.results[0]?.geometry.location ?? null;
        setGeoCode(retrievedGeoCode);
      })
      .catch((err) => {
        console.error(err);
        setGeoCode({ lat: '', lng: '' });
      });
  }, [address]);

  return geoCode;
}
