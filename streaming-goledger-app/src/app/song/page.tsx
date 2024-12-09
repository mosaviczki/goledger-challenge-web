"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderSong from "../Components/Song/SlideSong";
import { SongType } from "@/types/songType";
import LoadingComponent from "../Components/Loading";
import styles from "./styles.module.css";
import DialogCreateSong from "../Components/Song/DialogCreate";

export default function Song() {
  const [song, setSong] = useState<SongType[]>();
  const [open, setOpen] = useState(false);

  const updateSong = (updatedSong: SongType) => {
    setSong((prevItems) =>
      prevItems
        ? prevItems.some((song) => song["@key"] === updatedSong["@key"])
          ? prevItems.map((song) =>
              song["@key"] === updatedSong["@key"] ? updatedSong : song
            )
          : [updatedSong, ...prevItems]
        : [updatedSong]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          query: {
            selector: {
              "@assetType": AssetsEnum.song,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setSong(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      {!song && <LoadingComponent />}

      {song && (
        <>
          <button className={styles.buttonDialog} onClick={() => setOpen(true)}>
            Add new song
          </button>
          <SliderSong items={song} />
        </>
      )}
      <DialogCreateSong
        openDialog={open}
        onClose={() => setOpen(false)}
        updateSong={updateSong}
      />
    </div>
  );
}
