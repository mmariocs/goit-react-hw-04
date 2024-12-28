import React from "react";
import s from "./ImageCard.module.css";
const ImageCard = ({ image, onClick }) => {
  return (
    <div>
      <img
        className={s.card}
        onClick={() => onClick(image.urls.regular)}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
