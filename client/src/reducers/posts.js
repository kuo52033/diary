import {
  FETCH_ALL,
  FETCH_ALL_BY_SEARCH,
  CREATE,
  UPDATE,
  SET_FORMDATA,
  CLEAN_FORMDATA,
  CLEAN_POST,
  OPEN_EDIT_POST,
  CLOSE_EDIT_POST,
  FETCH_ONE,
  COMMENT_POST,
  DELETE_COMMENT,
  FETCH_PAGINATE,
  CLEAN_POSTS,
  DELETE,
} from "../constants/actionTypes";

const initialState = {
  posts: null,
  post: null,
  editPost: {
    post: null,
    openEditPost: false,
    formPostData: {
      title: "",
      message: "",
      tags: [],
      selectfile: [],
      sendFile: [],
    },
  },
  totalPages: 0,
  currentPage: 0,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: [...action.payload.data],
        currentPage: action.payload.page,
      };
    case FETCH_PAGINATE:
      return {
        ...state,
        totalPages: action.payload.totalPages,
      };
    case FETCH_ALL_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_ONE:
      return { ...state, post: action.payload };
    case CREATE:
      const newposts = state.posts.slice();
      newposts.unshift(action.payload);
      if (newposts.length > 12) newposts.pop();
      return { ...state, posts: newposts };
    case UPDATE:
      return {
        ...state,
        post: state.post
          ? {
              ...state.post,
              ...action.payload,
              comments: [...state.post.comments],
            }
          : null,
        posts: state.posts
          ? state.posts.map((post) =>
              action.payload._id === post._id ? action.payload : post
            )
          : null,
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts
          ? state.posts.filter(({ _id }) => _id !== action.payload)
          : null,
      };
    case SET_FORMDATA:
      return {
        ...state,
        editPost: { ...state.editPost, formPostData: { ...action.payload } },
      };
    case CLEAN_FORMDATA:
      return {
        ...state,
        editPost: {
          ...state.editPost,
          formPostData: { ...initialState.editPost.formPostData },
        },
      };
    case CLEAN_POST:
      return { ...state, post: null };
    case CLEAN_POSTS:
      return { ...state, posts: null, totalPages: 0, currentPage: 0 };
    case OPEN_EDIT_POST:
      return {
        ...state,
        editPost: {
          ...state.editPost,
          post: action.payload,
          openEditPost: true,
        },
      };
    case CLOSE_EDIT_POST:
      return {
        ...state,
        editPost: {
          ...state.editPost,
          post: null,
          openEditPost: false,
        },
      };
    case COMMENT_POST:
      return {
        ...state,
        post: state.post
          ? {
              ...state.post,
              comments: [action.payload, ...state.post.comments],
            }
          : null,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: state.post
          ? {
              ...state.post,
              comments: state.post.comments.filter(
                ({ _id }) => _id !== action.payload
              ),
            }
          : null,
      };
    default:
      return state;
  }
};

export default posts;
