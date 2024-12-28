import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={s.list}>
      {images.map((image) => (
        <li
          className={s.item}
          key={image.id}
          onClick={() => onImageClick(image.urls.regular)}
        >
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
      ;
    </ul>
  );
};

export default ImageGallery;
