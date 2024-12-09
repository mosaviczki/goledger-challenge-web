"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderSong from "../Components/SlideSong";
import { SongType } from "@/types/songType";
import LoadingComponent from "../Components/Loading";

export default function Song() {
  const [song, setSong] = useState<SongType[]>();
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
    <>
      {!song && <LoadingComponent />}
      {song && <SliderSong items={song} />}
    </>
  );
}
