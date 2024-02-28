import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { request } from "../store/app.slice";
import axios from "../utils/axios";
import { ListGroup } from "react-bootstrap";
import { filterByCategoryThunk, getProductsThunk } from "../store/products.slice";

const CategoriesList = () => {

    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState('all');

    useEffect(() => {
        dispatch(request(async () => {
            const res = await axios().get('/categories');
            setCategories(res.data);
        }))
    }, [dispatch]);

    const filterCategory = id => {
        if(id === 'all'){
            dispatch(getProductsThunk());
            setCategorySelected('all');
            return;
        }
        dispatch(filterByCategoryThunk(id));
        setCategorySelected(id)
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => filterCategory('all')}
                active={categorySelected === 'all'}
            >
                All
            </ListGroup.Item>
            {categories.map(category => (
                <ListGroup.Item
                    key={category.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => filterCategory(category.id)}
                    active={categorySelected === category.id}
                >
                    {category.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default CategoriesList