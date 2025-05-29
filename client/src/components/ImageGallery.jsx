import '../styles/ImageGallery.css';

function ImageGallery({ images }) {
    return (
        <div className="gallery-container">
            {images.map((imgSrc, index) => (
                <img
                    key={index}
                    src={imgSrc}
                    alt={`Imagen ${index + 1}`}
                    className="gallery-image"
                />
            ))}
        </div>
    );
}

export default ImageGallery;
