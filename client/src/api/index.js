import axios from "axios";

// const baseURL = "https://diary.herokuapp.com";
const baseURL = "http://localhost:5000";
const API = axios.create({ baseURL: baseURL });

// const cancelToken = axios.CancelToken;
// let cancel;

API.interceptors.request.use((req) => {
  // if (localStorage.getItem("user")) {
  //   req.headers.authorization = `Bearer ${
  //     JSON.parse(localStorage.getItem("user")).token
  //   }`;
  // }
  req.withCredentials = true;
  // req.cancelToken = new cancelToken((c) => {
  //   cancel = c;
  // });
  return req;
});

export const fetchPost = (id) =>
  API.post(`/posts/${id}`, {
    myId: JSON.parse(localStorage.getItem("user"))?._id,
  });
export const fetchPosts = (page) =>
  API.post(`/posts?page=${page}`, {
    myId: JSON.parse(localStorage.getItem("user"))?._id,
  });
export const fetchPaginate = () => API.get("/posts/paginate");
export const fetchPostsBySearch = (searchQuery) =>
  API.post(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags || "none"
    }`,
    {
      myId: JSON.parse(localStorage.getItem("user"))?._id,
    }
  );
export const fetchPostsByUser = (userid) => API.get(`/posts/user/${userid}`);
export const fetchUserFavorites = (userid) =>
  API.get(`/posts/favorites/${userid}`);
export const createPost = (formData) => API.post("/posts/create", formData);
export const updatePost = (id, formData) => API.patch(`/posts/${id}`, formData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const unLikePost = (id) => API.patch(`/posts/${id}/unlike`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const logout = () =>
  API.delete(`/user/logout/${JSON.parse(localStorage.getItem("user"))?._id}`);
export const changePassword = (formData) =>
  API.patch("/user/changePassword", formData);
export const commentPost = (comment, postId) =>
  API.post(`/posts/${postId}/comment`, { comment });
export const deleteComment = (commentId, postId) =>
  API.delete(`/posts/${commentId}/${postId}`);
export const getUserProfile = (userId) => API.get(`/user/profile/${userId}`);
export const getUserPostLength = (userId) =>
  API.get(`/user/profile/${userId}/postLength`);
export const updateUserAvatar = (formData) =>
  API.patch("/user/avatar", formData);
export const updateUserProfile = (updateData, type) =>
  API.patch(`/user/profile/${type}`, { updateData });
export const favoritePost = (postId) => API.patch(`/user/${postId}/favorite`);
export const unFavoritePost = (postId) =>
  API.patch(`/user/${postId}/unfavorite`);

export { baseURL };
