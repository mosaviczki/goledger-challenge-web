"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderAlbum from "../Components/SlideAlbum";
import { AlbumType } from "@/types/albumType";

export default function Album() {
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BlockchainApi.searchApi(AssetsEnum.album);
        setAlbums(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {albums && <SliderAlbum items={albums} />}
    </>
  );
}
