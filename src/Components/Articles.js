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
import "./articles.css";
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
  const [lang, setLang] = useState("en");
  const [articles, setArticles] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=${lang}&token=05cda80d88a76ff542f03a539e7fc4ee`
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
      <Navbar
        bg="dark"
        variant="dark"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Navbar.Brand href="#home">ARTICLES-PWA</Navbar.Brand>
        <NavDropdown title="Languages" className="drpdwn">
          <NavDropdown.Item onClick={() => language("en")}>
            English
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => language("hi")}>
            हिन्दी
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => language("te")}>
            తెలుగు
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => language("ta")}>
            தமிழ்
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => language("mr")}>
            मराठी
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      <div className="container__art">
        <div style={{ height: "20px" }}></div>
        {articles.length &&
          articles.map((art) => {
            console.log(art);
            return (
              <div className="d-flex justify-content-center">
               <Card className={classes.root}>
               <a href="https://play.google.com/store/apps/details?id=com.whatsapp" >
               <img  className="click__here" href="https://play.google.com/store/apps/details?id=com.whatsapp" src="https://media0.giphy.com/media/2ZWntY8HkszU45sUJC/giphy.gif"/>
               </a>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={
                        art.image
                          ? art.image
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/1200px-Google_News_icon.svg.png"
                      }
                      title="news"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {art.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {art.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                        <Button size="small" style={{height:"10px"}} href="https://play.google.com/store/apps/details?id=com.whatsapp" >
                            <img style={{height:"10%"}}src="https://www.animatedimages.org/data/media/1096/animated-click-here-sign-and-button-image-0009.gif"/>
                        </Button>
                    <Button size="small" color="primary" href={art.url}>
                      Go for Full News
                    </Button>
                  </CardActions>
                 <a href="https://play.google.com/store/apps/details?id=com.whatsapp" >
                 <img className="click__here" src="http://cdn.lowgif.com/full/441bb54b885f7a06-click-here-icon-bethel-bible-college-guntur.gif" />
                   </a> 
                  
 
                </Card>
               
                
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Articles;
