import React from 'react';
import { Form, Input } from 'antd';
import UploadImg from '@com/upload-img';

/**
 * 个人资料
 */
export default class PersonalInformation extends React.PureComponent<any, any> {
  render() {
    return (
      <>
        <Form.Item label='手机号码' name='phone' required>
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label='昵称'
          name='nickname'
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        >
          <Input placeholder='请输入' maxLength={30} />
        </Form.Item>

        <Form.Item
          label='头像'
          name='avatar'
          valuePropName='fileList'
          rules={[
            {
              required: true,
              message: '请上传',
            },
          ]}
        >
          <UploadImg
            name='user'
            isForm
            maxCount={1}
            action='/image/upload/user'
          />
        </Form.Item>
      </>
    );
  }
}
