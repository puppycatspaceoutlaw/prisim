// MediaGridItem.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";


const MediaPreview = ({ item, mediaType, isLoading }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (mediaType === 'image') {
    return (
      <div className="media-preview">
        <img src={item.url} alt={item.name} />
      </div>
    );
  }

  if (mediaType === 'video') {
    return (
      <div className="media-preview">
        <video autoPlay muted loop>
          <source src={item.url} type="video/mp4" /> {/* Adjust type if necessary */}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return <p>Unsupported media type</p>;
};

const MediaGridItem = ({ item }) => {
  const [mediaType, setMediaType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mediaPreviewRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mediaPreviewRef.current) return;

    const mediaPreviewRefCurrent = mediaPreviewRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const fetchMediaType = () => {
            const img = new Image();
            img.src = item.url;
            img.onload = () => {
              setMediaType('image');
              setIsLoading(false);
            };
            img.onerror = () => {
                // try to load url as video
                const video = document.createElement('video');
                video.src = item.url;
                video.onloadeddata = () => {
                  setMediaType('video');
                  setIsLoading(false);
                };
                video.onerror = () => {

                };
            };
        };

        fetchMediaType();
      }

    });

    observer.observe(mediaPreviewRefCurrent);

    return () => {
      observer.unobserve(mediaPreviewRefCurrent);
    };
  }, [item.url, item.type, mediaPreviewRef]);

  const openUrl = (item) => () => {
    navigate(`/view?url=${item.url}`, { state: { item } });
  };

  return (
    <div className="media-grid-item" onClick={openUrl(item)} ref={mediaPreviewRef} >
      <MediaPreview item={item} mediaType={mediaType} isLoading={isLoading} />
      <div className="media-grid-item-metadata">
        <h2>{item.name}</h2>
        <p>{<span className='media-grid-item-metadata-tag'>{item.collection}</span>}</p>
        <p>{item && item.tags && item.tags.map(t => (<span key={t} className='media-grid-item-metadata-tag'>{t}</span>))}</p>
      </div>
    </div>
  );
};

export default MediaGridItem;
