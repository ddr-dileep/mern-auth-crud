import React, { useEffect } from 'react'
import { isAuthenticated } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticatedUser = isAuthenticated();

  useEffect(() => {
    if (!isAuthenticatedUser) {
      navigate("/login");
    }
  }, []);

  return <div>this is dashboard</div>;
}

export default Dashboard;
