import type { GeoCode } from './gallery-item';

export default function MapsModal({
  address,
  close,
}: {
  address: GeoCode | string;
  close: Function;
}) {
  address =
    typeof address == 'object' ? `${address.lat}, ${address.lng}` : address;
  const mapsUrl = new URL(
    `https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&location=${address}`,
  ).href;
  return (
    <div>
      <iframe
        width={600}
        height={450}
        src={mapsUrl}
        loading='lazy'
        allowFullScreen
      />
      <button onClick={() => close()}>Close</button>
    </div>
  );
}
