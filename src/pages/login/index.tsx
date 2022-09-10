import React from 'react';
import { Form, Spin } from 'antd';
import { observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';
import jsmd5 from 'js-md5';
// 登录 - 表单组件
import Logins from './components/logins';
// 忘记密码 - 表单组件
import ForgetPassword from './components/forget-password';
// 新密码 - 表单组件
import NewPassword from './components/new-password';
// 设置
import { PWD_KEY } from '@config';
// logo图片
import logoImg from '@img/logo2.png';
// mobx数据
import store from '@store';
// less样式
import './index.less';


/**
 * 登录、忘记密码、新密码
 */
@observer
class Login extends React.PureComponent<Partial<RouteComponentProps>, any> {
    formRef = React.createRef<FormInstance>();

    render() {
        const { isLoading, } = store?.pagesStore || {};
        const { setMobxStoreFn, } = store?.loginStore || {};

        return (
            <div className='dm_Login'>
                <Spin spinning={ isLoading } tip="加载中...">
                    <div className='dm_Login__content' >
                        <Form 
                            autoComplete='off'
                            ref={ this.formRef }
                            onFinish={ this.onFinish }
                        >
                            <Link 
                                to='/' 
                                className='dm_Login__content--logo'
                            >
                                <img src={ logoImg } alt='logo' />
                            </Link>

                            {/* 登录 - 表单组件 */}
                            <Logins /> 
                            {/* 忘记密码 - 表单组件 */}
                            <ForgetPassword
                                onLoginClick={() => {
                                    this.formRef.current?.resetFields?.(['phone', 'email']);
                                    setMobxStoreFn?.({
                                        key: 'componentKey',
                                        value: 0,
                                    });
                                }}
                            /> 
                            {/* 新密码 - 表单组件 */}
                            <NewPassword
                                onLoginClick={() => {
                                    this.formRef.current?.resetFields?.(['newPwd', 'confirmPwd']);
                                    setMobxStoreFn?.({
                                        key: 'componentKey',
                                        value: 0,
                                    });
                                }}
                            />
                        </Form>
                    </div>
                </Spin>
            </div>
        );
    }

    /**
     * 提交表单
     * @param values 表单信息
     * @returns 
     */
    onFinish = (values) => {
        const { componentKey } = store?.loginStore || {};
        if(!values || !Object.keys(values).length) return;
        
        if(componentKey === 0) {
            return store.loginStore.userLoginServiceFn({
                ...values,
                upwd: (window as any).$md5(values?.upwd + PWD_KEY),
            });
        }
        
        if(componentKey === 1) {
            return store.loginStore.userValidateServiceFn(values, () => {
                this.formRef.current?.resetFields?.(['phone', 'email']);
            });
        }
        
        if(componentKey === 2) {
            for(const val in values) {
                values[val] = jsmd5(`${values[val]}${PWD_KEY}`);
            }
            return store.loginStore.userUpdatePasswordServiceFn(values, () => {
                this.formRef.current?.resetFields?.(['newPwd', 'confirmPwd']);
            });
        }
    };
}

export default Login;