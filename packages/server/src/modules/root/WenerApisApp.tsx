import * as React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { WenerApisLayout } from 'src/modules/root/WenerApisLayout';
import { LoadableComponentSpec, menus, routes } from 'src/modules/root/menus';
import Loadable from 'react-loadable';
import { WenerApisContent } from 'src/modules/root/WenerApisContent';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useConstant } from '../../../../ui/src/hooks';

const LoadableComponent = Loadable({
  loader: () => import('@wener/apis-geo').then(({ LocationMeLite }) => LocationMeLite),
  loading: (props) => {
    if (props.error) {
      console.error(`Error`, props.error);
      return <div>Failed loading</div>;
    }
    return <div>Loading</div>;
  },
});

const NextLink: React.FC<{ href }> = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

console.log(`Routes`, routes);

const NotFound = ({ detail }) => (
  <div>
    Not Found <br />
    {detail}
  </div>
);
const loaders = {};
const LoadableContent: React.FC<{ content: LoadableComponentSpec }> = ({ content: { module, name }, children }) => {
  // const Comp = useConstant(() =>
  //   Loadable({
  //     loader: () => import(module).then((v) => v[name]),
  //     loading: (props) => {
  //       if (props.error) {
  //         console.error(`Error`, props.error);
  //         return (
  //           <div>
  //             Failed loading - {module}/{name}
  //           </div>
  //         );
  //       }
  //       return (
  //         <div>
  //           Loading - {module}/{name}
  //         </div>
  //       );
  //     },
  //   }),
  // );
  const key = `${module}/${name}`;
  const Comp = (loaders[key] =
    loaders[key] ||
    Loadable({
      loader: () => import(module).then((v) => (loaders[key] = v[name] || NotFound)),
      loading: (props) => {
        if (props.error) {
          console.error(`Error`, props.error);
          return (
            <div>
              Failed loading - {module}/{name}
            </div>
          );
        }
        return (
          <div>
            Loading - {module}/{name}
          </div>
        );
      },
    }));
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
                <LoadableContent content={content} />
              </WenerApisContent>
            </Route>
          ))}
        </Switch>
      </WenerApisLayout>
    </Router>
  );
};
