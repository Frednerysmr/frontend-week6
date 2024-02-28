import { Button, Card } from "react-bootstrap"
import '../styles/productCard.css'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addProductCart } from "../store/cart.slice";
import useValidateLogin from "../hooks/useValidateToken";

const ProductCard = ({ product }) => {

  console.log(product);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { validateLogin } = useValidateLogin();

  const addToCart = (e) => {
    e.stopPropagation();
    const errorMessage = "You have to login to add products to the cart";
    if (!validateLogin(errorMessage)) return;
    dispatch(addProductCart({ productId: product.id, quantity: 1 }));
  }

  return (
    <Card className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
      <Card.Img
        variant="top"
        src={product.productImgs[0]?.url}
        className="product-image"
      />
      <Card.Body>
        <Card.Title className="product-title">{product.title}</Card.Title>

        <br />

        <div className="d-flex justify-content-between mb-1">
          <div>
            <span className="brand text-muted ">
              {product.brand}
            </span>
            <br />
            <span className="text-success">
              $ {product.price}
            </span>
          </div>
          <div>
            <Button variant="info" onClick={addToCart} name="addCart">
              <span className="material-symbols-outlined" >
                shopping_cart
              </span>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard