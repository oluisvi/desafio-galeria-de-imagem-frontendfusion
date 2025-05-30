import styles from "./Cards.module.css";
import { useEffect, useState } from "react";

export default function Cards() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=20")
      .then((res) => res.json())
      .then((data) => {
        const preloadImages = data.map((img) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.src = `https://picsum.photos/id/${img.id}/600/400`;
            image.onload = resolve;
            image.onerror = resolve;
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

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <>
      <article className={styles.cardsGallery}>
        {images.map((img) => (
          <div key={img.id} className={styles.card}>
            <button
              className={styles.favoriteIcon}
              onClick={() => toggleFavorite(img.id)}
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="15"
              >
                <path
                  d="M16,28.72a3,3,0,0,1-2.13-.88L3.57,17.54a8.72,8.72,0,0,1-2.52-6.25,8.06,8.06,0,0,1,8.14-8A8.06,8.06,0,0,1,15,5.68l1,1,.82-.82h0a8.39,8.39,0,0,1,11-.89,8.25,8.25,0,0,1,.81,12.36L18.13,27.84A3,3,0,0,1,16,28.72Z"
                  fill={favorites.includes(img.id) ? "#fae844" : "#4b4b4b"}
                />
              </svg>
            </button>
            <img
              className={styles.cardImage}
              src={`https://picsum.photos/id/${img.id}/400/300`}
              alt={`Foto de ${img.author}`}
              loading="lazy"
            />
          </div>
        ))}
      </article>
    </>
  );
}
