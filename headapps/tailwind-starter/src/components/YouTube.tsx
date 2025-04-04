import React, { useState } from 'react';
import Image from 'next/image';
import { Field, ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { YouTubeEmbed } from '@next/third-parties/google';
import { X } from 'lucide-react';

interface Fields {
  URL: Field<string>;
}
interface YouTubeProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

export const Default = (props: YouTubeProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const videoId =
    new URLSearchParams(new URL(props.fields.URL.value).search).get('v') || 'dQw4w9WgXcQ';

  return (
    <div className={`component youtube ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <YouTubeEmbed videoid={videoId} width={640} height={400} playlabel="Play" params="" />
      </div>
    </div>
  );
};

export const Zoom = (props: YouTubeProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const videoId =
    new URLSearchParams(new URL(props.fields.URL.value).search).get('v') || 'dQw4w9WgXcQ';
  const videoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className={`component youtube ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="relative w-full max-w-md mx-auto cursor-pointer" onClick={openModal}>
          <Image
            src={videoThumbnail}
            alt="YouTube Thumbnail"
            width={480}
            height={270}
            className="rounded-lg shadow-lg transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 p-3 rounded-full">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
            onClick={closeModal}
          >
            <div className="relative w-full max-w-3xl p-4" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black"
                onClick={closeModal}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={videoSrc}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
