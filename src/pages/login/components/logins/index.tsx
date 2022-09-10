import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
// mobx数据
import store from '@store';
import './index.less';

/**
 * 登录 - 表单
 */
@observer
class Logins extends React.PureComponent<any, any> {
    render() {
        const { componentKey, setMobxStoreFn, } = store?.loginStore || {};
        if(componentKey !== 0) return null;
        
        return (
            <div className='login_logins'>
                <Form.Item
                    name="uname"
                    rules={[{ 
                        required: true, 
                        message: '请输入用户名', 
                        whitespace: true 
                    }]}
                    initialValue={ localStorage.getItem('uname') }
                >
                    <Input
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入用户名"
                    />
                </Form.Item>
                <Form.Item
                    name="upwd"
                    rules={[{ 
                        required: true, 
                        message: '请输入密码', 
                        whitespace: true 
                    }]}
                >
                    <Input
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                    />
                </Form.Item>

                <div className='login_logins__pwd'>
                    <Form.Item 
                        name="isRemember"
                        valuePropName="checked"
                        initialValue={ false }
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <span 
                            className='login_logins__pwd--text' 
                            onClick={() => setMobxStoreFn?.({
                                key: 'componentKey',
                                value: 1,
                            })}
                        >忘记密码？</span>
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        style={{ width: '100%' }}
                        size='large'
                    >登录</Button>
                </Form.Item> 
                <Form.Item>
                    <Link to="/register" className='login_logins__register'>新用户注册</Link>
                </Form.Item>
            </div>
        );
    }
}

export default Logins;