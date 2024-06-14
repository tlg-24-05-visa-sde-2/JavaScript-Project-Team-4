import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserService from '../utils/UserService';

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

const PersonalData: React.FC<PersonalDataProps> = ({user}) => {
  const [userData, setUserData] = useState(user);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await UserService.fetchUserData();
      if (data) {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    try {
      const response = await axios.put('/api/user', userData); // Update with your endpoint
      console.log('User data updated:', response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Personal Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          {editMode ? (
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.username}</span>
          )}
        </label>
        <br />
        <label>
          First Name:
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.firstName}</span>
          )}
        </label>
        <br />
        <label>
          Last Name:
          {editMode ? (
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.lastName}</span>
          )}
        </label>
        <br />
        <label>
          Email:
          {editMode ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </label>
        <br />
        <label>
          Street Address:
          {editMode ? (
            <input
              type="text"
              name="streetAddress"
              value={userData.streetAddress}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.streetAddress}</span>
          )}
        </label>
        <br />
        <label>
          City:
          {editMode ? (
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.city}</span>
          )}
        </label>
        <br />
        <label>
          State:
          {editMode ? (
            <input
              type="text"
              name="state"
              value={userData.state}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.state}</span>
          )}
        </label>
        <br />
        <label>
          Zip:
          {editMode ? (
            <input
              type="text"
              name="zip"
              value={userData.zip}
              onChange={handleInputChange}
              required
            />
          ) : (
            <span>{userData.zip}</span>
          )}
        </label>
        <br />
        <button type="button" onClick={handleEditToggle}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && <button type="submit">Save Changes</button>}
      </form>
    </div>
  );
};

export default PersonalData;
