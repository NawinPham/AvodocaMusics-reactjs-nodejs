import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import NavBarApp from "./components/layout/NavBar";
import SliderBar from "./components/layout/SliderBar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContetx";
import Songs from "./page/Song";
import Footer from "./components/layout/Footer";
import Genres from "./page/Genre";
import Account from "./page/Account";
import Artist from "./page/Artist";
import Role from "./page/Roles";
import Login from "./page/Login";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <NavBarApp />
      <div className="d-flex">
        <SliderBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={user ? <Songs /> : <Login />} />
            <Route
              path="/genres"
              element={user ? <Genres token={user?.token} /> : <Login />}
            />
            <Route
              path="/accounts"
              element={user ? <Account token={user?.token} /> : <Login />}
            />
            <Route
              path="/artists"
              element={user ? <Artist token={user?.token} /> : <Login />}
            />
            <Route path="/roles" element={user ? <Role /> : <Login />} />

            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
