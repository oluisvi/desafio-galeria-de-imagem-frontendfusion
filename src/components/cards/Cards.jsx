import styles from "./Cards.module.css";
import { useEffect, useState } from "react";

export default function Cards() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=20")
      .then((res) => res.json())
      .then((data) => {

        // Pré-carrega as imagens manualmente
        const preloadImages = data.map((img) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = `https://picsum.photos/id/${img.id}/600/400`;
            image.onload = resolve;
            image.onerror = resolve; // conta erro como "carregado"
          });
        });

        Promise.all(preloadImages).then(() => {
          setImages(data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error("Erro ao carregar imagens:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <article className={styles.loaderContainer}>
        <article className={styles.spinner}></article>
        <p>Carregando imagens...</p>
      </article>
    );
  }

  return (
    <article className={styles.cardsGallery}>
      {images.map((img) => (
        <img
          key={img.id}
          src={`https://picsum.photos/id/${img.id}/600/400`}
          alt={`Foto de ${img.author}`}
          loading="lazy"
        />
      ))}
    </article>
  );
}
