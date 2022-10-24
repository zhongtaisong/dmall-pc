import React from 'react';
import { Form, Input, Radio, DatePicker } from 'antd';
import { validatePhone } from '@utils/common-fn';
import UploadImg from '@com/upload-img';

/**
 * 个人资料
 */
export default class PersonalInformation extends React.PureComponent<{
    /** 上传图片 - 回调函数 */
    onUploadCallBack: Function;
    /** 图片列表 */
    fileList: Array<any>;
}, any> {
    render() {
        const { onUploadCallBack, fileList, } = this.props;

        return (
            <>
                <Form.Item
                    label="头像"
                    name="avatar"
                    valuePropName="fileList"
                    rules={[{
                        required: true, 
                        message: '请上传头像！',
                    }]}
                    extra="1、每张图片大小限制在 2M 以内; 2、最多上传 1 张图片。"
                >
                    <UploadImg 
                        maxCount={ 1 }
                        onUploadCallBack={(file) => onUploadCallBack?.(file)} 
                        fileList={ fileList }
                    />
                </Form.Item>

                <Form.Item
                    label="用户名"
                    name="uname"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="昵称"
                    name="nickName"
                >
                    <Input placeholder='请输入昵称' />
                </Form.Item>

                <Form.Item 
                    label="手机号码"
                    name="phone"
                    required
                    rules={[{ validator: (rule, value) => validatePhone?.(value), }]}
                >
                    <Input placeholder='请输入手机号码' />
                </Form.Item>

                <Form.Item
                    label="出生日期"
                    name="birthday"
                    rules={[{
                        required: true, 
                        message: '请选择出生日期' 
                    }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="性别"
                    name="gender"
                    rules={[{
                        required: true, 
                        message: '请选择性别' 
                    }]}
                >
                    <Radio.Group>
                        <Radio value='0'>男</Radio>
                        <Radio value='1'>女</Radio>
                        <Radio value='2'>保密</Radio>
                    </Radio.Group>
                </Form.Item>
            </>
        );
    }
};
