import { useEffect, useState } from 'react';
import { Field, ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

interface Fields {
  Latitude: Field<number>;
  Longitude: Field<number>;
}

interface MapsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: MapsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const latitude = props.fields.Latitude.value || 55.678623971889444;
  const longitude = props.fields.Longitude.value || 12.570477952726566;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <></>;
  }

  return (
    <div className={`component maps ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <Map
            className="w-full"
            defaultCenter={{ lat: latitude, lng: longitude }}
            defaultZoom={10}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          />
        </APIProvider>
      </div>
    </div>
  );
};
