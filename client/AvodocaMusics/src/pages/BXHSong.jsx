import { useContext } from "react";
import HotAlbum from "../components/home/HotAlbum";
import HotPlaylist from "../components/home/HotPlaylist";
import { getHighFavoriteSong } from "../hooks/favoriteSongFetchDataUser";
import { AuthContext } from "../contexts/AuthContext";
import { baseUrl } from "../utils/service";
import { Button } from "react-bootstrap";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import { Link } from "react-router-dom";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";
import { useAudio } from "../contexts/AudioContext";

const BXHSong = () => {
  const { favoriteSongDataUser, playlistDataUser } = useContext(AuthContext);
  const { playNewSong, togglePlayPause } = useAudio();
  const dataSong = getHighFavoriteSong();

  return (
    <div
      className="list-song container "
      style={{ marginTop: "130px", marginLeft: "100px" }}
    >
      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>
        Top 50 bài hát yêu thích
      </h2>
      <ul className="list-group">
        {dataSong && dataSong?.data ? (
          dataSong?.data.map((item, index) => (
            <li
              key={item.id}
              className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
            >
              <div className="p-2" style={{ minWidth: "80px" }}>
                <span style={{ fontSize: "20px" }}> Top {index + 1}</span>
              </div>
              <div className="p-2" style={{ minWidth: "70px" }}>
                <BtnFavoriteSong
                  song_id={item.songs_id}
                  favoriteUser={favoriteSongDataUser}
                />
                <span style={{ fontSize: "12px" }}>{item.favorite_count}</span>
              </div>
              <div className="p-2">
                <Button
                  className="btn bg-transparent border-0"
                  onClick={() => {
                    playNewSong(item.songs_id, dataSong.data);
                    togglePlayPause();
                  }}
                >
                  Chơi
                </Button>
              </div>
              <div className="col-4">
                <Link to={`/songDetail/${item.songs_id}`} className="d-flex">
                  <div className="col-2">
                    <img
                      className="image"
                      src={`${baseUrl}/uploads/uploadImage/${item.Song.image}`}
                    ></img>
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
              <div className="dropdown">
                <button className="dropbtn">...</button>
                <div className="dropdown-content">
                  <BtnAddSongPlaylist
                    song_id={item.songs_id}
                    playlistUser={playlistDataUser}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Loading songs...</p>
        )}
      </ul>
      <HotPlaylist />
      <HotAlbum />
    </div>
  );
};

export default BXHSong;
