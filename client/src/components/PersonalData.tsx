import React, { useState, useEffect } from 'react';
import UserService from '../utils/UserService';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

interface PersonalDataProps {
  user: UserData;
}

const PersonalData: React.FC<PersonalDataProps> = ({ user }) => {
  const [userData, setUserData] = useState<UserData | null>(user);
  const [originalUserData, setOriginalUserData] = useState<UserData | null>(user);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await UserService.fetchUserData();
      if (data) {
        setUserData(data.user);
        setOriginalUserData(data.user);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (editMode) {
      setUserData(originalUserData);
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveChanges = async () => {
    if (!userData) return;

    try {
      const response = await UserService.updateUserData(userData);
      console.log('User data updated:', response);
      setOriginalUserData(userData);
      setEditMode(false); // Toggle off edit mode after saving
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Personal Data</h1>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.username}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.firstName}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.lastName}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              {editMode ? (
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.email}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="streetAddress">
              <Form.Label>Street Address</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="streetAddress"
                  value={userData.streetAddress}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.streetAddress}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="city"
                  value={userData.city}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.city}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="state"
                  value={userData.state}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.state}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="zip">
              <Form.Label>Zip</Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name="zip"
                  value={userData.zip}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p>{userData.zip}</p>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleEditToggle}>
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
        {editMode && <Button variant="success" onClick={handleSaveChanges}>Save Changes</Button>}
      </Form>
    </Container>
  );
};

export default PersonalData;
