import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PickerOverlay } from "filestack-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home, Login, Signup, Payments, Profile } from "./pages/index";
import UserService from "./utils/UserService";
import AuthService from "./utils/AuthService";
import CreateProduct from "./pages/products/CreateProduct";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import ProductDescription from "./pages/products/ProductDescription";
import AllProducts from './pages/products/AllProducts';
import Checkout from './pages/Checkout';
import Return from './pages/Return';
import About from "./pages/About";
import Cart from "./pages/Cart";

function App(): React.ReactElement {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // For checking if the user is logged in
  const [showPicker, setShowPicker] = useState<boolean>(false); // For the FileStack Image Uploader
  const fileStackKey = process.env.REACT_APP_FILESTACK_KEY ?? ""; // FileStack API KEY
  const [reRender, setReRender] = useState<boolean>(false); // For re-rendering the component

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
  };

  const handleUploadDone = async (res: any): Promise<any> => {
    try {
      const fileUrl = res.filesUploaded[0].url.trim(); // Get the imageUrl from the fileStack response
      localStorage.setItem("fileUrl", fileUrl); // Save the imageUrl to the localStorage
      setShowPicker(false); // Close the fileStack uploader
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserdata();
    setReRender(false);
  }, [reRender]);


  const props = {
    setShowPicker,
    showPicker,
    userData,
    isLoggedIn,
    fileStackKey,
    setReRender,
  } as any;


  return (
    <AuthProvider>
      <Router>
        <ToastContainer theme="colored" autoClose={2000} />
        {showPicker && (
          <PickerOverlay
            apikey={fileStackKey}
            onUploadDone={(res: any) => handleUploadDone(res)}
            pickerOptions={{
              onClose: () => {
                setShowPicker(false);
              },
            }}
          />
        )}
        <Routes>
          <Route path="/" element={<Home props={props} />} />
          {/* Authentication */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Stripe */}
          <Route path="/payments/setup" element={<Payments />} />
  
          {/* PRODUCTS */}
          <Route path="/products" element={<AllProducts props={props} />} />
          <Route path='/products/create-product' element={<CreateProduct props={props} />} />
          <Route path="/product/:id" element={<ProductDescription props={props} />} />

          {/* Cart/Checkout */}
          <Route path="/checkout" element={<Checkout props={props} />} />
          <Route path="/return" element={<Return />} />
          <Route
            path="/product/:id"
            element={<ProductDescription props={props} />}
          />
          {/* User Profile */}

          <Route path="/profile" element={<Profile {...props} props={props} />} />

          
          <Route path="/about" element={<About props={props} />} />
          <Route path="/cart" element={<Cart props={props} />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;