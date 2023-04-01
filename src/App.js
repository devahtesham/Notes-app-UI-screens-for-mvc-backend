
import { Container } from '@mui/system';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AddNoteModal from './pages/AddNoteModal';
import PrivateRoutes from './pages/components/privateRoutes/PrivateRoutes';

function App() {
  return (
    <>
        <Routes>
            <Route path='/' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path='/dashboard' element={<AddNoteModal />} />
            </Route>
            
        </Routes>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </>
  );
}

export default App;
