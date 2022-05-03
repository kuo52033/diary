import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import useSocket from "./hook/useSocket";
import MyPosts from "./components/UserProfile/UserProfileInner/MyPosts/MyPosts";

const App = () => {
  const dispatch = useDispatch();
  const { openEditPost } = useSelector((state) => state.posts.editPost);
  const mySocket = useSocket();

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

        <Routes>
          <Route index element={<Navigate to="/posts" />} />
          <Route path="posts" element={<Home />} />
          <Route path="posts/search" element={<Home />} />
          <Route path="user/:userId" element={<UserProfile />}>
            <Route index element={<MyPosts />} />
            <Route path="favorite" element={<MyPosts />} />
          </Route>
          <Route path="auth" element={<Auth />} />
          <Route path="posts/:postId" element={<PostDetail />} />
          <Route path="chat" element={<Chat mySocket={mySocket} />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
