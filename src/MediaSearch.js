import './MediaSearch.css';
import React, { useEffect, useState, useRef } from 'react';
import environment from './environment';

import { useNavigate } from "react-router-dom";

import MediaGridItem from './MediaGridItem';

const MediaSearch = () => {
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedia, setFilteredMedia] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(environment.media_collection_url); // Replace with your JSON URL
        const data = await response.json();
        setMedia(data.media);
        setFilteredMedia(data.media); // Initialize filtered media with all media items
      } catch (error) {
        console.error('Error fetching the media:', error);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    // Filter media based on search term
    const results = media
      .filter(item => {
        const { name, tags, collection } = item;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Check if name, tags, or collection match the search term
        return (
          name.toLowerCase().includes(lowerCaseSearchTerm) ||
          tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)) ||
          collection.toLowerCase().includes(lowerCaseSearchTerm)
        );
      })
    ;

    const uniqueResults = results.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.place === value.place && t.name === value.name
      ))
    )

    setFilteredMedia(uniqueResults);
  }, [searchTerm, media]);

  useEffect(() => {
    if(!inputRef.current) return;
    const listener = document.addEventListener('keydown', (e) => {
      if(inputRef.current) {

        if (e.key === 'Enter') {
          if (filteredMedia.length === 0) return;
          navigate('/view?url=' + filteredMedia[0].url);
        }

        if (e.key === 'Escape') {
          setSearchTerm('');
        }

        inputRef.current.focus()
      }
    });

    return () => {
      document.removeEventListener('keydown', listener);
    }
  }, [navigate, filteredMedia, searchTerm]);

  return (
    <div className='MediaSearch'>
      <br />
      <input
        type="text"
        ref={inputRef} 
        placeholder="Search by name, tags, or collection"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="media-grid">
        {filteredMedia.map((item, index) => (<MediaGridItem key={index} item={item} />))}
      </div>
    </div>
  );
};

export default MediaSearch;
