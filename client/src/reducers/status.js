import {
  ERROR,
  FEEDBACK_CLEAN,
  ERROR_CLEAN,
  SET_FEEDBACK,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  PROGRESS,
  PROGRESS_END,
} from "../constants/actionTypes";

const initialState = {
  feedback: [],
  error: [],
  sidebar: false,
  progress: false,
};

const randomId = () => Math.floor(Math.random() * 10000) + 1;

const status = (state = initialState, action) => {
  switch (action.type) {
    case SET_FEEDBACK:
      return {
        ...state,
        feedback: [
          ...state.feedback,
          {
            id: randomId(),
            content: action.payload,
          },
        ],
      };
    case FEEDBACK_CLEAN:
      return {
        ...state,
        feedback: state.feedback.filter((f) => f.id !== action.payload),
      };
    case ERROR:
      return {
        ...state,
        error: [...state.error, { id: randomId(), content: action.payload }],
      };
    case ERROR_CLEAN:
      return {
        ...state,
        error: state.error.filter((error) => error.id !== action.payload),
      };
    default:
      return state;
    case OPEN_SIDEBAR:
      return { ...state, sidebar: true };
    case CLOSE_SIDEBAR:
      return { ...state, sidebar: false };
    case PROGRESS:
      return { ...state, progress: true };
    case PROGRESS_END:
      return { ...state, progress: false };
  }
};

export default status;
