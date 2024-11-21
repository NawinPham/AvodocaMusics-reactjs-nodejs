import "../assets/css/Library.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/service";
import { useAudio } from "../contexts/AudioContext";
import { useContext, useState } from "react";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import { AuthContext } from "../contexts/AuthContext";

const Favorite = () => {
  const { favoriteSongDataUser, playlistDataUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const { playNewSong, togglePlayPause } = useAudio();

  // const handlePageChange = (newPage) => {
  //   if (
  //     newPage > 0 &&
  //     (!favoriteSongData || newPage <= favoriteSongData.totalPages)
  //   ) {
  //     setCurrentPage(newPage);
  //   }
  // };

  return (
    <div className="list-song container home">
      <h2>Bài hát yêu thích</h2>

      {favoriteSongDataUser && favoriteSongDataUser?.data ? (
        favoriteSongDataUser?.data.length > 0 ? (
          <>
            <ul className="list-group ">
              {favoriteSongDataUser?.data.map((items, index) => (
                <li
                  key={items.id}
                  className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
                >
                  <div className="p-2">{index + 1}</div>
                  <div className="p-2">
                    <BtnFavoriteSong
                      song_id={items?.id}
                      favoriteUser={favoriteSongDataUser}
                    />
                  </div>
                  <div className="p-2">
                    <Button
                      className="btn bg-transparent border-0"
                      onClick={() => {
                        playNewSong(items.songs_id, favoriteSongDataUser.data);
                        togglePlayPause();
                      }}
                    >
                      Chơi
                    </Button>
                  </div>
                  <div className="col-3">
                    <Link className="d-flex">
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
                      Nghệ sĩ: {items.Song.Account.username}
                    </span>
                  </div>
                  <div className="col-3 p-2">
                    <span style={{ fontSize: "12px", color: "#ccc" }}>
                      Thể loại: {items.Song.Genre.name}
                    </span>
                  </div>
                  <div style={{ marginLeft: "auto", position: "relative" }}>
                    <div className="dropdown">
                      <button className="dropbtn">...</button>
                      <div className="dropdown-content">
                        <BtnAddSongPlaylist
                          song_id={items?.id}
                          playlistUser={playlistDataUser}
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
          <p>Không có bài hát yêu thích...</p>
        )
      ) : (
        <p>Đang tài bài hát...</p>
      )}
    </div>
  );
};

export default Favorite;
