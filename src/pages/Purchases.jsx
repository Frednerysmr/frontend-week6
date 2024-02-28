import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "react-bootstrap";
import { getPurchases } from "../store/purchases.slice";
import '../styles/purchases.css';
import { useNavigate } from "react-router-dom";


const Purchases = () => {

  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString()
  }

  const navigateToProduct = productId => {
    navigate(`/products/${productId}`);
  }

  return (
    <section>
      <h1 className="mb-5">My purchases</h1>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>purchase date</th>
            <th>quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase.id}>
              <td>
                <img
                  src={purchase.product?.productImgs?.[0]?.url}
                  alt=""
                  style={{ width: "100px", padding: " 10px", background: "#fff" }}
                />
              </td>
              <td>
                <b
                  onClick={() => navigateToProduct(purchase.product?.id)}
                  style={{ cursor: "pointer" }}
                >
                  {purchase.product?.title}
                </b>
              </td>
              <td>{formatDate(purchase.createdAt)}</td>
              <td>
                <span className="border border-light py-2 px-4">
                  {purchase.quantity}
                </span>
              </td>
              <td>
                <span className="text-bold text-success">
                  ${purchase.product?.price}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

export default Purchases