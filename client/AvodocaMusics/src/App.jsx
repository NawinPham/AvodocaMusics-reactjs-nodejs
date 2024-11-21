import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBarApp from "./components/NavBar";
import Register from "./pages/Register";
import SideBar from "./components/SideBar";
import AlbumDetail from "./pages/AlbumDetail";
import PlaylistDetail from "./pages/PlaylistDetail";
import SongDetail from "./pages/SongDetail";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Favorite from "./pages/Favorite";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AudioContextProvider } from "./contexts/AudioContext";
import SearchSong from "./pages/SearchSong";
import Footer from "./components/Footer";
import BXHSong from "./pages/BXHSong";
import UploadedSong from "./pages/UploadedSong";
import Playlist from "./pages/Playlist";
import Album from "./pages/Album";
import Genres from "./pages/Genres";
import GenreDetail from "./pages/GenreDetail";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);

 
  return (
    <>
      <AudioContextProvider>
        <NavBarApp />
        <div className="d-flex">
          <SideBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="profile" element={user ? <Profile /> : <Login />} />
              <Route path="/search" element={<SearchSong />} />
              <Route path="BXHSong" element={<BXHSong />} />
              <Route path="genre" element={<Genres />} />
              <Route
                path="/playlist"
                element={user ? <Playlist /> : <Login />}
              />
              <Route path="/playlistDetail/:id" element={<PlaylistDetail />} />
              <Route path="history" element={user ? <History /> : <Login />} />
              <Route
                path="favorite"
                element={user ? <Favorite /> : <Login />}
              />
              <Route
                path="genreDetail/:id"
                element={user ? <GenreDetail /> : <Login />}
              />
              <Route
                path="/uploaded"
                element={user ? <UploadedSong /> : <Login />}
              />
              <Route path="/album" element={user ? <Album /> : <Login />} />
              <Route path="albumDetail/:album_id" element={<AlbumDetail />} />
              <Route path="/songDetail/:song_id" element={<SongDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </Container>
        </div>
        <Footer />
      </AudioContextProvider>
    </>
  );
}

export default App;
