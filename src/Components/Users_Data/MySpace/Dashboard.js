import React from 'react';
import { User, Package, MapPin } from "lucide-react";
import './Dashboard.css';
import Nav from '../../Navbar/Nav';
import Footer from '../../Footer/Footer';

const Dashboard = () => {
  return (
    <React.Fragment>
        <Nav/>
    <div className="dashboard-container">
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="welcome-title">
            Welcome, Shivam Kataria
          </h1>
          <button className="logout-button">
            Log Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Account Details Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">
                <div className="title-content">
                  <User className="card-icon" />
                  Account Details
                </div>
              </h2>
            </div>
            <div className="card-content">
              <div className="details-container">
                <div className="detail-item">
                  <User className="detail-icon" />
                  <span className="detail-text">Shivam Kataria</span>
                </div>
                <div className="detail-item">
                  <MapPin className="detail-icon" />
                  <span className="detail-text">India</span>
                </div>
                <button className="address-button">
                  View Addresses (1)
                </button>
              </div>
            </div>
          </div>

          {/* Order History Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">
                <div className="title-content">
                  <Package className="card-icon" />
                  Order History
                </div>
              </h2>
            </div>
            <div className="card-content">
              <div className="empty-orders">
                You haven't placed any orders yet.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </React.Fragment>
  );
};

export default Dashboard;