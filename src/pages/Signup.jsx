import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { request, showError } from "../store/app.slice";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // "user created! Login with your credentials", "email already taken"
    const submit = data => {
        dispatch(request(async () => {
            await axios().post('/users', data);
            navigate('/login');
        }, {
            notificationMessage: "User created! Login with your credentials",
            handleError: error => {
                if(error.response.status === 403) {
                    dispatch(showError("Email already taken"));
                    return;
                }
                dispatch(showError("There was an error"));
            }
        }));
    }

    return (
        <section>
            <div className="bg-dark px-5 py-4 rounded mx-auto" style={{ maxWidth: "700px" }}>
                <h3 className="mb-3">Sign up</h3>
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

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="firstname"
                                    {...register("firstName")}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="lastname"
                                    {...register("lastName")}
                                />
                            </Form.Group>
                        </Col>
                    </Row>





                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>phone</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="phone"
                            {...register("phone")}
                        />
                    </Form.Group>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    <Button variant="primary" type="submit" className="d-block w-100 mt-3 mb-2">
                        Submit
                    </Button>
                </Form>
            </div>
        </section>
    )
}

export default Signup;
