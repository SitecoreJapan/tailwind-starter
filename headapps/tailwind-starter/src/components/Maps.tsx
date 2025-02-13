import React from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { GoogleMapsEmbed } from '@next/third-parties/google';

interface MapsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: MapsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <GoogleMapsEmbed
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          height={200}
          width="100%"
          mode="place"
          q="Brooklyn+Bridge,New+York,NY"
        />
      </div>
    </div>
  );
};
