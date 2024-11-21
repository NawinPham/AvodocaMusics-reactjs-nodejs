import "../assets/css/UploadedSong.css";
import { Link } from "react-router-dom";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";
import BtnAddSongAlbum from "../components/library/BtnAddSongAlbum";
import { useContext, useState } from "react";
import { useAudio } from "../contexts/AudioContext";
import { Button } from "react-bootstrap";
import { baseUrl } from "../utils/service";
import BtnCreateSong from "../components/library/BtnCreateSong";
import { songFetchData } from "../hooks/songFetchData";
import { AuthContext } from "../contexts/AuthContext";

const UploadedSong = () => {
  const { user, favoriteSongDataUser, playlistDataUser, albumDataUser } =
    useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { songData, setSongData } = songFetchData(user?.token, currentPage);
  const { playNewSong, togglePlayPause } = useAudio();

  const handlePageChange = (newPage) => {
    if (newPage > 0 && (!songData || newPage <= songData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  const handleCreateSong = (newPlaylist) => {
    setSongData((prevData) => {
      // Nếu prevData.data là mảng, chúng ta cập nhật thuộc tính data
      return {
        ...prevData, // Giữ lại các thuộc tính khác của prevData
        data: [...prevData.data, newPlaylist], // Thêm playlist mới vào mảng data
      };
    });
  };

  return (
    <div className="container home ">
      <BtnCreateSong onCreate={handleCreateSong} />
      <h2>Bài hát đã tải lên</h2>
      {songData && songData?.data ? (
        songData?.data.length > 0 ? (
          <>
            <ul className="list-group list-upload-song">
              {songData?.data.map((items, index) => (
                <li
                  key={items.id}
                  className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
                >
                  <div className="p-2">{index + 1}</div>
                  <div className="p-2">
                    <BtnFavoriteSong
                      song_id={items.id}
                      favoriteUser={favoriteSongDataUser}
                    />
                  </div>
                  <div className="p-2">
                    <Button
                      className="btn bg-transparent border-0"
                      onClick={() => {
                        const songs = {
                          name: items.name,
                          image: items.image,
                        };
                        playNewSong(items.id, songs);
                        togglePlayPause();
                      }}
                    >
                      Chơi
                    </Button>
                  </div>

                  <div className="col-4">
                    <Link className="d-flex" to={`/songDetail/${items.id}`}>
                      <div className="col-2">
                        <img
                          className="image"
                          src={`${baseUrl}/uploads/uploadImage/${items.image}`}
                          alt=""
                        />
                      </div>
                      <div className="p-2">
                        <span>{items.name}</span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-3 p-2">
                    <span style={{ fontSize: "12px", color: "#ccc" }}>
                      Nghệ sĩ: {items.Account.username}
                    </span>
                  </div>
                  <div className="col-3 p-2">
                    <span style={{ fontSize: "12px", color: "#ccc" }}>
                      Thể loại: {items.Genre.name}
                    </span>
                  </div>
                  <div style={{ marginLeft: "auto", position: "relative" }}>
                    <div className="dropdown">
                      <button className="dropbtn">...</button>
                      <div className="dropdown-content">
                        <BtnAddSongPlaylist
                          song_id={items.id}
                          playlistUser={playlistDataUser}
                        />
                        <BtnAddSongAlbum
                          song_id={items.id}
                          albumUser={albumDataUser}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
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
          </>
        ) : (
          <p>Không có bài hát nào...</p>
        )
      ) : (
        <p>Đang tải bài hát...</p>
      )}
    </div>
  );
};

export default UploadedSong;
