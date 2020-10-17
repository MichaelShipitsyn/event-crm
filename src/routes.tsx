import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoadingScreen } from 'components/LoadingScreen';
import { AuthGuard } from 'components/AuthGuard';
import { GuestGuard } from 'components/GuestGuard';

type Routes = {
  exact?: boolean;
  path?: string | string[];
  guard?: any;
  layout?: any;
  component?: any;
  routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []): JSX.Element => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
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

const routes: Routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() =>
      import('views/auth/LoginView').then((m) => ({
        default: m.LoginView
      }))
    )
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() =>
      import('views/auth/RegisterView').then((m) => ({
        default: m.RegisterView
      }))
    )
  },
  {
    exact: true,
    guard: AuthGuard,
    path: '/',
    component: lazy(() =>
      import('views/employee/EmployeeView').then((m) => ({
        default: m.EmployeeView
      }))
    )
  },
  {
    path: '*',
    component: () => <Redirect to="/404" />
  }
];

export default routes;
