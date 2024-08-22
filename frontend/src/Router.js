import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SearchResult from "./views/SearchResult";
import Admin from "./views/Admin";
import VehiculoDetalle from "./views/VehiculoDetalle";

const AppRouter = () => {
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" key="/" element={<SearchResult />} />
                <Route path="/admin" key="/admin" element={<Admin />} />
                <Route path="/vehiculo/:id" element={<VehiculoDetalle />} />
            </Routes>
        </>
    );
};

export default AppRouter;