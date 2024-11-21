import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContetx";

const NavBarApp = () => {
  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="dark" fixed="top">
      <Container>
        <h2>
          <Link to={"/"} className="link-light text-decoration-none">
            <img
              style={{ width: "50px", borderRadius: "40px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FomXNOHSMkfP6Ec96-LxqhuaX3Ldkt9VRg&s"
              alt=""
            />
            <span style={{ fontSize: "14px" }}>Avodoca Musics</span>
          </Link>
        </h2>

        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to={"/profile"}> Hi! {user?.username}</Link>
            <Link to={"/login"} className="link-light text-decoration-none">
              Đăng nhập
            </Link>
            <Link to={"/register"} className="link-light text-decoration-none">
              Đăng kí
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBarApp;
