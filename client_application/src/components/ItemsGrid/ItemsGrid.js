import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import SingleItem from "./SingleItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./itemGrid.css";
import { useNavigate } from "react-router-dom";
import { getAllItems } from "../../services/itemService";
// const data = [
//   {
//     id: 0,
//     name: "testt estte sttest",
//     price: "test",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 1,
//     name: "test",
//     price: "test",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 2,
//     name: "test",
//     price: "test",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 3,
//     name: "test",
//     price: "test",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 4,
//     name: "test",
//     price: "test",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 5,
//     name: "test",
//     price: "test",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
// ];

const Items = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(()=>{
    function loadAllItems(){
      getAllItems().then(({ data }) => {
        setData(data)
      });
    }
    loadAllItems()
  },[]);
  return (
    <div>
      <div className="gridStyling">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Array.from(data).map((item1, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                {/* <SingleItem item1={item1}/> */}
                <Card className="cardStyling">
                  <CardMedia
                    sx={{ height: 150 }}
                    image={item1.imageUrls[0]}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item1.name}
                    </Typography>
                  </CardContent>
                  <p className="singleItemStylingPrice">Rs. {item1.price}</p>
                  <div className="viewMoreBtn">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/item/${item1.id}`)}
                    >
                      View more
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Items;
