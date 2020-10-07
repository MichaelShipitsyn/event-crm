import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoadingScreen } from 'components/LoadingScreen';
import { AuthGuard } from 'components/AuthGuard';

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
    path: '/',
    component: lazy(() =>
      import('views/auth/LoginView').then((m) => ({
        default: m.LoginView
      }))
    )
  },
  {
    path: '/app',
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: '/app/employee',
        component: lazy(() =>
          import('views/employee/EmployeeView').then((m) => ({
            default: m.EmployeeView
          }))
        )
      }
    ]
  }
];

export default routes;
