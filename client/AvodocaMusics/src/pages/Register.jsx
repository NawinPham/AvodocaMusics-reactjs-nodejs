import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    registerUser,
    registerError,
    registerLoading,
    registerInfo,
    updateRegisterInfo,
  } = useContext(AuthContext);
  return (
    <Form onSubmit={registerUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{ textAlign: "center" }}>Đăng kí</h2>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(e) => {
                updateRegisterInfo({
                  ...registerInfo,
                  username: e.target.value,
                });
              }}
            />
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => {
                updateRegisterInfo({ ...registerInfo, email: e.target.value });
              }}
            />
            <Form.Control
              type="password"
              placeholder="Mật kh"
              onChange={(e) => {
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                });
              }}
            />
            <Button
              style={{ backgroundColor: "#30720e", border: 0 }}
              variant="primary"
              type="submit"
            >
              {registerLoading ? "Đang thực hiện..." : "Đăng kí"}
            </Button>
            {registerError?.message && (
              <Alert>
                <p>{registerError?.message}</p>
              </Alert>
            )}
            <p>
              Bạn đã có tài khoản?{" "}
              <Link to={"/login"} className="tag-a-hover">
                Đăng nhập
              </Link>
            </p>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
