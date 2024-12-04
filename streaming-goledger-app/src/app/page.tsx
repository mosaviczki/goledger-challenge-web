import styles from "./page.module.css";
import Navbar from "./pages/Components/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
    </div>
  );
}
