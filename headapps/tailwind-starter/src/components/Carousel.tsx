import React, { useCallback } from 'react';
import { TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface ImageValue {
  src: string;
  alt: string;
  width: string;
  height: string;
}

interface LinkValue {
  href: string;
  linktype: string;
}

interface Field {
  id: string;
  jsonValue: {
    value: ImageValue | string | LinkValue;
  };
  name: string;
  value: string;
}

interface SlideLink {
  fields: Field[];
}

interface Fields {
  data: {
    datasource: {
      children: {
        results: SlideLink[];
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

export const Default = (props: CarouselProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const datasource = props.fields?.data?.datasource;

  const slideData = datasource?.children?.results;
  const imageFields =
    slideData?.flatMap((slide) => slide.fields.filter((field) => field.name === 'Image')) || [];

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <div className={`component carousel ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="relative h-1/2 mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {imageFields.map((field, index) => (
                <div className="flex-[0_0_100%] h-1/2 min-w-full" key={index}>
                  <Image
                    src={(field.jsonValue.value as ImageValue).src}
                    alt={(field.jsonValue.value as ImageValue).alt}
                    width={1100}
                    height={733}
                    className="rounded-lg w-full h-full object-cover"
                    priority
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            onClick={scrollPrev}
          >
            ◀
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            onClick={scrollNext}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
