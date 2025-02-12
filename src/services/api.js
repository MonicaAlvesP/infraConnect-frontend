import axios from "axios";

const API_URL = "https://backend-infraconnect.fly.dev";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/api/users/login/', { username, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const registerUser = async (username, password) => {
  try {
    const payload = { username, password };
    const response = await api.post('/api/users/register/', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (token, title, content) => {
  try {
    const response = await api.post(
      '/posts/',
      { title, content },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("Token:", token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token de autenticação não encontrado.");
    }

    const response = await api.get('/api/posts/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const updatePost = async (token, id, title, content) => {
  try {
    const response = await api.put(
      `/posts/${id}/`,
      { title, content },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deletePost = async (token, id) => {
  try {
    const response = await api.delete(
      `/posts/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
