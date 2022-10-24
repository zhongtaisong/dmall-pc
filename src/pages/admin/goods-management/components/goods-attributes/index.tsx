import React from 'react';
import { Form, Input } from 'antd';

/**
 * 商品属性
 */
export default class GoodsAttributes extends React.PureComponent<any, any> {
    render() {
        return (
            <>
                <Form.Item 
                    label='商品毛重'
                    name="weight"
                    rules={[{ 
                        required: false, 
                        message: '请输入商品毛重', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入商品毛重' />
                </Form.Item>

                <Form.Item 
                    label='商品产地'
                    name="place_of_origin"
                    rules={[{ 
                        required: false, 
                        message: '请输入商品产地', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入商品产地' />
                </Form.Item>

                <Form.Item 
                    label='系统'
                    name="systems"
                    rules={[{ 
                        required: false, 
                        message: '请输入系统', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入系统' />
                </Form.Item>

                <Form.Item 
                    label='处理器'
                    name="cpu"
                    rules={[{ 
                        required: false, 
                        message: '请输入处理器', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入处理器' />
                </Form.Item>

                <Form.Item 
                    label='厚度'
                    name="thickness"
                    rules={[{ 
                        required: false, 
                        message: '请输入厚度', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入厚度' />
                </Form.Item>

                <Form.Item 
                    label='硬盘容量'
                    name="disk"
                    rules={[{ 
                        required: false, 
                        message: '请输入硬盘容量', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入硬盘容量' />
                </Form.Item>

                <Form.Item 
                    label='待机时长'
                    name="standby_time"
                    rules={[{ 
                        required: false, 
                        message: '请输入待机时长', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入待机时长' />
                </Form.Item>

                <Form.Item 
                    label='系列'
                    name="series"
                    rules={[{ 
                        required: false, 
                        message: '请输入系列', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入系列' />
                </Form.Item>

                <Form.Item 
                    label='裸机重量'
                    name="bare_weight"
                    rules={[{ 
                        required: false, 
                        message: '请输入裸机重量', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入裸机重量' />
                </Form.Item>

                <Form.Item 
                    label='屏幕尺寸'
                    name="screen_size"
                    rules={[{ 
                        required: false, 
                        message: '请输入屏幕尺寸', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入屏幕尺寸' />
                </Form.Item>

                <Form.Item 
                    label='显卡型号'
                    name="gpu"
                    rules={[{ 
                        required: false, 
                        message: '请输入显卡型号', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入显卡型号' />
                </Form.Item>

                <Form.Item 
                    label='特性'
                    name="characteristic"
                    rules={[{ 
                        required: false, 
                        message: '请输入特性', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入特性' />
                </Form.Item>

                <Form.Item 
                    label='内存容量'
                    name="memory"
                    rules={[{ 
                        required: false, 
                        message: '请输入内存容量', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入内存容量' />
                </Form.Item>

                <Form.Item 
                    label='显存容量'
                    name="gpu_capacity"
                    rules={[{ 
                        required: false, 
                        message: '请输入显存容量', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入显存容量' />
                </Form.Item>

                <Form.Item 
                    label='机身材质'
                    name="body_material"
                    rules={[{ 
                        required: false, 
                        message: '请输入机身材质', 
                        whitespace: false,
                    }]}
                >
                    <Input placeholder='请输入机身材质' />
                </Form.Item>
            </>
        );
    }
};
