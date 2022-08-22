import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
// 全局设置
import { PWD_KEY } from '@config';
// logo图片
import logoImg from '@img/logo2.png';
// 数据
import state from './state';
// less样式
import './index.less';

/**
 * 注册
 */
@observer
class Register extends React.PureComponent<any, any> {

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    componentWillUnmount() {
        state.setHistory();
    }

    render() {
        return (
            <div className='dm_Register'>
                <div className='dm_Register__content'>
                    <Form
                        autoComplete='off'
                        onFinish={ this.onFinish }
                    >
                        <Link 
                            to='/' 
                            className='dm_Register__content--logo'
                        >
                            <img src={ logoImg } alt='logo' />
                        </Link>
                        <Form.Item 
                            name="uname"
                            rules={[{ 
                                required: true, 
                                message: '请输入用户名', 
                                whitespace: true 
                            }]}
                        >
                            <Input placeholder='请输入用户名' />
                        </Form.Item>
                        <Form.Item 
                            name="upwd"
                            hasFeedback
                            rules={[{
                                required: true,
                                message: '请输入密码', 
                                whitespace: true 
                            }]}
                        >
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item 
                            name="confirm"
                            dependencies={['upwd']}
                            required
                            hasFeedback
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        value = value?.trim?.();
                                        if(!value) {
                                            return Promise.reject("请输入确认密码");
                                        };
        
                                        if (getFieldValue('upwd') !== value) {
                                            return Promise.reject("两次输入的密码不一致");
                                        }
        
                                        return Promise.resolve();
                                    },
                                })
                            ]}
                        >
                            <Input.Password placeholder='请输入确认密码' />
                        </Form.Item>
                        <Form.Item 
                            name="phone"
                            required
                            rules={[{ 
                                validator: (rule, value) => {
                                    if(!value?.trim?.()) {
                                        return Promise.reject('请输入手机号码');
                                    }

                                    const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                                    if (!reg.test(value)) {
                                        return Promise.reject('请输入合法的手机号码');
                                    }
                            
                                    return Promise.resolve();
                                } 
                            }]}
                        >
                            <Input placeholder='请输入手机号码' />
                        </Form.Item>
                        <Form.Item 
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: '请输入合法的邮箱',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱', 
                                    whitespace: true 
                                }
                            ]}
                        >
                            <Input placeholder='请输入邮箱' />
                        </Form.Item>
                        <Form.Item
                            colon={ false }
                        >
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{ width: '100%' }}
                                size='large'
                            >提交注册信息</Button>
                        </Form.Item>
                        <Form.Item
                            colon={ false }
                        >
                            <Link to="/login" className='dm_Register__login'>已有账号，直接登录</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }

    /**
     * 提交注册信息
     * @param values 表单值
     */
    onFinish = (values) => {
        state.registerData({
            ...values,
            upwd: (window as any).$md5(values.upwd + PWD_KEY),
            confirm: (window as any).$md5(values.confirm + PWD_KEY),
        });
    };

}

export default Register;