import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { request } from "../store/app.slice";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { filterByCategoryThunk } from "../store/products.slice";
import ProductCard from "../components/ProductCard";
import Counter from "../components/Counter";
import { addProductCart } from "../store/cart.slice";

const ProductDetail = () => {

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const relatedProducts = useSelector(state => state.products.filteredProducts);

  useEffect(() => {
    dispatch(request(async () => {
      const res = await axios().get(`/products/${id}`);
      setProduct(res.data);
      dispatch(filterByCategoryThunk(res.data?.category.id));
    }));
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [dispatch, id]);

  const addToCart = () => {
    dispatch(addProductCart({ quantity, productId: product.id }));
  }

  if (!product) return <>Loading...</>

  return (
    <section>
      <Row>
        <Col lg={5} className="pe-5">
          <Carousel style={{ background: "#fff", borderRadius: "20px" }} interval={null} variant="dark">
            {product.productImgs?.map(image => (
              <Carousel.Item key={image.id}>
                <img
                  className="d-block w-100 mb-5"
                  style={{ height: "400px", objectFit: "contain", padding: "0 70px" }}
                  src={image.url}
                  alt={`${product.title} image`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col lg={6} className="ps-5">
          <div className="text-bold text-muted mb-3">
            {product.brand}
          </div>
          <h3 className="text-small">{product.title}</h3>
          <p>
            {product.description}
          </p>
          <Row>
            <Col>
              <span className="text-light text-muted">
                Price
              </span>
              <br />
              <span style={{ fontSize: "22px", fontWeight: "500" }}>
                $ {product.price}
              </span>
            </Col>
            <Col>
              <span className="text-light text-muted">
                Quantity
              </span>
              <Counter
                value={quantity}
                setValue={setQuantity}
              />
            </Col>
            <Button
              variant="success"
              size="lg"
              onClick={addToCart}
              className="mt-5 d-flex align-items-center justify-content-center"
            >
              <span className="material-symbols-outlined me-3">
                shopping_cart
              </span>
              <span>

                Add to Cart
              </span>
            </Button>
          </Row>
        </Col>
        <h3 className="mt-5">Discover similar items</h3>
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {relatedProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Row>
    </section>
  )
}

export default ProductDetail