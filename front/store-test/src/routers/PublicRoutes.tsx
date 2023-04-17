import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import PublicLayout from '../components/Layouts/PublicLayout';

interface Props extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PublicRoutes = ({ component: Component, path, isAuthenticated }: Props) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const CustomComponent = (props: any) => {
    return <PublicLayout>
      <Component {...props} />
    </PublicLayout>
  }

  return <Route component={CustomComponent} path={path} />;
};

export default PublicRoutes;