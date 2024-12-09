"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderAlbum from "../Components/Album/SlideAlbum";
import { AlbumType } from "@/types/albumType";
import LoadingComponent from "../Components/Loading";
import DialogCreateAlbum from "../Components/Album/DialogCreate";
import styles from "./styles.module.css";

export default function Album() {
  const [albums, setAlbums] = useState<AlbumType[]>();
  const [open, setOpen] = useState(false);

  const updateAlbum = (updatedAlbum: AlbumType) => {
    setAlbums((prevItems) =>
      prevItems!.map((album) =>
        album.name === updatedAlbum.name ? updatedAlbum : album
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          query: {
            selector: {
              "@assetType": AssetsEnum.album,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setAlbums(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.page}>
      {!albums && <LoadingComponent />}
      {albums && (
        <>
          <button className={styles.buttonDialog} onClick={() => setOpen(true)}>
            Add new album
          </button>
          <SliderAlbum items={albums} />
        </>
      )}
      <DialogCreateAlbum
        openDialog={open}
        onClose={() => setOpen(false)}
        updateAlbum={updateAlbum}
      />
    </div>
  );
}
