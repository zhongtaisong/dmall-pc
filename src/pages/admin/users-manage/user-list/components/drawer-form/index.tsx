import React from 'react';
import { Form, Input, Radio, DatePicker } from 'antd';
// 全局公共组件
import { UploadImg } from '@com';

/**
 * 表单内容
 */
class DrawerForm extends React.PureComponent<{
    /**
     * 渲染 - 密码表单
     */
    renderPasswordForm: React.ReactNode;
    /**
     * 是否禁止更改用户名
     */
    isDisabledEditUname: boolean;
    [key: string]: any;
}, any> {
    render() {
        const { renderPasswordForm, isDisabledEditUname, ...otherProps } = this.props;
        return (
            <>
                <Form.Item 
                    label='用户名'
                    name="uname"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input disabled={ isDisabledEditUname } placeholder='请输入' />
                </Form.Item>

                { renderPasswordForm }

                <Form.Item 
                    label='邮箱'
                    name="email"
                    rules={[{
                        type: 'email',
                        message: '输入的邮箱无效!',
                    },{
                        required: true,
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item 
                    label="手机号码"
                    name="phone"
                    required
                    rules={[{ 
                        validator: (rule, value) => {
                            if(!value?.trim?.()) {
                                return Promise.reject('请输入手机号码！');
                            }

                            const reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                            if (!reg.test(value)) {
                                return Promise.reject('请输入合法的手机号码！');
                            }
                    
                            return Promise.resolve();
                        } 
                    }]}
                >
                    <Input placeholder='请输入手机号码' />
                </Form.Item>

                <Form.Item
                    label="性别"
                    name="gender"
                    rules={[{
                        required: true, 
                        message: '必填' 
                    }]}
                >
                    <Radio.Group>
                        <Radio value='0'>男</Radio>
                        <Radio value='1'>女</Radio>
                        <Radio value='2'>保密</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="生日"
                    name="birthday"
                    rules={[{
                        required: true, 
                        message: '必填' 
                    }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="昵称"
                    name="nickName"
                    rules={[{ 
                        required: true, 
                        message: '必填', 
                        whitespace: true 
                    }]}
                >
                    <Input placeholder='请输入' />
                </Form.Item>

                <Form.Item
                    label="头像"
                    name="avatar"
                    rules={[{
                        required: true, 
                        message: '请上传上传头像！',
                    }]}
                >
                    <UploadImg 
                        downloadUrl='goods/download'
                        maxCount={ 1 }
                        disabled={ false }
                        {...otherProps}
                    />
                </Form.Item>
            </>
        );
    }
}

export default DrawerForm;