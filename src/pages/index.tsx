import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { BackTop, Button, Spin } from 'antd';
import { observer } from 'mobx-react';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 各级页面路由
import { ROUTE_LIST } from '@router';
// mobx数据
import store from '@store';
import './index.less';
import ResultPages from '@com/result-pages';

/**
 * 根页面
 */
@observer
class Index extends React.PureComponent<RouteComponentProps, any> {
  render() {
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
                {ROUTE_LIST.map((item) => {
                  if (!item || !Object.keys(item).length) return null;
                  return (
                    <Route<{
                      key: string;
                    }>
                      key={item.pathname}
                      exact={item?.exact}
                      path={item.pathname}
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
            </div>

            <FooterCopyright {...this.props} />
          </div>
        </Spin>
      </div>
    );
  }
}

export default Index;
