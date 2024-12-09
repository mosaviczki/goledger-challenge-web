"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import { PlaylistType } from "@/types/playlistType";
import SliderPlaylist from "../Components/Playlist/SlidePlaylist";
import LoadingComponent from "../Components/Loading";
import styles from "./style.module.css";
import DialogCreatePlaylist from "../Components/Playlist/CreatePlaylist";

export default function Playlist() {
  const [playlist, setPlaylist] = useState<PlaylistType[]>();
  const [open, setOpen] = useState(false);

  const updatePlaylist = (updatedPlaylist: PlaylistType) => {
    setPlaylist((prevItems) =>
      prevItems
        ? prevItems.some(
            (playlist) => playlist["@key"] === updatedPlaylist["@key"]
          )
          ? prevItems.map((playlist) =>
              playlist["@key"] === updatedPlaylist["@key"]
                ? updatedPlaylist
                : playlist
            )
          : [updatedPlaylist, ...prevItems]
        : [updatedPlaylist]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          query: {
            selector: {
              "@assetType": AssetsEnum.playlist,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setPlaylist(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.page}>
      <button className={styles.buttonDialog} onClick={() => setOpen(true)}>
        Add new playlist
      </button>
      {!playlist && <LoadingComponent />}
      {playlist && <SliderPlaylist items={playlist} />}
      <DialogCreatePlaylist
        onClose={() => setOpen(false)}
        openDialog={open}
        updatePlaylist={updatePlaylist}
      />
    </div>
  );
}
