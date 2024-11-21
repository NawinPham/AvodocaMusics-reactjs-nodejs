import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { LoginUser, loginError, loginLoading, loginInfo, updateLoginInfo } =
    useContext(AuthContext);

  const handleLoginGoogle = () => {
    window.open("http://localhost:8082/api/users/auth/google", "_self");
  };

  return (
    <Form onSubmit={LoginUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>
            <Form.Control
              type="text"
              placeholder="Email"
              onChange={(e) => {
                updateLoginInfo({ ...loginInfo, email: e.target.value });
              }}
            />
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                updateLoginInfo({ ...loginInfo, password: e.target.value });
              }}
            />
            <Button
              style={{ backgroundColor: "#30720e", border: 0 }}
              variant="primary"
              type="submit"
            >
              {loginLoading ? "Đang thực hiện..." : "Đăng nhập"}
            </Button>
            {loginError?.message && (
              <Alert>
                <p>{loginError?.message}</p>
              </Alert>
            )}
            <p>
              Bạn chưa có tài khoản?{" "}
              <Link to={"/register"} className="tag-a-hover">
                Đăng kí
              </Link>
            </p>
            <Button
              className="bg-white border-0 text-dark"
              onClick={handleLoginGoogle}
            >
              Login with google
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
