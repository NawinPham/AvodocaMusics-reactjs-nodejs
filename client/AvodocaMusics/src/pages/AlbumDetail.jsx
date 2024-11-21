import { Button, Card, Container } from "react-bootstrap";
import "../assets/css/ListAlbum.css";
import "../assets/css/Home.css";
import { Link, useParams } from "react-router-dom";
import { albumGetIdData } from "../hooks/albums/albumGetIdData";
import { baseUrl } from "../utils/service";
import { BtnUpdate } from "../components/albumDetail/BtnUpdate";
import { albumSongFetchData } from "../hooks/albums/albumSongFetchData";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import { useAudio } from "../contexts/AudioContext";
import HotPlaylist from "../components/home/HotPlaylist";
import HotAlbum from "../components/home/HotAlbum";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import BtnDelete from "../components/albumDetail/BtnDelete";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";

const AlbumDetail = () => {
  const { user, favoriteSongDataUser, playlistDataUser } =
    useContext(AuthContext);
  const { album_id } = useParams();
  const { albumData, setAlbumData } = albumGetIdData(album_id);
  const { albumSongData, setAlbumSongData } = albumSongFetchData(album_id);

  const { playNewSong, togglePlayPause } = useAudio();

  const handleDeleteSong = (songId) => {
    setAlbumSongData((prevData) => ({
      ...prevData,
      data: prevData.data.filter((song) => song.songs_id !== songId),
    }));
  };

  const handleCreatePlaylist = (newPlaylist) => {
    setAlbumData((prevData) => {
      return {
        ...prevData,
        ...newPlaylist,
      };
    });
  };

  return (
    <Container style={{ marginTop: "100px", marginLeft: "100px" }}>
      {albumData && albumData?.data ? (
        <>
          <div className="album-detail">
            <div className="image-album Boxshadow-image album-image">
              <img
                src={`${baseUrl}/uploads/uploadImage/${albumData?.data?.image}`}
                alt=""
              />
            </div>
            <div className="title-album">
              <span style={{ fontSize: "25px" }}>
                Tên album : {albumData?.data?.name}
              </span>{" "}
              <br />
              <span
                style={{ fontSize: "12px", color: "#ccc", paddingTop: "15px" }}
              >
                Nghệ sĩ : {albumData?.data?.Account?.username}
              </span>
              <br />
              {user?.id === albumData?.data?.account_id ? (
                <BtnUpdate
                  onUpdate={handleCreatePlaylist}
                  album_id={albumData?.data?.id}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="list-song container">
            <ul className="list-group">
              {albumSongData && albumSongData?.data ? (
                albumSongData?.data.map((items, index) => (
                  <li
                    key={items.id}
                    className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
                  >
                    <div className="p-2">
                      <span> {index + 1}</span>
                    </div>
                    <div className="p-2">
                      <BtnFavoriteSong
                        song_id={items.songs_id}
                        favoriteUser={favoriteSongDataUser}
                      />
                    </div>
                    <div className="p-2">
                      <Button
                        className="btn bg-transparent border-0"
                        onClick={() => {
                          playNewSong(items.songs_id, albumSongData.data);
                          togglePlayPause();
                        }}
                      >
                        Chơi
                      </Button>
                    </div>

                    <div className="col-4">
                      <Link
                        to={`/songDetail/${items.songs_id}`}
                        className="d-flex"
                      >
                        <div className="col-2">
                          <img
                            className="image"
                            src={`${baseUrl}/uploads/uploadImage/${items.Song.image}`}
                            alt=""
                          />
                        </div>
                        <div className="p-2">
                          <span>{items.Song.name}</span>
                        </div>
                      </Link>
                    </div>

                    <div className="col-3 p-2">
                      <span style={{ fontSize: "12px", color: "#ccc" }}>
                        Nghệ sĩ: {items?.Song?.Account?.username}
                      </span>
                    </div>
                    <div className="col-3 p-2">
                      <span style={{ fontSize: "12px", color: "#ccc" }}>
                        Thể loại: {items?.Song?.Genre?.name}
                      </span>
                    </div>

                    {user?.id === albumData?.data?.account_id ? (
                      <BtnDelete
                        album_id={items.album_id}
                        song_id={items.songs_id}
                        onDelete={handleDeleteSong}
                      />
                    ) : (
                      <div className="dropdown">
                        <button className="dropbtn">...</button>
                        <div className="dropdown-content">
                          <BtnAddSongPlaylist
                            song_id={items.songs_id}
                            playlistUser={playlistDataUser}
                          />
                        </div>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p>Không có bài hát nào trong album...</p>
              )}
            </ul>
            <div className="description-album">
              <span>description : {albumData?.data?.description}</span>
            </div>
            <span>
              Album được thực hiện bởi {albumData?.data?.Account?.username}
            </span>
          </div>
        </>
      ) : (
        <p>Loading album...</p>
      )}
      <HotPlaylist />
      <HotAlbum />
    </Container>
  );
};

export default AlbumDetail;
