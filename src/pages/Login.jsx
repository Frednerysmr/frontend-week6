import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { request, showError } from "../store/app.slice";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../store/cart.slice";
import { getPurchases } from "../store/purchases.slice";


const Login = () => {

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const submit = data => {
    dispatch(request(async () => {
      const res = await axios().post('/users/login', data);
      localStorage.setItem('token', res.data.token);
      dispatch(getCart());
      dispatch(getPurchases());
      navigate('/');
    }, {
      notificationMessage: "Successfully logged in",
      handleError: error => {
        if(error.response.status === 403){
          dispatch(showError('email already taken'))
          return;
        }
        dispatch(showError('there was an error'))
      }
    }));
  }

  return (
    <section>
      <div className="bg-dark px-5 py-4 rounded mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="mb-3">Login</h3>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Form.Group>
          <p>
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
          <Button variant="primary" type="submit" className="d-block w-100 mt-3 mb-2">
            Submit
          </Button>
        </Form>
      </div>
    </section>
  )
}

export default Login