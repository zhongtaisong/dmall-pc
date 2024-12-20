import React from 'react';
import { Router, Switch, Route, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
// 全局公共方法
import { ScrollToTop, history } from '@utils';
// 各级页面路由
import { ROUTE_LIST_PUBLIC } from '@router';
// 401、402、403、404
import ResultPages from '@com/result-pages';
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
            <Route exact path='/' component={Index} />

            {ROUTE_LIST_PUBLIC.map((item) => {
              if (!item || !Object.keys(item).length) return null;

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
                        onClick={() => props?.history?.replace('/')}
                      >
                        首页
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
