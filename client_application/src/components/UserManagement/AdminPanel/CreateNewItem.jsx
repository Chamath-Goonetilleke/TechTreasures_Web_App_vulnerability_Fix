import React, { Component } from "react";
import { createItem } from "../../../services/itemService";
import { Alert } from "@mui/material";
import SnackbarComponent from "../../common/SnackbarComponent";

export default class CreateNewItem extends Component {
  state = {
    itemName: "",
    price: 0,
    quantity: 0,
    description: "",
    imageFiles: [],
    imagePreviews: [],
    snackOpen: false,
    snackMessage: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleImageChange = (event) => {
    const imageFiles = event.target.files;

    if (imageFiles) {
      const readerArray = [];
      const previews = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const reader = new FileReader();
        const file = imageFiles[i];

        reader.onload = (e) => {
          previews.push(e.target.result);
          this.setState({
            imagePreviews: [...previews],
          });
        };

        readerArray.push(reader);
        reader.readAsDataURL(file);
      }

      this.setState({
        imageFiles: [...imageFiles],
      });
    }
  };

  handleAddItem = async () => {
    const newItem = {
      name: this.state.itemName,
      price: this.state.price,
      quantity: this.state.quantity,
      description: this.state.description,
      imageUrls: this.state.imagePreviews,
    };
    await createItem(newItem)
      .then(() => {
        this.openSnackbar(<Alert severity="success">Added Successfully</Alert>);
        this.setState({
          itemName: "",
          price: "",
          quantity: "",
          description: "",
          imageFiles: [],
          imagePreviews: [],
        });
      })
      .catch((err) => console.log(err));
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  openSnackbar = (message) => {
    this.setState({ snackMessage: message });
    this.setState({ snackOpen: true });
  };

  render() {
    const item = this.state;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "77.4vh",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            margin: "1rem",
            padding: "2rem",
            width: "50%",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <center>
              <h2>Add a New Item</h2>
            </center>
          </div>
          <form>
            <div
              style={{ overflow: "auto", height: "49vh", marginBottom: "1rem" }}
            >
              <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">
                  Upload Product Images
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  accept="image/*"
                  multiple
                  onChange={this.handleImageChange}
                />
              </div>

              {this.state.imagePreviews.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    overflow: "auto",
                  }}
                >
                  {this.state.imagePreviews.map((preview, index) => (
                    <div key={index} style={{ marginRight: "0.5rem" }}>
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Item Name
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Price
              </label>
              <div className="input-group mb-3">
                <br />
                <span className="input-group-text">LKR</span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Amount"
                  name="price"
                  value={item.price}
                  onChange={(e) => this.handleInputChange(e)}
                />
                <span className="input-group-text">.00</span>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="description"
                  value={item.description}
                  onChange={(e) => this.handleInputChange(e)}
                ></textarea>
              </div>
            </div>
            <center>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "40%",
                }}
              >
                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleAddItem}
                >
                  Add Item
                </button>
              </div>
            </center>
          </form>
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
