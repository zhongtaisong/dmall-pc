import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';
// 全局公共方法
import { ScrollToTop } from '@utils';
// 首页
import Index from '@pages';
// 登录
import Login from '@pages/login';
// 注册
import Register from '@pages/register';
// 401、402、403、404
import ResultPages from '@pages/result-pages';

// App
class App extends React.PureComponent<any, any> {
    render() {
        return (
            <div className='dm_App'>
                <BrowserRouter>
                    <ScrollToTop />
                    <Switch>
                        <Route path='/views' component={ Index } />
                        <Redirect exact from="/" to="/views" />
                        <Route path='/login' component={ Login } />
                        <Route path='/register' component={ Register } />
                        <Route
                            render={props => {
                                return (
                                    <ResultPages 
                                        extra={ 
                                            <Button 
                                                type="primary" 
                                                onClick={() => props?.history?.goBack?.() }
                                            >返回</Button> 
                                        }
                                    />
                                );
                            }} 
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;