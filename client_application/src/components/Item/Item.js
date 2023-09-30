import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Item.css";
import Homebanner from "../../assets/assets/earphones_a_1.webp";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getItemById, getAllItems } from "../../services/itemService";
import { getCartByUserId, createCart } from "../../services/CartService";

const data2 = {
  id: 0,
  name: "testt estte sttest",
  price: "test",
  description: "test",
  quantity: 0,
  imageUrls: [
    "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
  ],
};
const Item = () => {
  const params = useParams();
  const id = params.id;
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.id;
  const navigate = useNavigate();
  const [data1, setData] = useState({});
  const [quantityCount, setQuantityCount] = useState(0);

  useEffect(() => {
    function loadAllItems() {
      getItemById(id).then(({ data }) => {
        console.log("first", data);
        setData(data);
        data1.imageUrls = data.imageUrls[0];
        console.log("first1", data1);
      });
    }
    loadAllItems();
  }, []);
  // kj
  const buyNow = () => {
    navigate("/cart");
  };

  async function addToCarts() {
    const data = {
      itemId: data1.id,
      userId: user_id,
      quantity: quantityCount,
    };
    await createCart(data)
      .then(() => {
        alert("Cart Added");
      })
      .catch((err) => console.log(err));
  }
  function increasePlus(){
    setQuantityCount(quantityCount+1)
  }
  function decreasePlus(){
    setQuantityCount(quantityCount-1)
  }

  return (
    <div className="bodyItemStyling">
      
      <div>
        <table className="itemTableStyling">
          <tr>
            <td className="column1Styling">
              <img
                src={data1.imageUrls}
                className="itemBannerStyling"
                alt="logo"
              />
            </td>
            <td className="column2Styling">
              <div>
                <h3>{data1.name}</h3>
              </div>
              <div>
                <h5>Details:</h5>
                <p>{data1.description}</p>
              </div>
              <div>
                <h5 className="priceStyling">Rs. {data1.price}</h5>
              </div>
              <div className="quantityChangedStyling">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete" onClick={decreasePlus}>
                    <RemoveCircleIcon />
                  </IconButton>
                  <div>
                  <p className="quantityChangedStylings">{quantityCount}</p>
                  </div>
                  <IconButton aria-label="delete" color="primary" onClick={increasePlus}>
                    <AddCircleIcon />
                  </IconButton>
                  
                </Stack>
              </div>
              <div className="btnGroupItem">
                <Stack spacing={2} direction="row">
                  <Button variant="contained" onClick={addToCarts}>
                    Add to cart
                  </Button>
                  <Button variant="outlined" onClick={buyNow}>
                    Buy now
                  </Button>
                </Stack>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Item;
