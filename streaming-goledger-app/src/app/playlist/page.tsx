"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import { PlaylistType } from "@/types/playlistType";
import SliderPlaylist from "../Components/SlidePlaylist";
import LoadingComponent from "../Components/Loading";

export default function Playlist() {
  const [playlist, setPlaylist] = useState<PlaylistType[]>();
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
    <>
      {!playlist && <LoadingComponent />}
      {playlist && <SliderPlaylist items={playlist} />}
    </>
  );
}
