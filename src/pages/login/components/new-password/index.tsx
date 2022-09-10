import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
// mobx数据
import store from '@store';
import './index.less';

/**
 * 新密码 - 表单
 */
@observer
class NewPassword extends React.PureComponent<{
    onLoginClick: Function;
}, any> {
    render() {
        const { componentKey, } = store?.loginStore || {};
        const { onLoginClick } = this.props;
        if(componentKey !== 2) return null;

        return (
            <div className='dm_ForgetPassword'>
                <Form.Item 
                    name="newPwd"
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          whitespace: false,
                          message: '请输入密码',
                        },
                    ]}
                >
                    <Input.Password placeholder='请输入密码' />
                </Form.Item>
                <Form.Item 
                    name="confirmPwd"
                    dependencies={['newPwd']}
                    required
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                value = value?.trim?.();
                                if(!value) {
                                    return Promise.reject("请输入确认密码");
                                };

                                if (getFieldValue('newPwd') !== value) {
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
                    colon={ false }
                >
                    <Button 
                        type="primary" 
                        style={{ width: '100%' }} 
                        htmlType="submit"
                        size='large'
                    >提交新密码</Button>
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

export default NewPassword;