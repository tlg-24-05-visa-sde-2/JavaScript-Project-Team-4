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

class UserService {
  static async fetchUserData(): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/userData`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/userData`;
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        return jsonResponse;
      } else {
        return jsonResponse.message;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return error;
    }
  }

  static async addProductToCart(productId: string, quantity: number): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/cart/addToCart/${productId}?quantity=${quantity}`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/cart/addToCart/${productId}?quantity=${quantity}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        return jsonResponse;
      } else {
        return jsonResponse.message;
      }
    } catch (error) { 
      console.error("Error adding product to cart:", error);
      return error;
    }
  }

  static async removeProductFromCart(productId: string): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/cart/removeFromCart/${productId}`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/cart/removeFromCart/${productId}`;
    }

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        return jsonResponse;
      } else {
        return jsonResponse.message;
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      return error;
    }
  }

  // New method to update user data
  static async updateUserData(userData: UserData): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/updateUser`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/updateUser`;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // assuming you store the token in localStorage
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        return jsonResponse;
      } else {
        return jsonResponse.message;
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      return error;
    }
  }

  static async addFavoriteProduct(productId: string): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/addFavorite/${productId}`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/addFavorite/${productId}`;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include",
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        return jsonResponse;
      } else {
        return { message: jsonResponse.message || 'Error adding favorite product' };
      }
    } catch (error) {
      console.error("Error adding favorite product:", error);
      return { message: 'Error adding favorite product' };
    }
  }

  static async removeFavoriteProduct(productId: string): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/removeFavorite/${productId}`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/removeFavorite/${productId}`;
    }

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        credentials: "include",
      });


      const jsonResponse = await response.json();

      console.log("Remove Favorite: ", jsonResponse);
      if (response.ok) {
        return jsonResponse;
      } else {
        return { message: jsonResponse.message || 'Error removing favorite product' };
      }
    } catch (error) {
      console.error("Error removing favorite product:", error);
      return { message: 'Error removing favorite product' };
    }
  }
}



export default UserService;
