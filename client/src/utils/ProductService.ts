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
  
  static async createProduct(data: any): Promise<any> {
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
        url = `http://localhost:3001/api/products/addProduct`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/api/products/addProduct`;
      }

      data.image = localStorage.getItem("fileUrl") || "https://res.cloudinary.com/atlanta/images/w_2140,h_1428,c_scale/f_auto,q_auto/v1598980620/newAtlanta.com/AtlantaPeachtreeRoadFarmersMarket_50/AtlantaPeachtreeRoadFarmersMarket_50.jpg?_i=AA";

      console.log("data", data);
      
      const response: Response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("response", response);

      const jsonResponse: any = await response.json();

      return jsonResponse;
    } catch (error) {
      console.error("error occured while making request", error);
      return error;
    }
  }

}

export default ProductService;
