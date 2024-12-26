import React from 'react';
import { Form, Button } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
// 个人信息
import PersonalInformation from './components/personal-information';
// mobx数据
import store from '@store';
// less样式
import './index.less';
import { withTranslation } from 'react-i18next';

/**
 * 用户中心
 */
@observer
class UserCenter extends React.PureComponent<
  any,
  {
    /** 图片列表 */
    fileList: Array<any>;
  }
> {
  formRef = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentDidMount() {
    store.userCenterStore.selectUserInformationServiceFn().then((result) => {
      this.setState(
        {
          fileList: result?.avatar || [],
        },
        () => {
          this.formRef.current.setFieldsValue({
            ...result,
          });
        },
      );
    });
  }

  render() {
    const { fileList } = this.state;
    const { t } = this.props;

    return (
      <div className='common_width dm_UserCenter'>
        <div className='dm_UserCenter__content'>
          <div className='dm_UserCenter__content--form'>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              autoComplete='off'
              ref={this.formRef}
              onFinish={this.onFinish}
              labelWrap
            >
              {/* 个人资料 */}
              <PersonalInformation
                onUploadCallBack={(avatar) => {
                  this.formRef.current.setFieldsValue({
                    avatar,
                  });
                }}
                fileList={fileList}
              />

              <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                <Button type='primary' htmlType='submit'>
                  {t('提交')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 表单提交 - 操作
   */
  onFinish = (values) => {
    if (!values || !Object.keys(values).length) return;

    let imgs = values?.avatar;
    if (Array.isArray(imgs) && imgs.length) {
      imgs = imgs
        .map((item) => item?.response?.context?.[0] || item?.url || '')
        .filter(Boolean);
    } else {
      imgs = [];
    }

    Object.assign(values, {
      avatar: imgs,
    });

    store.userCenterStore.updateUserInformationServiceFn(values);
  };
}

export default withTranslation()(UserCenter);
