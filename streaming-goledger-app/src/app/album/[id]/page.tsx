"use client";
import { AssetsEnum } from "@/constants/assets_enum";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { BlockchainApi } from "@/app/apis/blockchain";
import { AlbumType } from "@/types/albumType";
import { SongType } from "@/types/songType";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { ArtistType } from "@/types/artistType";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function AlbumId(id: ParamsProps) {
  const [detAlbum, setDetAlbum] = useState<AlbumType>();
  const [song, setSong] = useState<SongType[]>([]);
  const [artist, setArtist] = useState<ArtistType>();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const payload = {
          key: {
            "@assetType": AssetsEnum.album,
            "@key": `album:${id.params.id}`,
          },
        };
        try {
          const result = await BlockchainApi.readAsset(payload);
          setDetAlbum(result.data);
          fetchSong(id.params.id);
          fetchArtist(result.data.artist["@key"]);
        } catch (error) {
          console.error(
            `Erro ao buscar artista com ID ${id.params.id}:`,
            error
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados dos artistas:", error);
      }
    };
    fetchArtists();
  }, [id.params.id]);

  const fetchSong = async (albumId: string) => {
    try {
      const payload = {
        query: {
          selector: {
            "@assetType": AssetsEnum.song,
            "album.@key": `album:${albumId}`,
          },
        },
      };

      const result: SongType[] = await BlockchainApi.searchApi(payload);
      setSong(result);
    } catch (error) {
      console.error(`Erro ao buscar músicas para o álbum ${albumId}:`, error);
      return [];
    }
  };

  const fetchArtist = async (artistId: string) => {
    try {
      const payload = {
        key: {
          "@assetType": AssetsEnum.artist,
          "@key": artistId,
        },
      };

      const result = await BlockchainApi.readAsset(payload);
      setArtist(result.data);
      return result;
    } catch (error) {
      console.error(`Erro ao buscar artista para o álbum ${artistId}:`, error);
      return [];
    }
  };

  return (
    <div>
      {detAlbum && artist && (
        <>
          <div className={styles.containerTitle}>
            <h1>{detAlbum.name}</h1>
            <div >
              <p className={styles.trackArtist}>{artist!.name} {detAlbum.year}</p>
            </div>
          </div>
          <div className={styles.containerBody}>
            {song.length === 0 && (
              <div>
                <h1>Ainda não há músicas adicionado</h1>
              </div>
            )}
            {song && song.length > 0 && (
              <>
                <div className={styles.container}>
                  <div className={styles.header}>
                    <span>#</span>
                    <span>Título</span>
                    <span>Álbum</span>
                    <span>Adicionada em</span>
                  </div>
                  <div className={styles.trackList}>
                    {song &&
                      song.length > 0 &&
                      song.map((item, idx) => (
                        <div key={idx} className={styles.track}>
                          <span className={styles.trackNumber}>{idx + 1}</span>
                          <div className={styles.trackDetails}>
                            <BsMusicNoteBeamed />
                            <div>
                              <p className={styles.trackTitle}>{item.name}</p>
                            </div>
                          </div>
                          <span className={styles.trackAlbum}>
                            {detAlbum.name}
                          </span>

                          <span className={styles.trackDate}>
                            {new Date(item["@lastUpdated"]).toLocaleDateString(
                              "en-US",
                              {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
