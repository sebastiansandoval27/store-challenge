import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import PrivateLayout from '../components/Layouts/PrivateLayout';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoutes = ({ component: Component, path, isAuthenticated }: Props) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const CustomComponent = (props: any) => {
    return <PrivateLayout>
      <Component {...props} />
    </PrivateLayout>
  }

  return <Route component={CustomComponent} path={path} />;
};

export default PrivateRoutes;