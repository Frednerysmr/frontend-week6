
import { useEffect, useMemo } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutCart, getCart } from '../store/cart.slice';
import '../styles/cartSidebar.css';
import ProductCart from './ProductCart';
import { useNavigate } from 'react-router-dom';
import { setIsCartOpen } from '../store/app.slice';

const CartSidebar = () => {

    const dispatch = useDispatch();
    useEffect(() => dispatch(getCart()), [dispatch]);
    const cartProducts = useSelector(state => state.cart);
    const navigate = useNavigate();
    const isCartOpen = useSelector(state => state.app.isCartOpen)
    const handleClose = () => {
        dispatch(setIsCartOpen(false));
    }

    const total = useMemo(() => {
        let total = 0;
        cartProducts.forEach(p => {
            total += p.product?.price * p.quantity
        })
        return total;
    }, [cartProducts])

    const checkout = () => {
        dispatch(checkoutCart());
        handleClose();
        navigate('/purchases');
    }

    return (
        <Offcanvas show={isCartOpen} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="sidebar-body">
                <div className="products-list">
                    {cartProducts.map((product, i) => (
                        <ProductCart 
                            key={product.id} 
                            product={product} 
                            index={i}
                        />
                    ))}
                </div>
                <div className="sidebar-footer">
                    <div className="d-flex justify-content-between my-2">
                        <span className="text-muted">Subtotal:</span> 
                        <span className="total">${total}</span>
                    </div>
                    <Button 
                        size="lg"
                        onClick={checkout}
                    >
                        Checkout
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CartSidebar