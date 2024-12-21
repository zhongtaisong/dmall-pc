import React from 'react';
import { Form, Button, Radio } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';
import { FormInstance } from 'antd/es/form';
import jsmd5 from 'js-md5';
import { PWD_KEY } from '@config';
import { cacheKey, history } from '@utils';
// 个人信息
import PersonalInformation from './components/personal-information';
// 修改登录密码
import LoginPassword from './components/login-password';
// 收货地址
import ReceivingAddress from './components/receiving-address';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 用户中心
 */
@observer
class UserCenter extends React.PureComponent<
  any,
  {
    /**
     * 当前菜单key
     */
    radioValue: 0 | 1 | 2;
    /** 用户id */
    userId: number;
    /** 图片列表 */
    fileList: Array<any>;
  }
> {
  formRef = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {
      radioValue: 0,
      userId: null,
      fileList: [],
    };
  }

  componentDidMount() {
    store.userCenterStore.selectUserInformationServiceFn((data) => {
      this.setState(
        {
          userId: data?.id,
          fileList: data?.avatar,
        },
        () => {
          this.formRef.current.setFieldsValue({ ...data });
        },
      );
    });
  }

  render() {
    const { radioValue, fileList } = this.state;

    return (
      <div className='common_width dm_UserCenter'>
        <div className='dm_UserCenter__title'>
          <Radio.Group value={radioValue} onChange={this.onRadioChange}>
            <Radio.Button value={0}>个人资料</Radio.Button>
            <Radio.Button value={1}>修改登录密码</Radio.Button>
            <Radio.Button value={2}>收货地址</Radio.Button>
          </Radio.Group>
        </div>

        <div className='dm_UserCenter__content'>
          {[0, 1].includes(radioValue) ? (
            <div className='dm_UserCenter__content--form'>
              <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}
                autoComplete='new-password'
                ref={this.formRef}
                onFinish={this.onFinish}
              >
                {/* 个人资料 */}
                {radioValue === 0 ? (
                  <PersonalInformation
                    onUploadCallBack={(avatar) => {
                      this.formRef.current.setFieldsValue({
                        avatar,
                      });
                    }}
                    fileList={fileList}
                  />
                ) : null}

                {/* 修改登录密码 */}
                {radioValue === 1 ? <LoginPassword /> : null}

                <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
                  <Button type='primary' htmlType='submit'>
                    更新
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : null}

          {radioValue === 2 ? <ReceivingAddress /> : null}
        </div>
      </div>
    );
  }

  /**
   * 监听 - Radio变化
   * @param e
   * @returns
   */
  onRadioChange = (e) => {
    const key = e?.target?.value;
    this.setState({ radioValue: key }, () => {
      const callBack = {
        0: () => {
          store.userCenterStore.selectUserInformationServiceFn((data) => {
            this.setState(
              {
                userId: data?.id,
                fileList: data?.avatar,
              },
              () => {
                this.formRef.current.setFieldsValue({ ...data });
              },
            );
          });
        },
        2: () => {
          store.userCenterStore.selectAddressListServiceFn();
        },
      }[key];
      if (!callBack) return;
      callBack?.();
    });
  };

  /**
   * 表单提交 - 操作
   */
  onFinish = (values) => {
    if (!values || !Object.keys(values).length) return;

    const { radioValue, userId } = this.state;
    const callBack = {
      0: () => {
        const { avatar, ...otherValues } = values;
        const formData = new FormData();
        const avatar_new = avatar?.[0]?.originFileObj;
        if (avatar_new) {
          formData.append('avatar', avatar_new);
        }
        formData.append(
          'user_info',
          JSON.stringify({
            ...otherValues,
            birthday: values['birthday']
              ? moment(values['birthday']).format('YYYY-MM-DD')
              : null,
            id: userId,
          }),
        );

        store.userCenterStore.updateUserInformationServiceFn(formData);
      },
      1: () => {
        store.userCenterStore
          .updateUserPasswordServiceFn({
            oldPwd: jsmd5(values?.oldPwd + PWD_KEY),
            newPwd: jsmd5(values?.newPwd + PWD_KEY),
          })
          .then((res) => {
            localStorage.removeItem(cacheKey.USER_INFO);
            sessionStorage.removeItem(cacheKey.USER_INFO);
            history.replace('/login');
          });
      },
    }[radioValue];
    if (!callBack) return;

    callBack?.();
  };
}

export default UserCenter;
