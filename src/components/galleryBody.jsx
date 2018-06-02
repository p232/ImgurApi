import React from "react";

export const GalleryBody = props => {
  const { gallery } = props;
  return (
    <div className="gallery-body">
      <h1 className="gallery-body__title">{gallery.title}</h1>
      <p className="gallery-body__name">by {gallery.account_url}</p>
      {gallery.images ? (
        gallery.images.map(image => {
          return (
            <div key={image.id} className="gallery-body__image-container">
              <div className="gallery-body__image-wrapper">
                <img className="gallery-body__image" src={image.link} />
              </div>
              <p className="gallery-body__image-description">
                {image.description}
              </p>
            </div>
          );
        })
      ) : (
        <div className="gallery-body__image-wrapper">
          <img className="gallery-body__image" src={gallery.link} />
        </div>
      )}
      {gallery.description && (
        <p className="gallery-body__description">{gallery.description}</p>
      )}
    </div>
  );
};
