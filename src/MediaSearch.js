import React, { useEffect, useState, useRef } from 'react';

import environment from './environment';

import './MediaSearch.css';

import MediaGridItem from './MediaGridItem';

const MediaSearch = () => {
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
    const listener = document.addEventListener('keydown', () => {
      inputRef.current.focus()
    });

    return () => {
      document.removeEventListener('keydown', listener);
    }
  }, [inputRef]);

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
