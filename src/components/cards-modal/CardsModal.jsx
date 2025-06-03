/* eslint-disable react/prop-types */
import styles from "./CardsModal.module.css";

export default function CardsModal({ isOpen, image, onClose }) {
  if (!isOpen || !image) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img
          src={`https://picsum.photos/id/${image.id}/800/600`}
          alt={`Foto de ${image.author}`}
        />
        <p>Autor: {image.author}</p>
        <p>Tamanho: {image.width} x {image.height} </p>
      </div>
    </div>
  );
}