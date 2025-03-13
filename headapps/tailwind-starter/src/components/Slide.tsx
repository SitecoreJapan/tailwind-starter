import {
  Field,
  ImageField,
  NextImage as JssImage,
  Link as JssLink,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  SlideImage: ImageField & { metadata?: { [key: string]: unknown } };
  SlideText: Field<string>;
  SlideLink: LinkField;
}

type ImageProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props?.params?.styles}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  if (props.fields) {
    const Image = () => <JssImage field={props.fields.SlideImage} />;
    const id = props.params.RenderingIdentifier;

    return (
      <div className={`component image ${props?.params?.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          {sitecoreContext.pageState === 'edit' || !props.fields.SlideLink?.value?.href ? (
            <Image />
          ) : (
            <JssLink field={props.fields.SlideLink}>
              <Image />
            </JssLink>
          )}
          <Text
            tag="span"
            className="image-caption field-imagecaption"
            field={props.fields.SlideText}
          />
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
