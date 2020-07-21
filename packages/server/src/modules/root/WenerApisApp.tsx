import * as React from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { WenerApisLayout } from 'src/modules/root/WenerApisLayout';
import { menus } from 'src/modules/root/menus';

const NextLink: React.FC<{ href }> = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

export const WenerApisApp: React.FC = () => {
  return (
    <Router>
      <WenerApisLayout Link={NextLink} menus={menus}>
        <Switch>
          <Route exact path="/">
            <div>Hom ehre</div>
          </Route>
          <Route exact path="/geo/me">
            {/*<LocationMe />*/}
            Wa la
          </Route>
        </Switch>
      </WenerApisLayout>
    </Router>
  );
};
