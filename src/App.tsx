import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from "./Routes";

import { UserContextProvider } from './contexts/userContext'

import './App.css'

function App() {
  return (
    <>
      <UserContextProvider>
        <ToastContainer position='bottom-center' />
        <Routes />
      </UserContextProvider>
    </>
  );
}

export default App;
