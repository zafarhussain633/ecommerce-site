import { FC } from "react";
import { useFormik, ErrorMessage } from "formik";
import { Modal, Button, Form } from "react-bootstrap";
import * as Yup from "yup";

const Login = (props: any) => {
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

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
            
              <p className="text-danger">{formik.touched.email && formik.errors.email}</p>

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
                 <p className="text-danger">{formik.touched.password && formik.errors.password}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
