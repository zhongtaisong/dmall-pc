import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 忘记密码 - 表单
 */
@observer
class ForgetPassword extends React.PureComponent<{
    onLoginClick: Function;
}, any> {
    render() {
        const { componentKey, } = store?.loginStore || {};
        const { onLoginClick } = this.props;
        if(componentKey !== 1) return null;

        return (
            <div className='dm_ForgetPassword'>
                <Form.Item 
                    name="uname"
                    rules={[{ 
                        required: true, 
                        message: '请输入用户名', 
                        whitespace: true 
                    }]}
                    initialValue={ localStorage.getItem('uname') }
                >
                    <Input placeholder='请输入用户名' />
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
                        style={{ width: '100%' }} 
                        htmlType="submit"
                        size='large'
                    >验证信息</Button>
                </Form.Item>
                <Form.Item
                    colon={ false }
                >
                    <span 
                        className='dm_ForgetPassword__login' 
                        onClick={() => onLoginClick?.()}
                    >直接登录</span>
                </Form.Item>
            </div>
        );
    }
}

export default ForgetPassword;