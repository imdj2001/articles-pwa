import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "bootstrap/dist/css/bootstrap.css";
import './articles.css'
const useStyles = makeStyles({
    root: {
      maxWidth: 700,
    },
    media: {
      height: 200,
    },
  });
function Articles() {
  const classes = useStyles();
  const [lang, setLang] = useState('en');
  const [articles, setArticles] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=${lang}&token=77d12af901964fc19eef448177e3abed`
    );
    setArticles(response.data.articles);
  };
  useEffect(() => {
    fetchData();
  }, [lang]);

  const language = (props) => {
    setLang(props);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ARTICLES-PWA</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => language("en")}>English</Nav.Link>
            <Nav.Link onClick={() => language("hi")}>हिन्दी</Nav.Link>
            <Nav.Link onClick={() => language("te")}>తెలుగు</Nav.Link>
            <Nav.Link onClick={() => language("ta")}>தமிழ்</Nav.Link>
            <Nav.Link onClick={() => language("mr")}>मराठी</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container">
        <div style={{height:"20px"}}></div>
        {articles.length &&
          articles.map((art) => {
               console.log(art)
            return (
              <div className="d-flex justify-content-center"> 
                <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={art.image ? art.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/1200px-Google_News_icon.svg.png"}
          title="news"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
             {art.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {art.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button size="small" color="primary" href={art.url}>
          Learn More
        </Button>
      </CardActions>
    </Card>
    <div style={{height:"15px"}}></div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Articles;
