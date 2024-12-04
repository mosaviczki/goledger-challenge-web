import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.containerNavbar}>
        <div className={styles.logo}>LOGO</div>
        <nav>
          <ul>
            <li>
              <a>Artista</a>
            </li>
            <li>
              <a>Album</a>
            </li>
            <li>
              <a>Playlist</a>
            </li>
            <li>
              <a>Música</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
