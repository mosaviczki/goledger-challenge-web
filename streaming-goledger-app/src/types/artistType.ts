import { AssetsEnum } from "@/constants/assets_enum";

export type ArtistType = {
  name: string;
  country: string;
  "@assetType": AssetsEnum.artist;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
};
