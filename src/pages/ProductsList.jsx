import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductsThunk } from "../store/products.slice";
import ProductCard from "../components/ProductCard";
import { Col, Row } from "react-bootstrap";
import CategoriesList from "../components/CategoriesList";
import ProductSearcher from "../components/ProductSearcher";
import FilterPrice from "../components/FilterPrice";

const ProductsList = () => {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const products = useSelector(state => state.products.filteredProducts);

  return (
    <section>
      <Row>
        <Col lg={2} xl={3}>
          <h4>Filter price</h4>
          <FilterPrice />
          <h4 className="mt-5">Filter category</h4>
          <CategoriesList />
        </Col>
        <Col>
          <ProductSearcher/>
          <br />
          <Row xs={1} sm={2} lg={3} className="g-4">
            {products.map(product => (
              <Col key={product.id}>
                <ProductCard
                  product={product}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </section>
  )
}

export default ProductsList