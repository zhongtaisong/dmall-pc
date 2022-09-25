import React from 'react';
import { Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button } from 'antd';
// 全局公共方法
import { ScrollToTop, history } from '@utils';
// 各级页面路由
import { ROOT_ROUTER, } from '@router';
// 401、402、403、404
import ResultPages from '@pages/result-pages';

/**
 * App
 */
class App extends React.PureComponent<any, any> {
    render() {
        return (
            <div className='dm_App'>
                <Router history={ history }>
                    <ScrollToTop />
                    <Switch>
                        {
                            ROOT_ROUTER.map(item => {
                                if(item?.redirect) {
                                    return (
                                        <Redirect 
                                            key={ item?.pathname }
                                            exact
                                            from={ item?.pathname }
                                            to={ item?.redirect } 
                                        />
                                    );
                                }

                                return (
                                    <Route 
                                        key={ item?.pathname }
                                        path={ item?.pathname }
                                        render={
                                            (props: RouteComponentProps) => {
                                                if(item.title) {
                                                    document.title = item.title;
                                                }
                                                return (<item.component {...props} />);
                                            }
                                        }
                                    />
                                );
                            })
                        }
                        
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
                </Router>
            </div>
        );
    }
}

export default App;