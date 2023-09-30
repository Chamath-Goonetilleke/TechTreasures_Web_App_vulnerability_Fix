import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { getAllOrders } from "../../../services/orderService";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OrderDetailsModal from "../AdminPanel/OrderDialogBox";
import { getUserById, updateUser } from "../../../services/userService";
import SnackbarComponent from "../../common/SnackbarComponent";
import Alert from "@mui/material/Alert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default class ProfilePage extends Component {
  state = {
    EditDisabled: true,
    user: {},
    orders: [],
    rows: [],
    isModalOpen: false,
    selectedOrder: null,
    snackOpen: false,
    snackMessage: "",
  };
  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
    await getAllOrders()
      .then(({ data }) => {
        this.setState({ orders: data });
        this.createRow(data);
      })
      .catch((err) => console.log(err));
  };

  handleCancel = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
    this.setState({ EditDisabled: !this.state.EditDisabled });
  };

  createRow = (orders) => {
    let rows = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order.customerId === this.state.user.id) {
        rows.push({
          orderId: order.id,
          order_details: order.orderedItem.length,
          total: order.totalAmount,
          order_date: order.orderedDate,
          status: order.isComplete ? "Order Completed" : "Pending",
        });
      }
    }
    this.setState({ rows: rows });
  };

  openModal = (order) => {
    this.setState({ isModalOpen: true, selectedOrder: order });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, selectedOrder: null });
  };

  handleChange = (e) => {
    let user = this.state.user;
    const name = e.target.name;
    const value = e.target.value;

    user[name] = value;
    this.setState({ user: user });
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  openSnackbar = (message) => {
    this.setState({ snackMessage: message });
    this.setState({ snackOpen: true });
  };

  onSubmit = async () => {
    const user = this.state.user;
    const newUser = {
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
    };
    await updateUser(newUser)
      .then(async () => {
        await getUserById(user.id).then(({ data }) => {
          const jsonString = JSON.stringify(data);
          window.localStorage.setItem("user", jsonString);
          const updatedUser = JSON.parse(localStorage.getItem("user"));
          this.setState({ user: updatedUser });

          this.openSnackbar(
            <Alert severity="success">Updated Successfully</Alert>
          );
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div style={{ backgroundColor: "#ebebeb" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "1rem",
            height: "83vh",
          }}
        >
          <div
            className="userInfo"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              className="profileImage"
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "15px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
                backgroundColor: "white",
              }}
            >
              <Avatar
                alt=""
                src="/static/images/avatar/2.jpg"
                sx={{ width: 200, height: 200 }}
              />
              <br />
              <div style={{ fontSize: 24, fontWeight: "600" }}>
                {this.state.user.name}
              </div>
              <div>{this.state.user.email}</div>
            </div>
            <div
              className="userData"
              style={{
                flex: 1,
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <form>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    disabled={!this.state.EditDisabled}
                    startIcon={<EditIcon />}
                    onClick={() =>
                      this.setState({ EditDisabled: !this.state.EditDisabled })
                    }
                  >
                    Edit
                  </Button>
                </div>
                <br />
                <TextField
                  id="outlined-required"
                  label="Name"
                  sx={{ width: "100%" }}
                  disabled={this.state.EditDisabled}
                  value={this.state.user.name}
                  name="name"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <br />
                <TextField
                  id="outlined-required"
                  label="Phone Number"
                  sx={{ width: "100%" }}
                  disabled={this.state.EditDisabled}
                  value={this.state.user.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <br />
                <TextField
                  id="outlined-required"
                  label="Address"
                  sx={{ width: "100%" }}
                  disabled={this.state.EditDisabled}
                  value={this.state.user.address}
                  name="address"
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "6rem",
                    marginRight: "6rem",
                  }}
                >
                  <Button
                    variant="contained"
                    disabled={this.state.EditDisabled}
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disabled={this.state.EditDisabled}
                    onClick={() => this.onSubmit()}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div
            className="orders"
            style={{
              flex: 2,
              marginLeft: "1rem",
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <center>
              <h2>My Orders</h2>
            </center>
            {this.state.orders.length !== 0 && (
              <div style={{ margin: "2rem" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          Order ID
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Order Details
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Total Amount (LKR)
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Ordered Date
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Order Status
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.rows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {row.orderId}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.order_details}{" "}
                            {row.order_details <= 1 ? "Item" : "Items"} Ordered
                            <Button
                              variant="outlined"
                              size="small"
                              style={{ marginLeft: "1rem" }}
                              onClick={() =>
                                this.openModal(this.state.orders[index])
                              }
                            >
                              View
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.total}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.order_date}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.status}{" "}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {this.state.isModalOpen && (
                  <OrderDetailsModal
                    order={this.state.selectedOrder}
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <SnackbarComponent
          open={this.state.snackOpen}
          handleClose={this.handleSnackClose}
          message={this.state.snackMessage}
        />
      </div>
    );
  }
}
