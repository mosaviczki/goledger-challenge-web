"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { BsSearch } from "react-icons/bs";
import Logo from "../../img/MSLedger-logo.png";
import Image from "next/image";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <header className={styles.header}>
      <div className={styles.containerNavbar}>
        <a href="/">
          <div className={styles.logo}>
            <Image src={Logo} width={100} alt="Logo MSLedger" />
          </div>
        </a>
        <nav>
          <ul>
            <li>
              <a href="/artist">Artist</a>
            </li>
            <li>
              <a href="/album">Album</a>
            </li>
            <li>
              <a href="/playlist">Playlist</a>
            </li>
            <li>
              <a href="/song">Song</a>
            </li>
          </ul>
        </nav>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <BsSearch />
          </button>
        </div>
      </div>
    </header>
  );
}
