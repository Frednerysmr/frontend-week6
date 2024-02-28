import { useSelector } from 'react-redux';
import spinner from '../assets/rings-spinner.svg';
import '../styles/loadingScreen.css';

const LoadingScreen = () => {

    const isLoading = useSelector(state => state.app.isLoading)

    if(!isLoading) return <></>

    return (
        <div className='loading-screen-overlay'>
            <img src={spinner} alt="loading spinner" />
        </div>
    )
}

export default LoadingScreen