class ProductService {
  static async getAllProducts(): Promise<any> {
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
        url = `http://localhost:3001/api/products/allProducts`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/api/products/allProducts`;
      }

      const response: Response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const jsonResponse: any = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error("error occurred while making request", error);
      return error;
    }
  }

  static async getSingleProduct(id: string | null): Promise<any> {
    if (id === null) {
      throw new Error("Product ID cannot be null");
    }

    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
        url = `http://localhost:3001/api/products/${id}`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/api/products/${id}`;
      }

      const response: Response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonResponse: any = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error("error occurred while making request", error);
      return error;
    }
  }
}

export default ProductService;
