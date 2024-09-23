import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import PostContent from "../../components/PostContent/postcontent.jsx";
import Loading from "../../components/Loading/loading.jsx";

const linkStyle = {
  fontSize: 16,
  fontWeight: 400,
  color: "#FFFFFF",
};

export default function Post() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [postCreator, setPostCreator] = useState(null);

  const getPost = async () => {
    try {
      const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`
      );
      const data = await response.json();
      setPost(data); 
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getPostCreator = async (userId) => {
    try {
      const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/users/${userId}`
      );
      const data = await response.json();
      setPostCreator(data); 
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getPost(); 
  }, [id]);

  useEffect(() => {
    if (post) {
      getPostCreator(post.user_id); 
    }
  }, [post]);

  const getCredids = (post, postCreator) =>
    `${postCreator.first_name} ${postCreator.last_name}, ${formatPostDate(post.created_at)}`;

  const formatPostDate = (date) => new Date(date).toLocaleDateString("pt-BR");

  return (
    <Grid container direction="column">
      <Grid item>
        <Link to="/" style={linkStyle}>
          <Typography>Voltar</Typography>
        </Link>
      </Grid>
      {isLoading ? (
        <Loading /> 
      ) : (
        <Grid item>
          <Typography variant="h3" mb={4}>
            {post.title} {}
          </Typography>
          <img width="100%" src={post.photo_url} alt={post.title} /> {}
          <PostContent content={post.content_html} /> {}
          <Typography>
            <strong>Criado por: </strong>
            {postCreator ? getCredids(post, postCreator) : "Carregando criador..."} {}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
