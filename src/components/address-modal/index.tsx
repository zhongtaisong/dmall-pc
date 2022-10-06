import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import {FormInstance} from 'antd/es/form';
import { validatePhone } from '@utils/common-fn';

/**
 * 添加收货地址 - Modal
 */
class AddressModal extends React.PureComponent<{
    /** 弹窗是否可见 */
    visible: boolean;
    /** 表单数据 */
    formData?: {
        [key: string]: any;
    };
    /** 确定操作 - 回调函数 */
    onOk: Function;
    /** 取消操作 - 回调函数 */
    onCancel: Function;
}, any> {
    formRef = React.createRef<FormInstance>();

    componentDidMount(): void {
        const { formData, } = this.props || {};
        this.formRef.current.setFieldsValue({
            ...formData,
        });
    }

    render() {
        const { visible, formData, } = this.props || {};

        return (
            <Modal
                title={ `${ !formData?.id ? '添加' : '更新' }收货地址` }
                visible={ visible }
                onOk={ this.onOk }
                onCancel={ this.onCancel }
            >                    
                <Form 
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete="off"
                    ref={ this.formRef }
                >
                    <Form.Item
                        label="收货人"
                        name="name"
                        rules={[{ 
                            required: true, 
                            message: '请输入收货人', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入收货人' />
                    </Form.Item>

                    <Form.Item
                        label="所在地区"
                        name="region"
                        rules={[{ 
                            required: true, 
                            message: '请输入所在地区', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入所在地区' />
                    </Form.Item>

                    <Form.Item
                        label="详情地址"
                        name="detail"
                        rules={[{ 
                            required: true, 
                            message: '请输入详情地址', 
                            whitespace: true 
                        }]}
                    >
                        <Input placeholder='请输入详情地址' />
                    </Form.Item>

                    <Form.Item 
                        label="联系电话"
                        name="phone"
                        required
                        rules={[{ validator: (rule, value) => validatePhone?.(value), }]}
                    >
                        <Input placeholder='请输入联系电话' />
                    </Form.Item>

                    <Form.Item
                        label="设为默认地址"
                        name="isDefault"
                        rules={[{ 
                            required: true, 
                            message: '是否为默认地址', 
                        }]}
                    >
                        <Radio.Group>
                            <Radio value={ 1 }>是</Radio>
                            <Radio value={ 0 }>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    /**
     * AddressModal - 确定 - 操作
     */
    onOk = () => {
        this.formRef.current.validateFields().then(values => {
            if(!values || !Object.keys(values).length) return;

            this.props.onOk?.(values, () => {
                this.onCancel();
            });
        });
    }

    /**
     * 取消 - 操作
     */
    onCancel = () => {
        this.formRef.current.resetFields();
        this.props.onCancel?.();
    }

}

export default AddressModal;