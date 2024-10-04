import React, { useEffect, useState } from 'react';

import './MediaViewer.css';

import { useLocation, useNavigate } from "react-router-dom";

const MediaViewer = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const [ type, setType ] = useState(null);

  let params = new URLSearchParams(location.search);

  let url = params.get('url');

  useEffect(() => {
    const listener = document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navigate('/');
      }
    });

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [navigate]);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setType('image');
    };
    img.onerror = () => {
        // try to load url as video
        const video = document.createElement('video');
        video.src = url;
        video.onloadeddata = () => {
            setType('video');
        };
        video.onerror = () => {

        };
    };
  }, [url]);

  return (
    <div className='MediaViewer'>
        <div className="mediaContainer">
            { type === 'image' && <img src={url} alt={"Prism Gallery Item"} /> }
            { type === 'video' && <video autoPlay muted loop><source src={url} type="video/webm" /></video> }
        </div>
        <div className="backgroundContainer">
            { type === 'image' && <div className="background-image" style={{"backgroundImage": `url('${url}')`}}></div> }
            { type === 'video' && <video class="background-video" autoPlay muted loop><source src={url} type="video/webm" /></video> }
        </div>
        
    </div>
  );
};

export default MediaViewer;
