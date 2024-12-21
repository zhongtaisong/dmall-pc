import React from 'react';
import { Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
// 全局公共方法
import { ScrollToTop, history } from '@utils';
// 各级页面路由
import { ROUTE_LIST_PUBLIC } from '@router';
import Index from '@pages';

/**
 * App
 */
class App extends React.PureComponent<any, any> {
  render() {
    return (
      <div className='dm_App'>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            {ROUTE_LIST_PUBLIC.map((item) => {
              if (!item || !Object.keys(item).length) return null;

              return (
                <Route
                  key={item?.pathname}
                  path={item?.pathname}
                  exact={item?.exact}
                  render={(props: RouteComponentProps) => {
                    if (item.title) {
                      document.title = item.title;
                    }
                    return <item.component {...props} />;
                  }}
                />
              );
            })}

            <Route path='/' component={Index} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
