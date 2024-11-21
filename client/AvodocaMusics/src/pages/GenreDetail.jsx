import { Link, useParams } from "react-router-dom";
import { genreIdFetchData, genreSongFetchData } from "../hooks/genreFetchData";
import { Button, Container } from "react-bootstrap";
import { baseUrl } from "../utils/service";
import BtnFavoriteSong from "../components/home/BtnFavoriteSong";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import BtnAddSongPlaylist from "../components/library/BtnAddSongPlaylist";
import { useAudio } from "../contexts/AudioContext";

const GenreDetail = () => {
  const { id } = useParams();
  const { favoriteSongDataUser, playlistDataUser } = useContext(AuthContext);
  const { playNewSong, togglePlayPause } = useAudio();

  const [currentPage, setCurrentPage] = useState(1);

  const songData = genreSongFetchData(id, currentPage);
  const genreData = genreIdFetchData(id);
  console.log(songData);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && (!songData || newPage <= songData.totalPages)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container style={{ marginTop: "100px", marginLeft: "100px" }}>
      {genreData && genreData?.data ? (
        <>
          <div className="album-detail">
            <div className="image-album Boxshadow-image album-image">
              <img
                src={`${baseUrl}/uploads/uploadImage/${genreData?.data?.image}`}
                alt=""
              />
            </div>
            <div className="title-album">
              <span style={{ fontSize: "25px" }}>
                Tên thể loại : {genreData?.data?.name}
              </span>{" "}
            </div>
          </div>

          <div className="list-song container">
            <ul className="list-group">
              {songData && songData?.data && songData?.data.length > 0 ? (
                songData?.data.map((items, index) => (
                  <li
                    key={items.id}
                    className="list-group-item item-song d-flex h-2 lh-lg border-0 text-white"
                  >
                    <div className="p-2">
                      <span> {index + 1 + (currentPage - 1) * 10}</span>
                    </div>
                    <div className="p-2"></div>
                    <Button
                      className="btn bg-transparent border-0"
                      onClick={() => {
                        const SongGenre = songData.data.map((item) => ({
                          Song: item,
                        }));
                        playNewSong(items.id, SongGenre?.data);
                        togglePlayPause();
                      }}
                    >
                      Chơi
                    </Button>
                    <div className="p-2">
                      <BtnFavoriteSong
                        song_id={items.id}
                        favoriteUser={favoriteSongDataUser}
                      />
                    </div>
                    <div className="col-4">
                      <Link to={`/songDetail/${items.id}`} className="d-flex">
                        <div className="col-2">
                          <img
                            className="image"
                            style={{ width: "50px", borderRadius: "5px" }}
                            src={`${baseUrl}/uploads/uploadImage/${items.image}`}
                            alt=""
                          ></img>
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
                    <div className="dropdown">
                      <button className="dropbtn">...</button>
                      <div className="dropdown-content">
                        <BtnAddSongPlaylist
                          song_id={items.id}
                          playlistUser={playlistDataUser}
                        />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>Không có bài hát nào trong genre...</p>
              )}
            </ul>
            {songData?.data.length === 0 ? (
              ""
            ) : (
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
            )}

            <div className="description-album">
              <span>description : {genreData?.data?.description}</span>
            </div>
          </div>
        </>
      ) : (
        <p>Loading genre...</p>
      )}
    </Container>
  );
};

export default GenreDetail;
