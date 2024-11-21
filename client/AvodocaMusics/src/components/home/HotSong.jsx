import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../utils/service";
import { useAudio } from "../../contexts/AudioContext";
import { hotSongfetchData } from "../../hooks/hotSongFetchData";
import BtnAddSongPlaylist from "../library/BtnAddSongPlaylist";
import BtnFavoriteSong from "./BtnFavoriteSong";

const HotSong = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { hotSongData } = hotSongfetchData(currentPage);

  const { playNewSong, togglePlayPause } = useAudio();

  const handlePageChange = (newPage) => {
    if (newPage > 0 && (!songData || newPage <= songData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  console.log(hotSongData);

  return (
    <div className="list-song">
      <h2 style={{ marginLeft: "18px", marginTop: "30px" }}>Bài hát của bạn</h2>
      <ul style={{ borderTop: "1px solid #363636" }}>
        {hotSongData && hotSongData.data ? (
          hotSongData.data.map((item, index) => (
            <li
              key={item.id}
              style={{
                height: "70px",
                lineHeight: "70px",
                position: "relative",
              }}
            >
              <span> {index + 1 + (currentPage - 1) * 10}</span>
              <Button
                className="btn bg-transparent border-0"
                onClick={() => {
                  const hotSongData = {
                    name: item.name,
                    image: item.image,
                  };
                  playNewSong(item.id, hotSongData);
                  togglePlayPause();
                }}
              >
                Chơi
              </Button>
              <BtnFavoriteSong song_id={item.id} token={token} />
              <Link to={`/songDetail/${item.id}`}>
                <img
                  style={{ width: "50px", borderRadius: "5px" }}
                  src={`${baseUrl}/uploads/uploadImage/${item.image}`}
                ></img>
                <span>{item.name}</span>
              </Link>
              <div className="dropdown">
                <button className="dropbtn">...</button>
                <div className="dropdown-content">
                  <BtnAddSongPlaylist song_id={item.id} token={token} />
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Songs Loadding...</p>
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
    </div>
  );
};

export default HotSong;
