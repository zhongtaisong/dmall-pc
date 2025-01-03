import React from 'react';
import { Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import type { FormInstance } from 'antd/es/form';
import jsmd5 from 'js-md5';
import { validatePhone } from '@utils/common-fn';
// logo图片
import logoImg from '@img/logo2.png';
// mobx数据
import store from '@store';
// less样式
import './index.less';
import { dmHistory } from '@utils/history';
import { withTranslation } from 'react-i18next';

/**
 * 注册
 */
@observer
class Register extends React.PureComponent<any, any> {
  formRef = React.createRef<FormInstance>();

  render() {
    const { t } = this.props;

    return (
      <div className='dm_Register'>
        <div className='dm_Register__content'>
          <Form
            autoComplete='new-password'
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            <Link to='/' className='dm_Register__content--logo'>
              <img src={logoImg} alt='logo' />
            </Link>

            <Form.Item
              name='phone'
              required
              rules={[
                { validator: (rule, value) => validatePhone?.(value, t) },
              ]}
            >
              <Input placeholder={t(`请输入手机号码`)} maxLength={11} />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: t(`请输入密码`),
                },
              ]}
            >
              <Input.Password placeholder={t(`请输入密码`)} />
            </Form.Item>

            <Form.Item
              name='confirmUpwd'
              dependencies={['password']}
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    value = value?.trim?.();
                    if (!value) {
                      return Promise.reject(t(`请输入确认密码`));
                    }

                    if (getFieldValue('password') !== value) {
                      return Promise.reject(t(`两次输入的密码不一致`));
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password placeholder={t(`请输入确认密码`)} />
            </Form.Item>

            <Form.Item colon={false}>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
                size='large'
              >
                {t(`提交`)}
              </Button>
            </Form.Item>
            <Form.Item colon={false}>
              <span
                className='dm_Register__login'
                onClick={() => dmHistory.push('/login')}
              >
                {t(`已有账号，直接登录`)}
              </span>
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
    delete values?.confirmUpwd;

    store.registerStore.userRegisterServiceFn(
      {
        ...values,
        password: jsmd5(`${values['password']}`),
      },
      () => {
        this.formRef.current?.resetFields?.();
        dmHistory.push('/login');
      },
    );
  };
}

export default withTranslation()(Register);
