import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';
import jsmd5 from 'js-md5';
import { history } from '@utils';
import { validatePhone } from '@utils/common-fn';
// 全局设置
import { PWD_KEY } from '@config';
// logo图片
import logoImg from '@img/logo2.png';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 注册
 */
@observer
class Register extends React.PureComponent<any, any> {
    formRef = React.createRef<FormInstance>();

    render() {
        return (
            <div className='dm_Register'>
                <div className='dm_Register__content'>
                    <Form
                        autoComplete='off'
                        ref={ this.formRef }
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
                                validator: (rule, value) => {
                                    value = value?.trim?.();
                                    if(!value) {
                                        return Promise.reject('请输入用户名');
                                    }

                                    const reg = /[A-Za-z0-9]{2,64}/;
                                    if (!reg.test(value)) {
                                        if(value?.length >= 2 && value?.length <= 64) {
                                            return Promise.reject('用户名仅支持输入大小写英文、数字及其组合');
                                        }

                                        return Promise.reject('用户名限制在2到64个字符');
                                    }
                            
                                    return Promise.resolve();
                                } 
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
                            name="confirmUpwd"
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
                            rules={[{ validator: (rule, value) => validatePhone?.(value), }]}
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
                            <span 
                                className='dm_Register__login'
                                onClick={() => history.push("/login")}
                            >已有账号，直接登录</span>
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
        store.registerStore.userRegisterServiceFn({
            ...values,
            upwd: jsmd5(`${values['upwd']}${PWD_KEY}`),
            confirmUpwd: jsmd5(`${values['confirmUpwd']}${PWD_KEY}`),
        }, () => {
            this.formRef.current?.resetFields?.();
            history.push("/login");
        });
    };

}

export default Register;