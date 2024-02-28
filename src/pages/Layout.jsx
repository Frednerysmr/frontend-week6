import { Outlet } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';
import { Container } from 'react-bootstrap';
import Notification from '../components/Notification';
import LoadingScreen from '../components/LoadingScreen';
import CartSidebar from '../components/CartSidebar';
import useValidateLogin from '../hooks/useValidateToken';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../store/app.slice';

const Layout = () => {

  const { validateLogin, logout } = useValidateLogin();
  const dispatch = useDispatch();

  const openCart = () => {
    const errorMessage = "You must login to access to your cart"
    if(!validateLogin(errorMessage)) return;
    dispatch(setIsCartOpen(true));
  }

  return (
    <>
        <div className="purposes">
          Frontend made by academlo instructors for educational purposes
        </div>
        <MyNavbar
          openCart={openCart}
          logout={logout}
        />
        <CartSidebar />
        <Notification />
        <LoadingScreen />
        <Container className='my-5'>
            <Outlet />
        </Container>
    </>
  )
}

export default Layout