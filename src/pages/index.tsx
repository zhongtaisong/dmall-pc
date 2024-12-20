import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { BackTop, Spin } from 'antd';
import { observer } from 'mobx-react';
import { commonFn } from '@utils';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 各级页面路由
import { PAGE_ROUTER } from '@router';
// 401、402、403、404
import ResultPages from '@com/result-pages';
// mobx数据
import store from '@store';
import './index.less';

/**
 * 根页面
 */
@observer
class Index extends React.PureComponent<RouteComponentProps, any> {
  render() {
    const isLogin = commonFn.isLogin();

    return (
      <div className='pages_index'>
        <div className='pages_index__header'>
          <BackTop className='pages_index__backTop' />
          <HeaderBar {...this.props} />
        </div>

        <Spin spinning={store?.pagesStore?.isLoading}>
          <div className='pages_index__body'>
            <div className='pages_index__content'>
              <Switch>
                {PAGE_ROUTER.map((item) => {
                  const isAuth = isLogin || item?.isOpen;

                  if (item.redirect) {
                    const redirectParams = {
                      from: isAuth ? item?.pathname : '*',
                      to: isAuth ? item?.redirect : '/login',
                    };
                    return (
                      <Redirect key={item.pathname} exact {...redirectParams} />
                    );
                  }

                  return (
                    <Route
                      key={item.pathname}
                      exact
                      path={item.pathname}
                      render={(props: RouteComponentProps) => {
                        if (!isAuth) {
                          return <Redirect to={'/login'} />;
                        }

                        if (item.title) {
                          document.title = item.title;
                        }
                        return <item.component {...props} />;
                      }}
                    />
                  );
                })}

                <Route component={ResultPages} />
              </Switch>
            </div>
            <FooterCopyright {...this.props} />
          </div>
        </Spin>
      </div>
    );
  }
}

export default Index;
