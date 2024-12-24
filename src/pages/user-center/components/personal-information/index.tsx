import React from 'react';
import { Form, Input } from 'antd';
import UploadImg from '@com/upload-img';
import { withTranslation } from 'react-i18next';

/**
 * 个人资料
 */
class PersonalInformation extends React.PureComponent<any, any> {
  render() {
    const { t } = this.props;

    return (
      <>
        <Form.Item label={t(`手机号码`)} name='phone' required>
          <Input readOnly />
        </Form.Item>

        <Form.Item
          label={t(`昵称`)}
          name='nickname'
          rules={[
            {
              required: true,
              message: t(`请输入`),
            },
          ]}
        >
          <Input placeholder={t(`请输入`)} maxLength={30} />
        </Form.Item>

        <Form.Item
          label={t(`头像`)}
          name='avatar'
          valuePropName='fileList'
          rules={[
            {
              required: true,
              message: t(`请上传`),
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

export default withTranslation()(PersonalInformation);
