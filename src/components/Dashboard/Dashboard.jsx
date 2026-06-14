import React, { useEffect } from "react";
import "./Dashboard.css";
import {
  getMachineHeaders,
  getDashboardStatistics,
} from "../../redux/Dashboard slices/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import DashboardSkeleton from "./DashboardSkeleton.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    loading,
    machineDropdownOptions,
    dashboardStatistics,
    status,
    message,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getMachineHeaders());
    dispatch(getDashboardStatistics());
  }, [dispatch]);
  useEffect(() => {
    console.log("Machine Dropdown Options");
    console.log(machineDropdownOptions);
  }, [machineDropdownOptions]);
  if (loading) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="dashboard-page">
      <div className="choose-from-drop-down">
        <div className="dropdown-wrapper">
          <label htmlFor="paymentType">Payment Type</label>

          <select id="paymentType">
            <option value="cima-machie">cima-machine</option>
            <option value="card-connect">card-connect</option>
            <option value="square-pos">square-pos</option>
          </select>
        </div>
      </div>

      <div className="dashboard-row-1">
        <div className="card">
          <h3 className="card-title">Latest Six Weeks Report</h3>
        </div>

        <div className="card">
          <h3 className="card-title">Summary</h3>
        </div>
      </div>

      <div className="dashboard-row-2">
        <div className="card">
          <h3 className="card-title">Statistics</h3>
        </div>

        <div className="card">
          <h3 className="card-title">Top 5 Machines</h3>
        </div>

        <div className="card">
          <h3 className="card-title">Denominations</h3>
        </div>
      </div>

      <div className="dashboard-row-3">
        <div className="card">
          <h3 className="card-title">Latest Transactions</h3>
        </div>

        <div className="card">
          <h3 className="card-title">Top 5 Users</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
