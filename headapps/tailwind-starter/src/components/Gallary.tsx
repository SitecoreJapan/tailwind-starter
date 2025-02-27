import React, { useState } from 'react';
import { ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const imageList = {
  image1:
    'https://sitecoredemojp.sitecoresandbox.cloud/api/public/content/63a4a7783a14441db4ca3a9925965eae?v=ea208ed5',
  image2:
    'https://sitecoredemojp.sitecoresandbox.cloud/api/public/content/7ecf73d6d11d45f39c5731a2177c8002?v=ca4fad79',
  image3:
    'https://sitecoredemojp.sitecoresandbox.cloud/api/public/content/ed14e19ca7584160af98c85fad555dd5?v=daba8977',
  image4:
    'https://sitecoredemojp.sitecoresandbox.cloud/api/public/content/1d99d5f748f94490835de6dc3ecb561c?v=f3a0cdb4',
};

interface GallaryProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: GallaryProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [selectedImage, setSelectedImage] = useState<string>(imageList.image1);

  return (
    <div className={`component gallary ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="flex flex-col space-y-4">
          <div className="flex-grow">
            <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
          </div>
          <div className="flex justify-center space-x-2 overflow-x-auto items-center">
            <div className="flex items-center">
              <ChevronLeft
                className="w-10 h-10 flex items-center justify-center z-10"
                onClick={() => {
                  const currentIndex = Object.values(imageList).indexOf(selectedImage);
                  const prevIndex =
                    (currentIndex - 1 + Object.values(imageList).length) %
                    Object.values(imageList).length;
                  setSelectedImage(Object.values(imageList)[prevIndex]);
                }}
              />
            </div>
            <div className="flex-grow flex justify-center space-x-2 overflow-hidden">
              {Object.keys(imageList).map((key: keyof typeof imageList) => (
                <img
                  key={key}
                  src={imageList[key]}
                  alt={key}
                  className="w-36 h-36 cursor-pointer object-contain"
                  onClick={() => setSelectedImage(imageList[key])}
                />
              ))}
            </div>
            <div className="flex items-center">
              <ChevronRight
                className="w-10 h-10 flex items-center justify-center z-10"
                onClick={() => {
                  const currentIndex = Object.values(imageList).indexOf(selectedImage);
                  const nextIndex = (currentIndex + 1) % Object.values(imageList).length;
                  setSelectedImage(Object.values(imageList)[nextIndex]);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
