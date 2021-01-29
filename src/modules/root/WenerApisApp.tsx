import * as React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { WenerApisLayout } from 'src/modules/root/WenerApisLayout';
import { LoadableComponentSpec, menus, routes } from 'src/modules/root/menus';
import Loadable from 'react-loadable';
import { WenerApisContent } from 'src/modules/root/WenerApisContent';
import { Alert } from 'antd';
import { Helmet } from 'react-helmet';

const NextLink: React.FC<{ href }> = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

const NotFoundSimple = ({ detail }) => (
  <div>
    Not Found <br />
    {detail}
  </div>
);

function ContentLoadable(
  { module, name }: LoadableComponentSpec,
  { onLoad = undefined, NotFound = NotFoundSimple } = {},
) {
  return Loadable({
    loader: () =>
      import(module).then((v) => {
        const c = v[name] || NotFound;
        onLoad?.(c);
        return c;
      }),
    loading: (props) => {
      if (props.error) {
        console.error(`Error`, props.error);
        return (
          <div>
            Failed loading - {module}/{name}
            <br />
            {String(props.error)}
          </div>
        );
      }
      if (props.timedOut) {
        return (
          <div>
            Timeout loading - {module}/{name} ... <button onClick={props.retry}>Retry</button>
          </div>
        );
      }
      if (props.pastDelay) {
        return (
          <div>
            Loading - {module}/{name}
          </div>
        );
      }
      return null;
    },
  });
}

const loaders = {};
const LoadableContent: React.FC<{ content: LoadableComponentSpec }> = ({ content, children }) => {
  const { module, name } = content;
  const key = `${module}/${name}`;
  // reload module works - but need upper level reload
  // const Comp = (loaders[key] = loaders[key] || ContentLoadable(content, { onLoad: (v) => (loaders[key] = v) }));
  const Comp = (loaders[key] = loaders[key] || ContentLoadable(content));
  return <Comp>{children}</Comp>;
};

export const WenerApisApp: React.FC = () => {
  return (
    <Router>
      <WenerApisLayout Link={NextLink} menus={menus}>
        <Switch>
          {routes.map(({ iconComponent, title, content, path }) => (
            <Route exact path={path} key={path}>
              <WenerApisContent title={title} icon={iconComponent}>
                <Helmet>
                  <title>
                    {title}
                    {title !== `Wener's APIs` ? ` - Wener's APIs` : ''}
                  </title>
                  <meta name="og:title" property="og:title" content={title} />
                </Helmet>
                <Alert.ErrorBoundary>
                  <LoadableContent content={content} />
                </Alert.ErrorBoundary>
              </WenerApisContent>
            </Route>
          ))}
        </Switch>
      </WenerApisLayout>
    </Router>
  );
};
