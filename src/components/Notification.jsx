import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import '../styles/notification.css';
import { closeNotification } from "../store/app.slice";

const Notification = () => {

    const { show, variant, message } = useSelector(state => state.app.notification);
    const dispatch = useDispatch();

    return (
        <div className="notification-container">
            <ToastContainer position="middle-center">
                <Toast
                    className="d-inline-block m-1 text-light"
                    bg={variant}
                    show={show} 
                    delay={3000}
                    onClose={() => dispatch(closeNotification())}  
                    autohide
                >
                    <Toast.Body className={variant === 'Dark' && 'text-white'}>
                        {message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default Notification