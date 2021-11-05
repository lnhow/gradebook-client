import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import NavBar from './navBar';
import Router from './router';
import Footer from './footer';

function DefaultLayout() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div style={{minHeight: '80vh'}}>
        <Router/>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        pauseOnHover={false}
        closeOnClick
      />
      <Footer />
    </BrowserRouter>
  );
}

export default DefaultLayout;
