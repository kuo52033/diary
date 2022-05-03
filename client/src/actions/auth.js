import * as api from "../api/index";
import {
  AUTH,
  ERROR,
  SET_FEEDBACK,
  USER_PROFILE,
  UPDATE_USER_AVATAR,
  UPDATE_USER_PROFILE,
  LOGOUT,
  USER_POSTLENGTH,
} from "../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, payload: data.result });
    dispatch({ type: SET_FEEDBACK, payload: data.message });

    navigate("/posts");
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data.result });
    dispatch({ type: SET_FEEDBACK, payload: data.message });

    navigate("/posts");
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    dispatch({ type: LOGOUT });
    dispatch({ type: SET_FEEDBACK, payload: data.message });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const changePassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(formData);
    dispatch({ type: SET_FEEDBACK, payload: data.message });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getUserProfile = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getUserProfile(userId);
    dispatch({ type: USER_PROFILE, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const getUserPostLength = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getUserPostLength(userId);
    dispatch({ type: USER_POSTLENGTH, payload: data });
  } catch (error) {
    if (error.message === "Network Error") {
      dispatch({ type: ERROR, payload: "伺服器異常" });
      return;
    }
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const updateUserAvatar = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUserAvatar(formData);

    dispatch({ type: UPDATE_USER_AVATAR, payload: data.avatarurl });
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

export const updateUserProfile = (updateData, type) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE, payload: { updateData, type } });
    const { data } = await api.updateUserProfile(updateData, type);
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

export const favoritePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.favoritePost(postId);
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

export const unFavoritePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.unFavoritePost(postId);
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
