import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export const ImageGalleryItem = ({ id, largeImageURL, webformatURL }) => {
  const openModal = () => {
    const instance = basicLightbox.create(`
      <img src="${largeImageURL}" alt="Large image">
    `);
    instance.show();
  };
  return (
    <GalleryItem onClick={openModal}>
      <GalleryImage src={webformatURL} alt={`This is card ${id}`} />
    </GalleryItem>
  );
};