import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContetx";

const Login = () => {
  const { LoginUser, loginError, loginLoading, loginInfo, updateLoginInfo } =
    useContext(AuthContext);

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
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }
            />
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
            <Button
              style={{ backgroundColor: "#30720e", border: 0 }}
              variant="primary"
              type="submit"
            >
              {loginLoading ? "Getting you in..." : "Login"}
            </Button>
            {loginError?.message && (
              <Alert>
                <p>{loginError?.message}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
