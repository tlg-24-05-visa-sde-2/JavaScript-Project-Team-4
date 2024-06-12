class ProductService {
  static async getAllProducts(data: object): Promise<any> {
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
        url = `http://localhost:3001/api/allProducts`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/api/allProducts`;
      }

      const response: Response = await fetch(url, {
        method: "GET",
      });
    } catch (error) {
      console.error("error occured while making request", error);
      return error;
    }
  }
}
