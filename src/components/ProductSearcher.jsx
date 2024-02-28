import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { filterByTitleThunk } from '../store/products.slice';

const ProductSearcher = () => {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const searchProduct = e => {
        e.preventDefault();
        dispatch(filterByTitleThunk(search));
    }
    return (
        <form onSubmit={searchProduct}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search a product"
                    aria-label="Search a product"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button variant="outline-success" type="submit">
                    <div className="d-flex">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span className='d-block ms-1'>Search</span>
                    </div>
                </Button>
            </InputGroup>
        </form>
    )
}

export default ProductSearcher