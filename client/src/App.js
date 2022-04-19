import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Box, Dialog } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import Auth from "./components/Auth/Auth";
import UserProfile from "./components/UserProfile/UserProfile";
import Feedback from "./components/Feedback/Feedback";
import Form from "./components/Form/Form";
import Chat from "./components/Chat/Chat";
import { CLOSE_EDIT_POST } from "./constants/actionTypes";

const App = () => {
  const dispatch = useDispatch();
  const { openEditPost } = useSelector((state) => state.posts.editPost);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Feedback />

      <Dialog
        open={openEditPost}
        onClose={() => dispatch({ type: CLOSE_EDIT_POST })}
        maxWidth="sm"
        fullWidth
      >
        <Form />
      </Dialog>

      <Box sx={{ display: "flex" }}>
        <Navbar />

        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/user/:userId" component={UserProfile} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/posts/:postId" exact component={PostDetail} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Box>
    </Router>
  );
};

export default App;
