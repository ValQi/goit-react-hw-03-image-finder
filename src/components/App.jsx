import React, { useState, useEffect } from 'react';
import { ImgGallery } from './Img-Gal/ImageGallery';
import { Button } from './ButtonFolder/button';
import { LoaderCont } from './Loader';
import { Searchbar } from './SearchbarFolder/Searchbar';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const API_KEY = '39839158-8a8d39ceaa5479b3be9b78b67';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        );

        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setSelectedImage(null);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    const instance = basicLightbox.create(`
      <img src="${image.largeImageURL}" alt="Large image">
    `);
    instance.show();
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearch} />
      <ImgGallery hits={images} onImageClick={openModal} />
      {loading && <LoaderCont />}
      {images.length > 0 && !loading && <Button onClick={loadMoreImages} />}
    </div>
  );
};

export default App;