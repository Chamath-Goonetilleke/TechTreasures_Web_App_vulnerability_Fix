import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  getAllOrders,
} from "../../../services/orderService";
import Button from "@mui/material/Button";
import OrderDetailsModal from "./OrderDialogBox";

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

export default class HistoryPage extends Component {
  state = {
    orders: [],
    rows: [],
    isModalOpen: false,
    selectedOrder: null,
  };

  componentDidMount = async () => {
    await getAllOrders()
      .then(({ data }) => {
        this.setState({ orders: data });
        this.createRow(data);
      })
      .catch((err) => console.log(err));
  };

  createRow = (orders) => {
    let rows = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (order.isComplete) {
        rows.push({
          orderId: order.id,
          customer: order.customerId,
          order_details: order.orderedItem.length,
          total: order.totalAmount,
          order_date: order.orderedDate,
          status: order.isComplete ? "Completed" : "Pending",
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

  

  render() {
    console.log(this.state.orders);
    console.log(this.state.rows);
    return (
      this.state.orders.length !== 0 && (
        <div style={{ margin: "2rem" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Order ID</StyledTableCell>
                  <StyledTableCell align="center">Customer ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Order Details
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Total Amount (LKR)
                  </StyledTableCell>
                  <StyledTableCell align="center">Ordered Date</StyledTableCell>
                  <StyledTableCell align="center">Order Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.orderId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.customer}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.order_details}{" "}
                      {row.order_details <= 1 ? "Item" : "Items"} Ordered
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => this.openModal(this.state.orders[index])}
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
      )
    );
  }
}
