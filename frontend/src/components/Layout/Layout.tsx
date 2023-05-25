import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { Modal } from '@mui/material';

function Layout() {
  const [modalIsShown, setModalIsShown] = useState(false);

  return (
    <>
      <Header handleModal={() => setModalIsShown(true)} />
      <main>
        <div className="main__container">
          <Outlet />
        </div>
      </main>
      <Footer />

      {modalIsShown && (
        <Modal
          open={modalIsShown}
          onClose={() => setModalIsShown(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <Form />
          </>
        </Modal>
      )}
    </>
  );
}

export default Layout;
