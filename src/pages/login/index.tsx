import React from 'react';
import { Form, Spin } from 'antd';
import { observer } from 'mobx-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';
import jsmd5 from 'js-md5';
// 登录 - 表单组件
import Logins from './components/logins';
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
    const { isLoading } = store?.pagesStore || {};

    return (
      <div className='dm_Login'>
        <Spin spinning={isLoading} tip='加载中...'>
          <div className='dm_Login__content'>
            <Form
              autoComplete='new-password'
              ref={this.formRef}
              onFinish={this.onFinish}
            >
              <Link to='/' className='dm_Login__content--logo'>
                <img src={logoImg} alt='logo' />
              </Link>

              {/* 登录 - 表单组件 */}
              <Logins />
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
    if (!values || !Object.keys(values).length) return;

    store.loginStore.userLoginServiceFn({
      ...values,
      password: jsmd5(`${values['password']}`),
    });
  };
}

export default Login;
