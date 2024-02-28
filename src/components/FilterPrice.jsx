import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { showError } from "../store/app.slice";
import { filterByPrice } from "../store/products.slice";

const FilterPrice = () => {

    const { handleSubmit, register } = useForm();
    const dispatch = useDispatch();

    const submit = (data) => {
        const { from, to } = data;
        if(from > to || to < from){
            dispatch(showError("Enter a valid price"));
            return;
        }
        dispatch(filterByPrice(data));
    }

    return (
        <Form onSubmit={handleSubmit(submit)}>
            <Row>
                <Col xl={6} lg={12} sm={6}>
                    <Form.Group className="mb-3" controlId="PriceFrom">
                        <Form.Label>Price from</Form.Label>
                        <Form.Control placeholder="price from" {...register("from")}/>
                    </Form.Group>
                </Col>
                <Col xl={6} lg={12} sm={6}>
                    <Form.Group className="mb-3" controlId="PriceTo">
                        <Form.Label>Price to</Form.Label>
                        <Form.Control placeholder="price to" {...register("to")}/>
                    </Form.Group>
                </Col>
            </Row>
            <Button
                className="w-100"
                type="submit"
            >
                Search
            </Button>
        </Form>
    )
}

export default FilterPrice