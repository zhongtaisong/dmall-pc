import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { BackTop, Spin } from 'antd';
import { observer } from 'mobx-react';
import { commonFn } from '@utils';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 各级页面路由
import ROUTE_LIST from '@router';
// 401、402、403、404
import ResultPages from '@pages/result-pages';
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
                <BackTop className='pages_index__backTop' />
                <HeaderBar {...this.props} />
                <Spin spinning={ store?.pagesStore?.isLoading } tip="加载中...">
                    <div className='pages_index__content'>
                        <Switch>
                            {
                                ROUTE_LIST.map(item => {
                                    const isAuth = isLogin || item?.isOpen;

                                    if(item.redirect){
                                        const redirectParams = {
                                            from: isAuth ? item?.pathname :  "*",
                                            to: isAuth ? item?.redirect : '/login',
                                        }
                                        return (
                                            <Redirect key={ item.id } exact {...redirectParams} />
                                        );
                                    }

                                    return (
                                        <Route 
                                            key={ item.id }
                                            exact
                                            path={ item.pathname }
                                            render={
                                                (props: RouteComponentProps) => {
                                                    if(!isAuth){
                                                        return (<Redirect to={ '/login' } />);
                                                    }

                                                    return (<item.component {...props} />);
                                                }
                                            }
                                        />
                                    );
                                })
                            }

                            <Route component={ ResultPages } />
                        </Switch>
                    </div>
                    <FooterCopyright {...this.props} />
                </Spin>
            </div>
        );
    }
}

export default Index;