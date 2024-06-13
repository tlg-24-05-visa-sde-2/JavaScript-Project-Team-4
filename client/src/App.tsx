import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { PickerOverlay } from 'filestack-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Signup, Payments } from './pages/index';
import UserService from './utils/UserService';
import AuthService from './utils/AuthService';
import CreateProduct from './pages/products/CreateProduct';

function App(): React.ReactElement {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // For checking if the user is logged in
  const [showPicker, setShowPicker] = useState<boolean>(false); // For the FileStack Image Uploader
  const fileStackKey = process.env.REACT_APP_FILESTACK_KEY ?? ""; // FileStack API KEY

  const fetchUserdata = async () => {
    const loggedIn = await AuthService.checkLogin();
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      return;
      }
      
      const response = await UserService.fetchUserData();
      if (response.user) {
      setUserData(response.user);
    }
  }

  const handleUploadDone = async (res: any): Promise<any> => {
    try {
        const fileUrl = res.filesUploaded[0].url.trim(); // Get the imageUrl from the fileStack response
        localStorage.setItem("fileUrl", fileUrl); // Save the imageUrl to the localStorage

        setShowPicker(false); // Close the fileStack uploader

    } catch (error) {
        console.error(error);
    }
}

  useEffect(() => {
    fetchUserdata();
  }, []);

  const props = { setShowPicker, showPicker, userData, isLoggedIn } as any;

  return (
    <Router>
    <ToastContainer theme="colored" autoClose={2000} />
    {showPicker && (
                    <PickerOverlay
                        apikey={fileStackKey}
                        onUploadDone={(res: any) => handleUploadDone(res)}
                        pickerOptions={{
                            onClose: () => {
                                setShowPicker(false)
                            }
                        }}
                    />
                )}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payments/setup" element={<Payments />} />
      <Route path='/products/create-product' element={<CreateProduct props={props} />}/>
    </Routes>
  </Router>
  );
}

export default App;
