import styles from "./Cards.module.css";
import { useEffect, useState } from "react";

export default function Cards() {
  const [loadedImages, setLoadedImages] = useState(0);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=20")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar imagens:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (images.length > 0 && loadedImages === images.length) {
      setLoading(false);
    }
  }, [loadedImages, images]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  if (loading) {
    return (
      <article className={styles.loaderContainer}>
        <article className={styles.spinner}></article>
        <p>Carregando imagens...</p>
      </article>
    );
  }

  return (
    <>
      <article className={styles.cardsGallery}>
        {images.map((img) => (
          <img
            key={img.id}
            src={`https://picsum.photos/id/${img.id}/600/400`}
            alt={`Foto de ${img.author}`}
            onLoad={handleImageLoad}
          />
        ))}
      </article>
    </>
  );
}
