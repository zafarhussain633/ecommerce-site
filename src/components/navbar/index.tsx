import { useState } from "react";
import { Navbar, Container, Form, FormControl, Button } from "react-bootstrap";
import Login from "components/modals/Login"

const index = () => {

   const [show, setShow] = useState(false);

  const hanleLogin = () => {
    setShow(true);
  };

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#" className="text-white">
          BuyCart
        </Navbar.Brand>

        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Button variant="warning" onClick={hanleLogin}>
          Login
        </Button>
      </Container>
      <Login show={show} onHide={()=>setShow(false)}/>
    </Navbar>
  );
};

export default index;
