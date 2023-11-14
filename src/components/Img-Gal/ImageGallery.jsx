import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGallery } from './ImageGallery.styled';

export const ImgGallery = ({ hits }) => {
  return (
    <ImageGallery>
      {hits.map(({ id, largeImageURL, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
        />
      ))}
    </ImageGallery>
  )};