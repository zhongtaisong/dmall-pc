import React from 'react';
import { Form, Input, Radio, DatePicker } from 'antd';
import { validatePhone } from '@utils/common-fn';

/**
 * 个人资料
 */
export default class PersonalInformation extends React.PureComponent<any, any> {
    render() {
        return (
            <>
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
