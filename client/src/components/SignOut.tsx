import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import AuthService from '../utils/AuthService';

interface SignOutProps {
  onSignOutConfirmed: () => void;
}

const SignOut: React.FC<SignOutProps> = ({ onSignOutConfirmed }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const message = await AuthService.handleLogout();
      console.log(message);
      onSignOutConfirmed();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="danger" className='btn btn-signout w-100 mb-2' onClick={handleShow}>
        Sign Out
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleSignOut}>
            Yes
            {loading && <Spinner animation="border" size="sm" className="ms-2" />}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignOut;
