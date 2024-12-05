"use client"
import { useEffect } from "react";
import { AssetsEnum } from "../../constants/assets_enum";
import { BlockchainApi } from "../apis/blockchain";

export default function Playlist() {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await BlockchainApi.searchApi(AssetsEnum.playlist);
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <>
      <h1>Playlist</h1>
    </>
  );
}
