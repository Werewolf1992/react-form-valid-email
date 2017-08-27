import React from 'react';
import DashboardNavBar from './DashboardNavBar';
import DashboardFooter from './DashboardFooter';
import DashboardContent from './DashboardContent';

const Dashboard = () => (
    <div>
        <DashboardNavBar/>
        <DashboardContent/>
        <DashboardFooter/>
    </div>
);

Dashboard.propTypes = {};

export default  Dashboard;
