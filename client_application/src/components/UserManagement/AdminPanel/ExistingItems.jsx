import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../ItemsGrid/itemGrid.css";
import { useNavigate } from "react-router-dom";
import { deleteItem, getAllItems } from "../../../services/itemService";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateItemDialogs from "./UpdateItem";

const ExistingItems = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleClickOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    await getAllItems()
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => console.log(err));
  };

  const handleItemDelete = async (id) => {
    await deleteItem(id)
      .then(() => {
        alert("Successfully Deleted");
        window.location.reload()
      })
      .catch((err) => console.log(err));
  };
  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="gridStyling">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 5, sm: 8, md: 15 }}
          >
            {Array.from(items).map((item1, index) => (
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
                  <div
                    className="viewMoreBtn"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/item/${item1.id}`)}
                    >
                      View more
                    </Button>
                    <div>
                      <IconButton
                        aria-label="edit"
                        size="medium"
                        onClick={() => {
                          handleClickOpen(item1);
                        }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        size="medium"
                        onClick={() => {
                          handleItemDelete(item1.id);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <UpdateItemDialogs
        open={open}
        onClose={handleClose}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default ExistingItems;
