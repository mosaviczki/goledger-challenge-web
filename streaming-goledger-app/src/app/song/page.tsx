"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderSong from "../Components/SlideSong";
import { SongType } from "@/types/songType";

export default function Song() {
  const [song, setSong] = useState<SongType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BlockchainApi.searchApi(AssetsEnum.song);
        setSong(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SliderSong items={song} />
    </>
  );
}
