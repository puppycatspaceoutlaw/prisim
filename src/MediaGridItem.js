// MediaGridItem.js
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchMediaType = async () => {
      // Check if item.type or URL ends with specific extensions
      if (item.type === 'video' || item.url.endsWith('.webm') || item.url.endsWith('.mp4')) {
        setMediaType('video');
        setIsLoading(false);
        return;
      }

      if (item.type === 'image' || item.url.endsWith('.png') || item.url.endsWith('.jpg') || item.url.endsWith('.jpeg')) {
        setMediaType('image');
        setIsLoading(false);
        return;
      }

      // Fetch media type using HEAD request
      try {
        const response = await fetch(item.url, { method: 'HEAD' }); // Use HEAD to get headers only
        const contentType = response.headers.get('content-type');

        if (contentType) {
          if (contentType.startsWith('image/')) {
            setMediaType('image');
          } else if (contentType.startsWith('video/')) {
            setMediaType('video');
          } else {
            setMediaType('other'); // Handle other content types if needed
          }
        }
      } catch (error) {
        console.error('Error fetching media type:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaType();
  }, [item.url, item.type]);

  const openUrl = (url) => () => {
    window.open(url, '_blank');
  };

  return (
    <div className="media-grid-item" onClick={openUrl(item.url)}>
      <MediaPreview item={item} mediaType={mediaType} isLoading={isLoading} />
      <div className="media-grid-item-metadata">
        <h2>{item.name}</h2>
        <p>{<span className='media-grid-item-metadata-tag'>{item.collection}</span>}</p>
        <p>{item.tags.map(t => (<span key={t} className='media-grid-item-metadata-tag'>{t}</span>))}</p>
      </div>
    </div>
  );
};

export default MediaGridItem;
