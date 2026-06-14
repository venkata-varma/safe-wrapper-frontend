import { useState } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
let Loginscreen = lazy(() => import("./pages/Loginscreen/Loginscreen"));
let Homepage = lazy(() => import("./pages/Home/Homepage"));
let Transactionspage = lazy(
  () => import("./components/Transactions/Transactionspage"),
);

let Dashboard=lazy(()=>import("./components/Dashboard/Dashboard"))
let Chatwholepage=lazy(()=>import("./pages/Chatwindow/Chatwholepage"))
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Loginscreen />}></Route>
          <Route
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/transactions" element={<Transactionspage />}></Route>
            <Route path="/chat" element={<Chatwholepage />}></Route>
            
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
