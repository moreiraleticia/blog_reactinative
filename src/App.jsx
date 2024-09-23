import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Posts from "./pages/Posts/posts";
import Post from "./pages/Post/post";
import NotFound from "./pages/NotFound/notfound";
import Layout from "./components/Layout/layout";
import Contact from "./pages/Contact/contact";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Navigate to="/Layout/layout" />} />
            <Route path="/Layout/layout" element={<Layout />}>
              <Route path="Posts/posts" element={<Posts />} />
              <Route path="Post/post" element={<Post />} />
              <Route path="Contact/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
