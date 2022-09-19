import React from 'react';
import { Form, Input } from 'antd';
/**
 * 登录密码
 */
class LoginPassword extends React.PureComponent<any, any> {
    render() {
        return (
            <>
                <Form.Item
                    label="旧密码"
                    name="oldPwd"
                    rules={[{ 
                        required: true, 
                        message: '请输入旧密码', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入旧密码' />
                </Form.Item>

                <Form.Item
                    label="新密码"
                    name="newPwd"
                    rules={[{ 
                        required: true, 
                        message: '请输入新密码', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入新密码' />
                </Form.Item>

                <Form.Item
                    label="再次输入新密码"
                    name="confirmNewPwd"
                    required
                    rules={[({ getFieldValue }) => ({
                        validator(_, value) {
                            value = value?.trim?.();
                            if(!value) {
                                return Promise.reject("请再次输入新密码！");
                            };

                            if (getFieldValue('newPwd') !== value) {
                                return Promise.reject("两次输入的密码不一致！");
                            }

                            return Promise.resolve();
                        },
                    })]}
                    dependencies={['newPwd']}
                >
                    <Input placeholder='请再次输入新密码' />
                </Form.Item>
            </>
        );
    }
}

export default LoginPassword;