import { useContext } from "react";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAudio } from "../contexts/AudioContext";
import { baseUrl } from "../utils/service";

const NavBarApp = () => {
  const { user } = useContext(AuthContext);
  const {
    songData,
    btnPlayPause,
    togglePlayPause,
    playNextSong,
    playPreviousSong,
    handleSeek,
    currentTime,
    songDuration,
  } = useAudio();

  return (
    <Navbar bg="dark" fixed="top">
      <Container>
        <Link to={"/"} className="link-light text-decoration-none">
          <img
            style={{ width: "70px", borderRadius: "40px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FomXNOHSMkfP6Ec96-LxqhuaX3Ldkt9VRg&s"
            alt=""
          />
          <span style={{ fontSize: "14px" }}>Avodoca Musics</span>
        </Link>

        <div>
          <div>
            <Button
              className="btn bg-transparent border-0"
              onClick={() => {
                playPreviousSong();
              }}
            >
              <i class="fa-solid fa-backward-step"></i>
            </Button>
            <Button
              className="btn bg-transparent border-0"
              onClick={() => togglePlayPause()}
            >
              {btnPlayPause ? (
                <i class="fa-solid fa-pause"></i>
              ) : (
                <i class="fa-solid fa-play"></i>
              )}
            </Button>
            <Button
              className="btn bg-transparent border-0"
              onClick={() => {
                playNextSong();
              }}
            >
              <i class="fa-solid fa-forward-step"></i>
            </Button>
            {songData && songData?.data ? (
              <>
                <img
                  style={{ width: "30px" }}
                  src={`${baseUrl}/uploads/uploadImage/${songData?.data?.image}`}
                  alt=""
                />
                <span style={{ padding: "0 10px" }}>
                  {songData?.data?.name}
                </span>
              </>
            ) : (
              <span>...</span>
            )}
          </div>
          <div className="d-flex">
            <p className="m-0">
              {currentTime !== 0
                ? Math.floor(currentTime / 60) !== 0
                  ? Math.floor(currentTime / 60) +
                    ":" +
                    Math.floor(currentTime % 60)
                  : "" + Math.floor(currentTime % 60)
                : ""}
            </p>
            <input
              type="range"
              className="form-range "
              style={{ width: "300px" }}
              value={(currentTime / songDuration) * 100 || 0}
              onChange={handleSeek}
            />
            <p className="m-0">
              {currentTime !== 0
                ? Math.floor(songDuration / 60) +
                  ":" +
                  Math.floor(songDuration % 60)
                : ""}
            </p>
          </div>
        </div>

        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user ? (
              <Link to={"/profile"}>
                Xin chào! {user?.username ? user?.username : "Welcome"}
              </Link>
            ) : (
              <Link to={"/login"} className="link-light text-decoration-none">
                Đăng nhập
              </Link>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarApp;
