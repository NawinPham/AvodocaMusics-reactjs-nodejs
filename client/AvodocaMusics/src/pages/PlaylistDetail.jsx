import "../assets/css/ListAlbum.css";
import "../assets/css/Home.css";
import { Button, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { playlistFetch } from "../hooks/playlistSongFetchData";
import { baseUrl } from "../utils/service";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import BtnDelete from "../components/playlistDetail/btnDelete";
import { useAudio } from "../contexts/AudioContext";
import BtnUpdatePlaylist from "../components/playlistDetail/BtnUpdate";
import HotPlaylist from "../components/home/HotPlaylist";
import HotAlbum from "../components/home/HotAlbum";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";

const PlaylistDetail = () => {
  const { id } = useParams();
  const { user, favoriteSongDataUser, playlistDataUser } =
    useContext(AuthContext);
  const { playNewSong, togglePlayPause } = useAudio();

  const {
    playlistSongData,
    setPlaylistSongData,
    playlistSongLoading,
    playlistSongError,
  } = playlistFetch(id, user?.token);

  const handleDeleteSong = (songId) => {
    setPlaylistSongData((prevData) => ({
      ...prevData,
      data: prevData.data.filter((song) => song.songs_id !== songId),
    }));
  };

  if (playlistSongLoading) return <p>Loading...</p>;
  if (playlistSongError) return <p>Error: {playlistSongError.message}</p>;

  return (
    <Container style={{ marginTop: "100px", marginLeft: "100px" }}>
      {playlistSongData && playlistSongData?.playlistData ? (
        <>
          <div className="album-detail ">
            <div className="image-album Boxshadow-image album-image">
              <img
                src={`${baseUrl}/uploads/uploadImage/${playlistSongData.playlistData.image}`}
                alt=""
              />
            </div>
            <div className="title-album">
              <span>Tên playlist : {playlistSongData.playlistData.name}</span>{" "}
              <br />
              {user?.id === playlistSongData?.playlistData?.account_id ? (
                <BtnUpdatePlaylist
                  playlist_id={playlistSongData.playlistData.id}
                  token={user?.token}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="list-song container">
            <ul className="list-group">
              {playlistSongData &&
              playlistSongData.data &&
              playlistSongData?.data.length > 0 ? (
                playlistSongData.data.map((item, index) => (
                  <li
                    key={item.id}
                    className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
                  >
                    <div className="p-2">
                      <span> {index + 1}</span>
                    </div>
                    <div className="p-2">
                      <BtnFavoriteSong
                        song_id={item.songs_id}
                        favoriteUser={favoriteSongDataUser}
                      />
                    </div>
                    <div className="p-2">
                      <Button
                        className="btn bg-transparent border-0"
                        onClick={() => {
                          playNewSong(item.Song.id, playlistSongData.data);
                          togglePlayPause();
                        }}
                      >
                        Chơi
                      </Button>
                    </div>

                    <div className="col-4">
                      <Link
                        to={`/songDetail/${item.songs_id}`}
                        className="d-flex"
                      >
                        <div className="col-2">
                          <img
                            className="image"
                            src={`${baseUrl}/uploads/uploadImage/${item.Song.image}`}
                            alt=""
                          />
                        </div>
                        <div className="p-2">
                          <span>{item.Song.name}</span>
                        </div>
                      </Link>
                    </div>
                    <div className="col-3 p-2">
                      <span style={{ fontSize: "12px", color: "#ccc" }}>
                        Nghệ sĩ: {item?.Song?.Account?.username}
                      </span>
                    </div>
                    <div className="col-3 p-2">
                      <span style={{ fontSize: "12px", color: "#ccc" }}>
                        Thể loại: {item?.Song?.Genre?.name}
                      </span>
                    </div>
                    {user?.id === playlistSongData?.playlistData?.account_id ? (
                      <BtnDelete
                        playlist_id={item.playlist_id}
                        song_id={item.songs_id}
                        onDelete={handleDeleteSong}
                      />
                    ) : (
                      <div className="dropdown">
                        <button className="dropbtn">...</button>
                        <div className="dropdown-content">
                          <BtnAddSongPlaylist
                            song_id={item.songs_id}
                            playlistUser={playlistDataUser}
                          />
                        </div>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <p>không có bài hát nào...</p>
              )}
            </ul>
          </div>

          <div className="description-album">
            <span>Mô tả : {playlistSongData.playlistData.description}</span>
          </div>
          <HotPlaylist />
          <HotAlbum />
        </>
      ) : (
        <p>loading Playlist...</p>
      )}
    </Container>
  );
};

export default PlaylistDetail;
