import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import SnackbarComponent from "../../common/SnackbarComponent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default class UpdateItemDialogs extends React.Component {
  state = {
    itemName: "",
    price: 0,
    quantity: 0,
    description: "",
    imageFiles: [],
    imagePreviews: [],
    snackOpen: false,
    snackMessage: "",
    props: this.props,
    selectedItem: this.props.selectedItem,
  };

  //   componentDidMount() {
  //     this.setState({selectedItem: this.props.selectedItem});
  //    }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    let selectedItem = this.props.selectedItem;
    selectedItem[name] = value;
    this.setState({ selectedItem: selectedItem });
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
    // await createItem(newItem)
    //   .then(() => {
    //     this.openSnackbar(<Alert severity="success">Added Successfully</Alert>);
    //     this.setState({
    //       itemName: "",
    //       price: "",
    //       quantity: "",
    //       description: "",
    //       imageFiles: [],
    //       imagePreviews: [],
    //     });
    //   })
    //   .catch((err) => console.log(err));
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  openSnackbar = (message) => {
    this.setState({ snackMessage: message });
    this.setState({ snackOpen: true });
  };

  render() {
    const item = this.props.selectedItem;
    return (
      <div>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Update Item
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={this.props.onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div
              style={{
                border: "1px solid black",
                padding: "2rem",
                width: "100%",
              }}
            >
              <form>
                <div
                  style={{
                    overflow: "auto",

                    marginBottom: "1rem",
                  }}
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
                      value={item.name}
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
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
              </form>
            </div>
            <SnackbarComponent
              open={this.state.snackOpen}
              handleClose={this.handleSnackClose}
              message={this.state.snackMessage}
            />
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.onClose}
            >
              Save Changes
            </button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }
}
