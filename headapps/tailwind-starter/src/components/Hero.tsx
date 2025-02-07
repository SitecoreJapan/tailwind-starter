import React from 'react';
import {
  NextImage as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  HeroTitle: Field<string>;
  HeroText: Field<string>;
  HeroLink: LinkField;
  HeroImage: ImageField;
  HeroText2: Field<string>;
}

interface HeroProps {
  params: { [key: string]: string };
  fields: Fields;
}

const HeroDefaultComponent = (props: HeroProps): JSX.Element => (
  <div className={`component hero ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Hero</span>
    </div>
  </div>
);

export const Default = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  if (props.fields) {
    return (
      <div className={`component hero ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="flex flex-col md:flex-row">
            <div className="basis-1/2 md:w-1/2">
              <div className="promo-text">
                <div>
                  <div className="field-herotitle">
                    <JssRichText field={props.fields.HeroTitle} tag="h2" />
                  </div>
                  <div className="field-herotext">
                    <JssRichText field={props.fields.HeroText} />
                  </div>
                </div>
                <div className="field-promolink">
                  <JssLink field={props.fields.HeroLink} />
                </div>
              </div>
            </div>
            <div className="basis-1/2 md:w-1/2">
              <div className="field-heroimage">
                <JssImage field={props.fields.HeroImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <HeroDefaultComponent {...props} />;
};
