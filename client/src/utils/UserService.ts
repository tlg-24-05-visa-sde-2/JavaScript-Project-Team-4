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

  static async updateUser(userId: string, fileUrl: string): Promise<any> {
    let url: string;
    if (process.env.REACT_APP_PRODUCTION?.trim() === "false") {
      url = `http://localhost:3001/user/userData`;
    } else {
      url = `https://hometownharvest-91162a140111.herokuapp.com/user/userData`;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          fileUrl,
        }),
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
}

export default UserService;
