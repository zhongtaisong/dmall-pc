import React from 'react';
import {
  Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { Button } from 'antd';
import { ADMIN_PATH_NAME } from '@config';
// 全局公共方法
import { ScrollToTop, history } from '@utils';
// 各级页面路由
import { ROOT_ROUTER } from '@router';
// 401、402、403、404
import ResultPages from '@com/result-pages';

/**
 * App
 */
class App extends React.PureComponent<any, any> {
  componentDidMount(): void {
    history.listen((location, action) => {
      if (!location || !Object.keys(location).length) return;
      if (location?.pathname?.includes?.(ADMIN_PATH_NAME)) return;

      const bol = ROOT_ROUTER.some(
        (item) => item.pathname === location.pathname,
      );
    });
  }

  render() {
    return (
      <div className='dm_App'>
        <Router history={history}>
          <ScrollToTop />
          <Switch>
            {ROOT_ROUTER.map((item) => {
              if (item?.redirect) {
                return (
                  <Redirect
                    key={item?.pathname}
                    exact
                    from={item?.pathname}
                    to={item?.redirect}
                  />
                );
              }

              return (
                <Route
                  key={item?.pathname}
                  path={item?.pathname}
                  render={(props: RouteComponentProps) => {
                    if (item.title) {
                      document.title = item.title;
                    }
                    return <item.component {...props} />;
                  }}
                />
              );
            })}

            <Route
              render={(props) => {
                return (
                  <ResultPages
                    extra={
                      <Button
                        type='primary'
                        onClick={() => props?.history?.goBack?.()}
                      >
                        返回
                      </Button>
                    }
                  />
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
