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
}

export default UserService;