import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/loading.jsx";

const linkStyle = {
  fontSize: 16,
  fontWeight: 400,
  textDecoration: "none",
  color: "#FFFFFF",
};

export default function Posts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]); 

  const getPosts = async () => {
    try {
      const response = await fetch("https://api.slingacademy.com/v1/sample-data/blog-posts");
      const data = await response.json();
      setPosts(data); 
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts(); 
  }, []);

  const getViewPostRoute = (post) => `/${post.id}/${encodeURI(post.title)}`;

  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  return (
    <Grid container rowGap={2} direction={"column"}>
      <Grid item>
        <Typography variant="h4">Publicações</Typography>
      </Grid>

      {isLoading ? (
        <Loading /> 
      ) : (
        posts.map((post) => ( 
          <Grid item key={post.id}>
            <Link to={getViewPostRoute(post)} style={linkStyle}>
              <Typography align="left">{post.title}</Typography>
            </Link>
            <Typography align="left" variant="caption">
              {formatPostDate(post.createdAt)} { }
            </Typography>
          </Grid>
        ))
      )}
    </Grid>
  );
}
