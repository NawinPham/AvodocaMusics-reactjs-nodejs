import { Button, Container } from "react-bootstrap";
import "../assets/css/SongDetail.css";
import "../assets/css/Home.css";
import getIdSongFetchData from "../hooks/getIdSongFetchData";
import { useParams } from "react-router-dom";
import { baseUrl, postRequest } from "../utils/service";
import { useAudio } from "../contexts/AudioContext";
import HotPlaylist from "../components/home/HotPlaylist";
import HotAlbum from "../components/home/HotAlbum";
import { commentFetchData } from "../hooks/commentFetchData";
import { Comment } from "../components/songDetail/Comment";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SongDetail = () => {
  const { song_id } = useParams();
  const { songData, songError, songLoading } = getIdSongFetchData(song_id);
  const { cmtData, setCmtData } = commentFetchData(song_id);
  const { playNewSong } = useAudio();

  const { user } = useContext(AuthContext);
  const [cmt, setCmt] = useState("");

  const HandleCreateCmt = async (event) => {
    if (event.key === "Enter") {
      if (cmt !== "") {
        const response = await postRequest(
          `${baseUrl}/comments/create/${song_id}`,
          JSON.stringify({ comment: cmt }),
          user?.token
        );

        if (response.error) {
          console.log("lỗi rồi", response.message);
          return;
        }

        setCmtData((prev) => {
          return {
            ...prev,
            data: [response.data, ...prev.data],
          };
        });
        setCmt("");
      }
    }
  };

  if (songLoading) return <p>Loading...</p>;
  if (songError) return <p>Error: {songError.message}</p>;

  return (
    <Container style={{ marginLeft: "100px" }}>
      {songData && songData.data ? (
        <>
          <div className="song-detail">
            <div className="song-image Boxshadow-image">
              <img
                src={`${baseUrl}/uploads/uploadImage/${songData.data.image}`}
                alt=""
              />
            </div>
            <div className="song-title ">
              <br />
              <span>Name : {songData.data?.name}</span>
              <br />
              <Button
                className="btn bg-transparent border-0"
                onClick={() => {
                  playNewSong(songData.data?.id, songData.data);
                }}
              >
                <i class="fa-solid fa-play"></i>
              </Button>
            </div>
          </div>
          <span>description : {songData.data?.description}</span>
        </>
      ) : (
        <p>Loading song...</p>
      )}

      <div className="comment">
        <input
          value={cmt}
          onKeyDown={HandleCreateCmt}
          type="text"
          placeholder="Hãy viết gì đó..."
          onChange={(e) => setCmt(e.target.value)}
        />

        {cmtData && cmtData.data ? (
          cmtData?.data.map((items, index) => (
            <Comment data={items} key={index} />
          ))
        ) : (
          <p>Đang tải bình luận...</p>
        )}
      </div>
      <HotPlaylist />
      <HotAlbum />
    </Container>
  );
};

export default SongDetail;
