import { FC, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import Login from "src/components/modals/Login";
import { apiUrl } from "src/config";
import * as Yup from "yup";
import {setUser} from "src/utils/storage"
import { Oval } from "react-loader-spinner";

type Props = {
  show: boolean;
  onHide: VoidFunction;
};

const SignUp: FC<Props> = (props: Props) => {
  const [showLogin, setshowLogin] = useState<boolean>(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(
          /[a-zA-Z]/,
          "Password Must Contain Capital and small both letter"
        ),
      confirm_password: Yup.string()
        .required("please re enter your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),

    onSubmit: async (values) => {

      const { data } = await axios.post(`${apiUrl}`, {
        userName: values.email,
        password: values.password,
      });

      if (data) {
        setUser();
        setshowLogin(true);
        props.onHide();
      }
    },
  });

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
              />
              <p className="text-danger">
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password}
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              {formik.isSubmitting ? (
                <Oval
                  height="40"
                  width="40"
                  color="#0d6efd"
                  ariaLabel="loading"
                />
              ) : (
                <Button variant="primary" type="submit">
                  Signup
                </Button>
              )}
            </div>
          </Form>
          <div className="text-primary text-center">
            <a
              role="button"
              onClick={() => {
                setshowLogin(true);
                props.onHide();
              }}
            >
              Already have an Account ? Login.
            </a>
          </div>
        </Modal.Body>
      </Modal>
      {showLogin && (
        <Login show={showLogin} onHide={() => setshowLogin(false)} />
      )}
    </>
  );
};

export default SignUp;
