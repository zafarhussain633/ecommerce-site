import { useState } from "react";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";
import Login from "src/components/modals/Login";
import Link from "next/link";
import classes from "styles/navbar.module.css";
const brandName = "buyCart";

const index = () => {
  const [show, setShow] = useState(false);

  const hanleLogin = () => {
    setShow(true);
  };

  return (
    <Navbar bg="primary">
      <Container>
        <Navbar.Brand className="text-white d-flex">
          <div>
            <Link href="/">
              <span style={{ color: "white" }}>{brandName}</span>
            </Link>
          </div>
          <div className={classes.searchBox}>
            <Form className="ml-4">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </div>
        </Navbar.Brand>
        <div>
          <Button variant="warning" onClick={hanleLogin}>
            Login
          </Button>
          <Button variant="warning" onClick={hanleLogin}>
            Sign Up
          </Button>
        </div>
      </Container>
      <Login show={show} onHide={() => setShow(false)} />
    </Navbar>
  );
};

export default index;
