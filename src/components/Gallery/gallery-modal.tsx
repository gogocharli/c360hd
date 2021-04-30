// import * as Dialog from '@radix-ui/react-dialog';
import { useGeoLocation } from 'hooks/useGeoLocation';

export default function MapsModal({
  zipCode,
  close,
}: {
  zipCode: string;
  close: Function;
}) {
  const { lat, lng } = useGeoLocation(zipCode);

  return (
    <div>
      <iframe
        width={600}
        height={450}
        src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&location=${lat}, ${lng}`}
        loading='lazy'
        allowFullScreen
      />
      <button onClick={() => close()}>Close</button>
    </div>
  );
}
