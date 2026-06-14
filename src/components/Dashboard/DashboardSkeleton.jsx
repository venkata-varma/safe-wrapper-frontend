import "./Dashboardskeleton.css";
import React from 'react'


const DashboardSkeleton = () => {
  return (
    <div className="dashboard-page">

      <div className="choose-from-drop-down skeleton-dropdown"></div>

      <div className="dashboard-row-1">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>

      <div className="dashboard-row-2">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>

      <div className="dashboard-row-3">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>

    </div>
  );
};

export default DashboardSkeleton;