"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderArtist from "../Components/Artist/SlideArtist";
import { ArtistType } from "@/types/artistType";
import LoadingComponent from "../Components/Loading";
import DialogCreateArtist from "../Components/Artist/DialogCreate";
import styles from "./styles.module.css";

export default function Artist() {
  const [artists, setArtists] = useState<ArtistType[]>();
  const [open, setOpen] = useState(false);

  const updateArtist = (updatedArtist: ArtistType) => {
    setArtists((prevItems) =>
      prevItems!.map((artist) =>
        artist.name === updatedArtist.name ? updatedArtist : artist
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          query: {
            selector: {
              "@assetType": AssetsEnum.artist,
            },
          },
        };
        const result = await BlockchainApi.searchApi(payload);
        setArtists(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      {!artists && <LoadingComponent />}
      {artists && (
        <>
          <button className={styles.buttonDialog} onClick={() => setOpen(true)}>Add new artist</button>
          <SliderArtist items={artists} />
        </>
      )}
      <DialogCreateArtist openDialog={open} onClose={() => setOpen(false)} updateArtist={updateArtist}/>
    </div>
  );
}
