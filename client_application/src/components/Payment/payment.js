import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "./payment.css";
import { getCartByUserId } from "../../services/CartService";
import { createOrder } from "../../services/orderService";
import { createPayment } from "../../services/paymentService";

// const data = [
//   {
//     id: 0,
//     name: "testt estte sttest",
//     price: "20",
//     description:
//       "test test test test test test test test test test test test  test test test test test test test test ",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 1,
//     name: "test",
//     price: "10",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
//   {
//     id: 2,
//     name: "test",
//     price: "10",
//     description: "test",
//     quantity: 0,
//     imageUrls: [
//       "https://raw.githubusercontent.com/adrianhajdin/ecommerce_sanity_stripe/main/public/assets/earphones_a_1.webp",
//     ],
//   },
// ];
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const Payment = () => {
  const [totalCount, setToalCount] = useState(0);
  const [totalQuantity, setToalQuantity] = useState(0);
  const [dataEmail, setToalEmail] = useState("");
  const [dataCardNo, setToalCardNo] = useState("");
  const [dataExpireDte, setToalExpireDte] = useState("");
  const [dataCvc, setToalCvc] = useState("");
  const [dataCardName, setToalCardName] = useState("");
  const [dataAddress1, setToalAddress1] = useState("");
  const [dataAddress2, setToalAddress2] = useState("");
  const [dataState, setToalState] = useState("");
  const [dataCity, setToalCity] = useState("");
  const [dataPin, setToalPin] = useState("");
  const [dataCountry, setToalCountry] = useState("");
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([])

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  useEffect(() => {
    function loadAllItems() {
      getCartByUserId(id).then(({ data }) => {
        setData(data);
        let total = 0;
        let count = 0;
        let itemArray = []
        for (let index = 0; index < data.length; index++) {
          total = total + parseInt(data[index].price);
          const ids = data[index].id
          let string_id = ids.toString();
          itemArray.push(string_id)
          count++;
        }
        setItemData(itemArray)
        setToalCount(total);
        setToalQuantity(count);
      });
      // totalCalculate();
    }
    loadAllItems();
    
  }, []);
// jhfff
  const totalCalculate = () => {
    let total = 0;
    let count = 0;
    let itemArray = []
    for (let index = 0; index < data.length; index++) {
      total = total + parseInt(data[index].price);
      const ids = data[index].id
      let string_id = ids.toString();
      itemArray.push(string_id)
      count++;
    }
    setItemData(itemArray)
    setToalCount(total);
    setToalQuantity(count);
  };
  async function createPayments() {
    // e.stopPropagation();
    // e.preventDefault()
    // if (e && e.preventDefault) { e.preventDefault(); }
    createOrders();
    const data = {
      id: 0,
      userId: 1,
      cardNo: dataCardNo,
      holderName: dataCardName,
      expireDate: dataExpireDte,
      cvc: dataCvc,
      email: dataEmail,
      address1: dataAddress1,
      address2: dataAddress2,
      country: dataCountry,
      city: dataCity,
      pin: dataPin,
      state: dataState
    };
    console.log("_________",data);
    await createPayment(data)
    .then(() => {
      alert("Payment Added");
    })
    .catch((err) => console.log(err));
  };
  async function createOrders(){
    // e.preventDefault();
    // e.stopPropagation();
    // if (e && e.preventDefault) { e.preventDefault(); }
    // e.preventDefault()
    const date = new Date();
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    const data = {
      customerId: 1,
      orderedItems: itemData,
      totalAmount: totalCount,
      orderedDate: currentDate,
      isComplete: false
    }
    await createOrder(data)
    .then(() => {
      alert("Order Added");
    })
    .catch((err) => console.log(err));
  }
  return (
    <div>
      <div>
        <table className="tablecart">
          <tr>
            <td className="cartColumn2">
              <div>
                {Array.from(data).map((item, index) => (
                  <Paper
                    sx={{
                      p: 2,
                      margin: "auto",
                      maxWidth: 500,
                      flexGrow: 1,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                    className="cartItemCardStyling"
                  >
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                          <Img alt="complex" src={item.imageUrls[0]} />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="subtitle1"
                              component="div"
                            >
                              {item.description.slice(0, 80)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              sx={{ cursor: "pointer" }}
                              variant="body2"
                            >
                              Remove
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            className="pricePaymentSrtyling"
                          >
                            Rs. {item.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </div>
              <div className="totalPaymentTextStyling">
                <Stack spacing={2} direction="row">
                  <Stack direction="column">
                    <h5>Total Item Count</h5>
                  </Stack>
                  <Stack direction="column">
                    <h5 className="priceQuantityStylings">{totalQuantity}</h5>
                  </Stack>
                </Stack>
                <Stack spacing={2} direction="row">
                  <Stack direction="column">
                    <h5>Total Amount</h5>
                  </Stack>
                  <Stack direction="column">
                    <h5 className="priceTotalStylings">Rs. {totalCount}</h5>
                  </Stack>
                </Stack>
              </div>
            </td>
            <td className="cartColumn1">
              <h3>Pay with Card</h3>
              <div>
                <TextField
                  label="Email"
                  id="outlined-size-small"
                  size="small"
                  className="textFieldStylingPayment"
                  onChange={(event) => setToalEmail(event.target.value)}
                  value={dataEmail}
                />
                <div>
                  <br />
                  <hr className="textFieldStylingPayment" />
                  <p>Card Information</p>
                  <TextField
                    label="Card No"
                    id="outlined-size-small"
                    size="small"
                    className="textFieldStylingPayment"
                    onChange={(event) => setToalCardNo(event.target.value)}
                    value={dataCardNo}
                  />
                  <br />
                  <br />
                  <Stack
                    spacing={2}
                    direction="row"
                    className="textFieldStylingPayment"
                  >
                    <TextField
                      label="Expire Date"
                      id="outlined-size-small"
                      size="small"
                      className="textField2StylingPayment"
                      onChange={(event) => setToalExpireDte(event.target.value)}
                      value={dataExpireDte}
                    />
                    <TextField
                      label="CVC"
                      id="outlined-size-small"
                      size="small"
                      className="textField2StylingPayment"
                      onChange={(event) => setToalCvc(event.target.value)}
                      value={dataCvc}
                    />
                  </Stack>
                  <br />
                  <br />
                  <hr className="textFieldStylingPayment" />
                  <p>Name on Card</p>
                  <TextField
                    label="Card Name"
                    id="outlined-size-small"
                    size="small"
                    className="textFieldStylingPayment"
                    onChange={(event) => setToalCardName(event.target.value)}
                    value={dataCardName}
                  />
                  <br />
                  <br />
                  <hr className="textFieldStylingPayment" />
                  <p>Name on Card</p>
                  <TextField
                    label="Country"
                    id="outlined-size-small"
                    size="small"
                    className="textFieldStylingPayment"
                    onChange={(event) => setToalCountry(event.target.value)}
                    value={dataCountry}
                  />
                  <br />
                  <br />
                  <TextField
                    label="Address line 1"
                    id="outlined-size-small"
                    size="small"
                    className="textFieldStylingPayment"
                    onChange={(event) => setToalAddress1(event.target.value)}
                    value={dataAddress1}
                  />
                  <br />
                  <br />
                  <TextField
                    label="Address line 2"
                    id="outlined-size-small"
                    size="small"
                    className="textFieldStylingPayment"
                    onChange={(event) => setToalAddress2(event.target.value)}
                    value={dataAddress2}
                  />
                  <br />
                  <br />
                  <Stack
                    spacing={2}
                    direction="row"
                    className="textFieldStylingPayment"
                  >
                    <TextField
                      label="City"
                      id="outlined-size-small"
                      size="small"
                      className="textField2StylingPayment"
                      onChange={(event) => setToalCity(event.target.value)}
                      value={dataCity}
                    />
                    <TextField
                      label="PIN"
                      id="outlined-size-small"
                      size="small"
                      className="textField2StylingPayment"
                      onChange={(event) => setToalPin(event.target.value)}
                      value={dataPin}
                    />
                  </Stack>
                  <br />
                  <br />
                  <TextField
                    label="State"
                    id="outlined-size-small"
                    size="small"
                    className="textFieldStylingPayment"
                    onChange={(event) => setToalState(event.target.value)}
                    value={dataState}
                  />
                  <br />
                  <br />
                  <Button
                    variant="contained"
                    className="textFieldStylingPayment"
                    onClick={createPayments}
                  >
                    pay
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Payment;
