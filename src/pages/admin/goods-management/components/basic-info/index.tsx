import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import { observer } from 'mobx-react';
// mobx数据
import store from '@store';

/**
 * 基本信息
 */
@observer
class BasicInfo extends React.PureComponent<any, any> {
    render() {
        const { brandsDataSource, } = store?.goodsManagementStore || {};

        return (
            <>
                <Form.Item 
                    label='品牌'
                    name="brand_id"
                    rules={[{ 
                        required: true, 
                        message: '请选择品牌',
                    }]}
                >
                    <Select
                        placeholder="请选择品牌"
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        getPopupContainer={ triggerNode => triggerNode?.parentElement }
                    >
                        {
                            brandsDataSource?.map?.(item => {
                                if(!item?.brand_name) return null;

                                return (
                                    <Select.Option 
                                        key={ item?.brand_id }
                                    >{ item?.brand_name }</Select.Option>
                                );
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item 
                    label='商品名称'
                    name="goods_name"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品名称', 
                        whitespace: true,
                    }]}
                >
                    <Input placeholder='请输入商品名称' />
                </Form.Item>

                <Form.Item 
                    label='单价'
                    name="price"
                    rules={[{ 
                        required: true, 
                        message: '请输入单价', 
                        type: 'number',
                    }]}
                >
                    <InputNumber 
                        min={ 0 } 
                        step={ 0.01 } 
                        placeholder='请输入' 
                    />
                </Form.Item>

                <Form.Item 
                    label='商品规格'
                    name="spec"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品规格', 
                        whitespace: true,
                    }]}
                >
                    <Input.TextArea placeholder='请输入商品规格' 
                        autoSize={{ minRows: 3, maxRows: 6, }}
                    />
                </Form.Item>

                <Form.Item 
                    label='商品描述'
                    name="description"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品描述', 
                        whitespace: true,
                    }]}
                >
                    <Input.TextArea placeholder='请输入商品描述' 
                        autoSize={{ minRows: 3, maxRows: 6, }}
                    />
                </Form.Item>

                <Form.Item 
                    label='促销文案'
                    name="copywriting"
                >
                    <Input.TextArea placeholder='请输入促销文案' 
                        autoSize={{ minRows: 3, maxRows: 6, }}
                    />
                </Form.Item>
            </>
        );
    }
};

export default BasicInfo;