import {
  AUTH,
  LOGOUT,
  USER_PROFILE,
  UPDATE_USER_AVATAR,
  FETCH_USER_POSTS,
  FETCH_USER_FAVORITES,
  UPDATE_USER_PROFILE,
  UPDATE_USERACTIVE,
  UPDATE_USERFAVORITES,
  CLEAN_USER_DATA,
  DELETE_POST_AUTH,
  CREATE_POST_AUTH,
  UPDATE_POST_AUTH,
  USER_POSTLENGTH,
} from "../constants/actionTypes";

const initialState = {
  myData: JSON.parse(localStorage.getItem("user")) || null,
  userProfile: null,
  userPostLength: null,
  userPosts: null,
  userFavorites: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...state, myData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, myData: null };
    case USER_PROFILE:
      return { ...state, userProfile: action?.payload };
    case USER_POSTLENGTH:
      return { ...state, userPostLength: action.payload };
    case UPDATE_USER_AVATAR:
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          avatar: action.payload,
        })
      );
      return { ...state, myData: { ...state.myData, avatar: action.payload } };
    case UPDATE_USER_PROFILE:
      if (action.payload.type === "name") {
        const user = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            name: action.payload.updateData,
          })
        );
      }
      return {
        ...state,
        myData:
          action.payload.type === "name"
            ? { ...state.myData, name: action.payload.updateData }
            : { ...state.myData },
        userProfile: {
          ...state.userProfile,
          [action.payload.type]: action.payload.updateData,
        },
      };
    case FETCH_USER_POSTS:
      return { ...state, userPosts: [...action.payload] };
    case FETCH_USER_FAVORITES:
      return { ...state, userFavorites: [...action.payload] };
    case UPDATE_USERFAVORITES:
      return {
        ...state,
        userFavorites: state.userFavorites
          ? state.myData._id === state.userProfile._id
            ? state.userFavorites?.filter(
                (favorites) => favorites._id !== action.payload
              )
            : state.userFavorites
          : null,
      };
    case UPDATE_USERACTIVE:
      return {
        ...state,
        userPosts: state.userPosts?.map((post) =>
          post._id === action.payload.id
            ? { ...post, [action.payload.type]: action.payload.update }
            : post
        ),
        userFavorites: state.userFavorites?.map((post) =>
          post._id === action.payload.id
            ? { ...post, [action.payload.type]: action.payload.update }
            : post
        ),
      };
    case CLEAN_USER_DATA:
      return {
        ...state,
        userProfile: null,
        userPostLength: null,
        userPosts: null,
        userFavorites: null,
      };
    case DELETE_POST_AUTH:
      return {
        ...state,
        userPosts: state.userPosts
          ? state.userPosts.filter(({ _id }) => _id !== action.payload)
          : null,
        userFavorites: state.userFavorites
          ? state.userFavorites.filter(({ _id }) => _id !== action.payload)
          : null,
      };
    case CREATE_POST_AUTH:
      return {
        ...state,
        userPosts: state.userPosts
          ? state.myData._id === state.userProfile._id
            ? [
                {
                  _id: action.payload._id,
                  comments: 0,
                  likesLength: 0,
                  selectfileFirst: action.payload.selectfile
                    ? action.payload.selectfile[0]
                    : null,
                },
                ...state.userPosts,
              ]
            : state.userPosts
          : null,
      };
    case UPDATE_POST_AUTH:
      return {
        ...state,
        userPosts: state.userPosts
          ? state.userPosts.map((post) =>
              post._id === action.payload.id
                ? {
                    ...post,
                    selectfileFirst: action.payload.imagePath
                      ? action.payload.imagePath[0]
                      : null,
                  }
                : post
            )
          : null,
        userFavorites: state.userFavorites
          ? state.userFavorites.map((post) =>
              post._id === action.payload.id
                ? {
                    ...post,
                    selectfileFirst: action.payload.imagePath
                      ? action.payload.imagePath[0]
                      : null,
                  }
                : post
            )
          : null,
      };
    default:
      return state;
  }
};

export default auth;
