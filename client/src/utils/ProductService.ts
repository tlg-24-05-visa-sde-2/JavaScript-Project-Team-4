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
      console.error("error occured while making request", error);
      return error;
    }
  }
}

export default ProductService;
