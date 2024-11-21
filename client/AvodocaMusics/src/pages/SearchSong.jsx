import { Link, useLocation } from "react-router-dom";
import searchSongFetchData from "../hooks/searchSongFetchData";
import { Button } from "react-bootstrap";
import { baseUrl } from "../utils/service";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import { useContext, useState } from "react";
import { useAudio } from "../contexts/AudioContext";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";
import HotPlaylist from "../components/home/HotPlaylist";
import HotAlbum from "../components/home/HotAlbum";
import { AuthContext } from "../contexts/AuthContext";

const SearchSong = () => {
  const { favoriteSongDataUser, playlistDataUser } = useContext(AuthContext);
  const { playNewSong, togglePlayPause } = useAudio();

  const location = useLocation(); // Lấy thông tin URL
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name"); // Lấy tham số tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);

  const { searchData } = searchSongFetchData(name, currentPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && (!searchData || newPage <= searchData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  const handlePlaySong = (songId, Song, data) => {
    playNewSong(songId, Song, data);
    togglePlayPause();
  };

  return (
    <div
      className="list-song container "
      style={{ marginTop: "130px", marginLeft: "100px" }}
    >
      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>
        Kêt quả "{name}"
      </h2>
      <ul className="list-group">
        {searchData && searchData?.data && searchData?.data.length > 0 ? (
          searchData?.data.map((item, index) => (
            <li
              className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
              key={item.Song.id}
            >
              <div className="p-2">
                <span> {index + 1 + (currentPage - 1) * 10}</span>
              </div>
              <div className="p-2">
                <BtnFavoriteSong
                  song_id={item.Song.id}
                  favoriteUser={favoriteSongDataUser}
                />
              </div>
              <div className="p-2">
                <Button
                  className="btn bg-transparent border-0"
                  onClick={() => {
                    handlePlaySong(item?.Song?.id, item.Song, searchData?.data);
                  }}
                >
                  Chơi
                </Button>
              </div>

              <div className="col-4">
                <Link to={`/songDetail/${item.Song.id}`} className="d-flex">
                  <div className="col-2">
                    <img
                      className="image"
                      src={`${baseUrl}/uploads/uploadImage/${item.Song.image}`}
                      alt=""
                      style={{ width: "50px", borderRadius: "5px" }}
                    />
                  </div>
                  <div className="p-2">
                    <span>{item.Song.name}</span>
                  </div>
                </Link>
              </div>
              <div className="col-3 p-2">
                <span style={{ fontSize: "12px", color: "#ccc" }}>
                  Nghệ sĩ: {item?.Song.Account?.username}
                </span>
              </div>
              <div className="col-3 p-2">
                <span style={{ fontSize: "12px", color: "#ccc" }}>
                  Thể loại: {item?.Song.Genre?.name}
                </span>
              </div>

              <div className="dropdown">
                <button className="dropbtn">...</button>
                <div className="dropdown-content">
                  <BtnAddSongPlaylist
                    song_id={item.Song.id}
                    playlistUser={playlistDataUser}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Không có kết quả nào...</p>
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
      <HotPlaylist />
      <HotAlbum />
    </div>
  );
};

export default SearchSong;
