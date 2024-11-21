import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";

const Register = () => {
  return (
    <Form>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10%",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2 style={{ textAlign: "center" }}>Register</h2>
            <Form.Control required type="email" placeholder="Email" />
            <Form.Control required type="password" placeholder="Password" />
            <Button
              style={{ backgroundColor: "#30720e", border: 0 }}
              variant="primary"
              type="submit"
            >
              Register
              {/* {loginLoading ? "Getting you in..." : "Login"} */}
            </Button>
            {/* {loginError?.message && (
              <Alert>
                <p>{loginError?.message}</p>
              </Alert>
            )} */}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
