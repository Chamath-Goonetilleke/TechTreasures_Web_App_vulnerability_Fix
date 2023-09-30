import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/UserManagement/loginPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import AdminPage from "./components/UserManagement/AdminPanel/AdminPage";
import HomePage from "./components/Home/HomePage";
import Item from "./components/Item/Item";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/payment";

import ProfilePage from "./components/UserManagement/Profile/ProfilePage";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </React.Fragment>
    );
  }
}
