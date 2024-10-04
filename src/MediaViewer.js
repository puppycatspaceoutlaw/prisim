import React, { useEffect } from 'react';

import './MediaViewer.css';

import { useLocation, useNavigate } from "react-router-dom";

const MediaViewer = () => {
  let location = useLocation();
  let navigate = useNavigate();

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

  return (
    <div className='MediaViewer'>
        <div className="mediaContainer">
            <img src={url} />
        </div>
        <div className="backgroundContainer">
            <div className="background-image" style={{"backgroundImage": `url('${url}')`}}></div>
        </div>
        
    </div>
  );
};

export default MediaViewer;
