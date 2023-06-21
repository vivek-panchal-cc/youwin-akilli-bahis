import './App.scss';
import AppRoute from './Routes';

// eslint-disable-next-line
import { app } from './config/firebaseConfig'; // firebase initializeApp app don't remove it.

// Import Swiper styles
import 'swiper/css';

function App() {
  
  return (
    <>
        <AppRoute />
    </>
  );
}

export default App;
