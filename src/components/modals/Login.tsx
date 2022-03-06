import { FC, useState } from "react";
import { useFormik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import SignUp from "./SignUp";
import { useRouter } from "next/router";
import axios from "axios";
import { apiUrl } from "src/config";
import {setUser} from "src/utils/storage"

import * as Yup from "yup";

type Props = {
  show: boolean;
  onHide: VoidFunction;
};

const Login: FC<Props> = (props: Props) => {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState<boolean>(false);
  console.log(showSignup)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),

    onSubmit: async(values) => {
      const { data } = await axios.get(`${apiUrl}`);
      const checkLogin =  data.some((res:{userName:string, password:string, id:number})=>res.userName==values.email && res.password==values.password)
      if(checkLogin===true){
        setUser()
        router.push("/welcome")
      }
    }
  })

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              <p className="text-danger">
                {formik.touched.email && formik.errors.email}
              </p>

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <p className="text-danger">
                {formik.touched.password && formik.errors.password}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div   className="text-primary text-center">
            <a
              role="button"
              onClick={() =>{ props.onHide(); setShowSignup(true) }}
            >
              Not have an Account ? Ragister Now
            </a>
          </div>
        </Modal.Body>
      </Modal>
      <SignUp show={showSignup} onHide={() => setShowSignup(false)} />
    </>
  );
};

export default Login;
