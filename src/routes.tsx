import { AuthGuard } from 'components/AuthGuard';
import { GuestGuard } from 'components/GuestGuard';
import { LoadingScreen } from 'components/LoadingScreen';
import { DashboardLayout } from 'layouts/DashboardLayout';
import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

type Routes = Array<{
  exact?: boolean;
  path?: string | string[];
  guard?: any;
  layout?: any;
  component?: any;
  routes?: Routes;
}>;

export const renderRoutes = (routes: Routes = []): React.ReactNode => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

export const routes: Routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(async () =>
      import('views/auth/LoginView').then((m) => ({
        default: m.LoginView,
      }))
    ),
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(async () =>
      import('views/auth/RegisterView').then((m) => ({
        default: m.RegisterView,
      }))
    ),
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/employees',
        component: lazy(async () =>
          import('views/employee/EmployeeView').then((m) => ({
            default: m.EmployeeView,
          }))
        ),
      },
      {
        exact: true,
        path: '/app/clients',
        component: lazy(async () =>
          import('views/client/ClientView').then((m) => ({
            default: m.ClientView,
          }))
        ),
      },
      {
        exact: true,
        path: '/app/orders',
        component: lazy(async () =>
          import('views/order/OrderView').then((m) => ({
            default: m.OrderView,
          }))
        ),
      },
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/employees" />,
      },
      {
        component: () => <Redirect to="/app" />,
      },
    ],
  },
  {
    path: '*',
    component: () => <Redirect to="/app" />,
  },
];
