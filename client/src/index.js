import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider } from "@material-ui/styles";

import "./index.css";
import App from "./App";
import theme from "./customTheme/theme";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
