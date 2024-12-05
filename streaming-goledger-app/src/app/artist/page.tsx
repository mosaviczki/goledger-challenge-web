"use client";
import { useEffect, useState } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";
import SliderArtist from "../Components/SlideArtist";
import { ArtistType } from "@/types/artistType";

export default function Artist() {
  const [artists, setArtists] = useState<ArtistType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await BlockchainApi.searchApi(AssetsEnum.artist);
        setArtists(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {artists && <SliderArtist items={artists} />}
    </div>
  );
}
