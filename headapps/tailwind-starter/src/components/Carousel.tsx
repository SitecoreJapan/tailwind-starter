import React from 'react';
import {
  TextField,
  useSitecoreContext,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ResultsSlideLink = {
  fields: {
    id: string;
    jsonValue: JSON;
    name: string;
  };
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: {
          fields: ResultsSlideLink[];
        };
      };
      field: {
        title: TextField;
      };
    };
  };
}

interface CarouselProps {
  params: { [key: string]: string };
  fields: Fields;
}

const getLocale = function (props: SitecoreContextValue): string {
  let locale;

  if (!props.language || props.language === `en`) {
    locale = '';
  } else {
    locale = '/' + props.language;
  }

  return locale;
};

export const Default = (props: CarouselProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;

  const contentLocale = getLocale(sitecoreContext);
  const datasource = props.fields?.data?.datasource;

  console.log('locale:', contentLocale);
  console.log('datasource:', datasource);

  return (
    <div className={`component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p>Carousel Component</p>
      </div>
    </div>
  );
};
