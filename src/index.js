import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Admin from "views/admin/Admin";
import Register from "views/register/Register.js";
import Store from "views/store/Store.js";
import Product from "views/product/Product.js";
import New from "views/new/New.js";
import Login from "views/login/Login.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/loja" exact element={<Store />} />
      <Route path="/admin" exact element={<Admin />} />
      <Route path="/cadastrar" exact element={<Register />} />
      <Route path="/produto/:id" element={<Product />} />
      <Route path="/novo/:store_id" element={<New />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
