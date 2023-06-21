import './App.scss';
import AppRoute from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line
import { app } from './config/firebaseConfig'; // firebase initializeApp app don't remove it.

// Import Swiper styles
import 'swiper/css';
import TipCollectionModal from './components/tipCollectionModal';

function App() {
  
  return (
    <>
        <TipCollectionModal />
        <AppRoute />
    </>
  );
}

export default App;
