import { Container } from "react-bootstrap";
import "../assets/css/Home.css";
import HotPlaylist from "../components/home/HotPlaylist";
import HotAlbum from "../components/home/HotAlbum";

const Home = () => {
  return (
    <Container>
      <div className="home">
        <HotAlbum />
        <HotPlaylist />

        {/* <HotSong /> */}
      </div>
    </Container>
  );
};

export default Home;
