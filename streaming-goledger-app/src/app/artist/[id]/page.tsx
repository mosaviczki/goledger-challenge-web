"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { BlockchainApi } from "@/app/apis/blockchain";
import { AssetsEnum } from "@/constants/assets_enum";
import { ArtistType } from "@/types/artistType";
import { AlbumType } from "@/types/albumType";
import { SongType } from "@/types/songType";
import { BsMusicNoteBeamed } from "react-icons/bs";

interface ParamsProps {
  params: {
    id: string;
  };
}

export default function ArtistId(id: ParamsProps) {
  const [detailsArtist, setDetailsArtist] = useState<ArtistType>();
  const [album, setAlbum] = useState<AlbumType[]>([]);
  const [song, setSong] = useState<SongType[]>([]);

  const fetchAlbum = async (id: string) => {
    try {
      const payload = {
        query: {
          selector: {
            "@assetType": AssetsEnum.album,
            "artist.@key": `artist:${id}`,
          },
        },
      };

      const result: AlbumType[] = await BlockchainApi.searchApi(payload);

      if (result) {
        const allSongs = await Promise.all(
          result.map(async (album: { "@key": string }) => {
            return await fetchSong(album["@key"]);
          })
        );

        const songsList = allSongs.flat();
        setAlbum(result);
        setSong(songsList);
      }
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
    }
  };

  const fetchSong = async (albumId: string) => {
    try {
      const payload = {
        query: {
          selector: {
            "@assetType": AssetsEnum.song,
            "album.@key": `${albumId}`,
          },
        },
      };

      const result: SongType[] = await BlockchainApi.searchApi(payload);

      return result;
    } catch (error) {
      console.error(`Erro ao buscar músicas para o álbum ${albumId}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const payload = {
          key: {
            "@assetType": AssetsEnum.artist,
            "@key": `artist:${id.params.id}`,
          },
        };
        try {
          const result = await BlockchainApi.readAsset(payload);
          console.log("Result", result);
          setDetailsArtist(result.data);
          fetchAlbum(id.params.id);
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

  return (
    <div>
      {detailsArtist && (
        <>
          <div className={styles.containerTitle}>
            <h1>{detailsArtist.name}</h1>
          </div>

          <div className={styles.containerBody}>
            {album.length === 0 && (
              <div>
                <h1>Ainda não há albuns e músicas adicionado</h1>
              </div>
            )}
            {album && album.length > 0 && (
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
                              <p className={styles.trackArtist}>
                                {detailsArtist.name}
                              </p>
                            </div>
                          </div>
                          <span className={styles.trackAlbum}>
                            {album.find(
                              (alb) => alb["@key"] === item.album["@key"]
                            )?.name || "Desconhecido"}
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
                <div className={styles.containerAlbums}>
                  {album.map((alb, idx) => (
                    <div key={idx}>
                      <h1 className={styles.album}>{alb.name}</h1>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
