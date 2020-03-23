import React from 'react';
import { RouteSpec } from 'components/layout/RouteFrame/types';
import { groupBy } from 'lodash';
import { Route, Switch } from 'react-router';

export interface RouteFrameProps extends RouteFrameOptions {
  routes: RouteSpec[];
}

export interface RouteFrameOptions {
  ErrorBoundary?: React.FunctionComponent | React.ComponentClass;
  Spinner?: React.FunctionComponent<{ route: RouteSpec }> | React.ComponentClass<{ route: RouteSpec }, any>;
}

export function normalizeRoutes(routes: RouteSpec[]) {
  return routes;
}

export const RouteFrameContent: React.FC<RouteFrameProps> = (props) => {
  const { routes, ErrorBoundary = NoOp, Spinner = NoOp } = props;

  const opts = { ErrorBoundary, Spinner };
  const layouts = Array.from(new Set(routes.map((v) => v.layout))).filter((v) => v);

  if (layouts.length === 0) {
    return renderRoutes(routes, opts);
  }
  const groups = groupBy(routes, (v) => layouts.indexOf(v.layout));
  return (
    <Switch>
      {Object.entries(groups).map(([i, routes]) => (
        <Route key={i} path={routes.flatMap((v) => v.path)} exact={true}>
          {renderLayoutRoutes(routes, layouts[i], opts)}
        </Route>
      ))}
    </Switch>
  );
};

function NoOp(props: any) {
  return null;
}

function renderRoutes(routes, { Spinner = NoOp }: RouteFrameOptions) {
  return (
    <Switch>
      {routes.map((route, i) => {
        const { component: Component } = route;
        const { location, path, exact, sensitive, strict } = route;
        return (
          <Route {...{ location, path, exact, sensitive, strict }} key={i}>
            <React.Suspense fallback={<Spinner route={route} />}>
              <Component />
            </React.Suspense>
          </Route>
        );
      })}
    </Switch>
  );
}

function renderLayoutRoutes(routes, Layout, opts: RouteFrameOptions) {
  // 支持布局组件自定义内容渲染 - 主要用于 tab 的 keep-alive 场景
  // 相同的 layout 不会 rerender
  const Content = Layout.Content || (({ routes }) => renderRoutes(routes, opts));
  const { ErrorBoundary } = opts;
  return (
    <Layout>
      <ErrorBoundary>
        <Content routes={routes} />
      </ErrorBoundary>
    </Layout>
  );
}
