class AuthService {
  static async handleLogin(data: object): Promise<any> {
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION === "false") {
        url = `http://localhost:3001/user/auth/login`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/user/auth/login`;
      }

      const response: Response = await fetch(url, {
        method: "POST",
        credentials: "include", // Remove this if don't need it
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const jsonResponse: any = await response.json();
      return jsonResponse.message;
    } catch (error) {
      console.error("error occured while making request", error);
      return error;
    }
  }

  static async handleSignup(data: object): Promise<any> {
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION === "false") {
        url = `http://localhost:3001/user/auth/signup`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/user/auth/signup`;
      }

      const response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const jsonResponse: any = await response.json();

      return jsonResponse.message;
    } catch (error) {
      console.error("error occured while making request", error);
      return error;
    }
  }

  static async handleLogout(): Promise<any> { 
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION === "false") {
        url = `http://localhost:3001/user/auth/logout`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/user/auth/logout`;
      }

      const response: Response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const jsonResponse: any = await response.json();

      return jsonResponse.message;
    } catch (error) {
      console.error("error occured while making request", error);
      return error;
    }
  }

  static async checkLogin(): Promise<boolean> {
    try {
      let url: string;
      if (process.env.REACT_APP_PRODUCTION === "false") {
        url = `http://localhost:3001/user/auth/isLoggedIn`;
      } else {
        url = `https://hometownharvest-91162a140111.herokuapp.com/user/auth/isLoggedIn`;
      }

      const response: Response = await fetch(url, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

     return response.status === 200; // We just check whether the status is 200 or not using true or false
    } catch (error) {
      console.error("error occured while making request", error);
      return false;
    }
  }
}

export default AuthService;
