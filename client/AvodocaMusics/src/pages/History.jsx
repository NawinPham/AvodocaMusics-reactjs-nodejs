import "../assets/css/Library.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { historyListenFetchData } from "../hooks/historyListenFetchData";
import { baseUrl } from "../utils/service";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";
import { useAudio } from "../contexts/AudioContext";
import { useContext, useState } from "react";
import HotAlbum from "../components/home/HotAlbum";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import { AuthContext } from "../contexts/AuthContext";

const History = () => {
  const { user, favoriteSongDataUser, playlistDataUser } =
    useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { playNewSong, togglePlayPause } = useAudio();
  const { historyListenData } = historyListenFetchData(
    user?.token,
    currentPage
  );

  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      (!historyListenData || newPage <= historyListenData.totalPages)
    ) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div
      className="list-song container home"
      style={{ marginTop: "130px", marginLeft: "100px" }}
    >
      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>Lịch sử nghe</h2>
      <ul className="list-group">
        {historyListenData && historyListenData?.data ? (
          historyListenData?.data.map((item, index) => (
            <li
              key={item.id}
              className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
            >
              <div className="p-2">
                <span> {index + 1 + (currentPage - 1) * 10}</span>
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
                    playNewSong(item.songs_id, historyListenData.data);
                    togglePlayPause();
                  }}
                >
                  Chơi
                </Button>
              </div>

              <div className="col-4">
                <Link className="d-flex" to={`/songDetail/${item.songs_id}`}>
                  <div className="col-2">
                    <img
                      className="image"
                      style={{ width: "50px", borderRadius: "5px" }}
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
      <div style={{ textAlign: "center" }}>
        <Button
          className="btn bg-transparent border-0"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Sau
        </Button>
        <Button
          className="btn bg-transparent border-0"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Trước
        </Button>
      </div>
      <HotAlbum />
    </div>
  );
};

export default History;
