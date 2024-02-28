import { useEffect, useState } from "react"
import Counter from "./Counter"
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { deleteProductCart, updateQuantity } from "../store/cart.slice";
import { setIsCartOpen } from "../store/app.slice";


const ProductCart = ({ product, index }) => {

    const [quantity, setQuantity] = useState(product.quantity);
    const total = product.product?.price * quantity;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios().put(`/cart/${product.id}`, { quantity })
            .then(() => dispatch(updateQuantity({ quantity, index })))
    }, [product.id, quantity, dispatch, index]);

    const navigateToProduct = () => {
        navigate(`/products/${product.product?.id}`);
        dispatch(setIsCartOpen(false));
    }

    const deleteProduct = () => {
        dispatch(deleteProductCart(product.id, index));
    }

    return (
        <>
            <div className='product-cart'>
                <img src={product.product?.productImgs?.[0]?.url} alt="" />
                <div className="details">
                    <h5 onClick={navigateToProduct}>
                        {product.product?.title}
                    </h5>
                    <Counter
                        value={quantity}
                        setValue={setQuantity}
                        size="sm"
                    />
                    <div className="total">
                        <span className="text-muted me-1">total: </span>
                        <span className="text-success">${total}</span>
                    </div>
                </div>
                <span
                    className="material-symbols-outlined text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={deleteProduct}
                >
                    delete
                </span>
            </div>
            <hr />
        </>
    )
}

export default ProductCart