import * as api from "../api/index";
import {
  FETCH_ALL,
  FETCH_ALL_BY_SEARCH,
  CREATE,
  UPDATE,
  ERROR,
  SET_FEEDBACK,
  FETCH_USER_POSTS,
  FETCH_USER_FAVORITES,
  FETCH_ONE,
  COMMENT_POST,
  DELETE_COMMENT,
  DELETE_POST_AUTH,
  CREATE_POST_AUTH,
  UPDATE_POST_AUTH,
  FETCH_PAGINATE,
  DELETE,
  PROGRESS,
  PROGRESS_END,
} from "../constants/actionTypes";
import { logout } from "./auth";

export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_ONE, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { ...data, page } });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getPaginate = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPaginate();
    dispatch({ type: FETCH_PAGINATE, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_ALL_BY_SEARCH, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getPostsbyUser = (userid, page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsByUser(userid, page);
    dispatch({ type: FETCH_USER_POSTS, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getUserFavorites = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchUserFavorites(userId);
    dispatch({ type: FETCH_USER_FAVORITES, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const createPost = (formData, history) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      dispatch({ type: PROGRESS });

      const { data } = await api.createPost(formData);
      dispatch({ type: PROGRESS_END });

      if (Number(state.posts.currentPage) === 1) {
        dispatch({ type: CREATE, payload: data.sendPost });
        if (history) history.replace();
      }
      dispatch({ type: CREATE_POST_AUTH, payload: data.sendPost });
      dispatch({ type: SET_FEEDBACK, payload: data.message });
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch({ type: ERROR, payload: "伺服器異常" });
        return;
      } else if (error.response.data.message === "請重新登入") {
        dispatch(logout());
      }
      dispatch({ type: ERROR, payload: error.response.data.message });
    }
  };
};

export const updatePost = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROGRESS });
      const { data } = await api.updatePost(id, formData);
      dispatch({ type: PROGRESS_END });
      dispatch({
        type: UPDATE,
        payload: { id, post: formData, imagePath: data.imagePath },
      });
      dispatch({
        type: UPDATE_POST_AUTH,
        payload: { id, post: formData, imagePath: data.imagePath },
      });
      dispatch({ type: SET_FEEDBACK, payload: data.message });
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch({ type: ERROR, payload: "伺服器異常" });
        return;
      } else if (error.response.data.message === "請重新登入") {
        dispatch(logout());
      }
      dispatch({ type: ERROR, payload: error.response.data.message });
    }
  };
};

export const deletePost = (id, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROGRESS });
      const { data } = await api.deletePost(id);
      dispatch({ type: PROGRESS_END });
      dispatch({ type: DELETE, payload: id });
      dispatch({ type: DELETE_POST_AUTH, payload: id });
      if (history) history.replace();
      dispatch({ type: SET_FEEDBACK, payload: data.message });
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch({ type: ERROR, payload: "伺服器異常" });
        return;
      } else if (error.response.data.message === "請重新登入") {
        dispatch(logout());
      }
      dispatch({ type: ERROR, payload: error.response.data.message });
    }
  };
};

export const likePost = (id) => {
  return async (dispatch) => {
    try {
      await api.likePost(id);
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch({ type: ERROR, payload: "伺服器異常" });
        return;
      } else if (error.response.data.message === "請重新登入") {
        dispatch(logout());
      }
      dispatch({ type: ERROR, payload: error.response.data.message });
    }
  };
};

export const unLikePost = (id) => {
  return async (dispatch) => {
    try {
      await api.unLikePost(id);
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch({ type: ERROR, payload: "伺服器異常" });
        return;
      } else if (error.response.data.message === "請重新登入") {
        dispatch(logout());
      }
      dispatch({ type: ERROR, payload: error.response.data.message });
    }
  };
};

export const commentPost = (comment, postId) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(comment, postId);
    dispatch({ type: COMMENT_POST, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    } else if (error.response.data.message === "請重新登入") {
      dispatch(logout());
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    await api.deleteComment(commentId, postId);
    dispatch({ type: DELETE_COMMENT, payload: commentId });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    } else if (error.response.data.message === "請重新登入") {
      dispatch(logout());
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};
