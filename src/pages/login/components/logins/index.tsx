import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './index.less';

/**
 * 登录 - 表单
 */
@observer
class Logins extends React.PureComponent<any, any> {
  render() {
    return (
      <div className='login_logins'>
        <Form.Item
          name='phone'
          rules={[
            {
              required: true,
              message: '请输入手机号码',
            },
          ]}
          initialValue={localStorage.getItem('phone')}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='请输入手机号码'
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='请输入密码'
          />
        </Form.Item>

        <div className='login_logins__pwd'>
          <Form.Item
            name='isRemember'
            valuePropName='checked'
            initialValue={true}
          >
            <Checkbox>记住账号</Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{ width: '100%' }}
            size='large'
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to='/register' className='login_logins__register'>
            新用户注册
          </Link>
        </Form.Item>
      </div>
    );
  }
}

export default Logins;
