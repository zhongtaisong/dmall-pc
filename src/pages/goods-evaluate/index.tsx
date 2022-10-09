import React from 'react';
import { observer } from 'mobx-react';
import { Table, Modal, Form, Input, } from 'antd';
import type { FormInstance } from 'antd/es/form';
// 各种表头
import columns from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 商品评价中心
 */
@observer
class GoodsEvaluate extends React.PureComponent<any, any> {
    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        const { order_no } = this.props?.match?.params || {};
        store.goodsEvaluateStore.goodsEvaluateSelectServiceFn(order_no);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { order_no } = this.props?.match?.params || {};
        const prevOrdernum = prevProps?.match?.params?.id;
        if(order_no && prevOrdernum && order_no !== prevOrdernum) {
            store.goodsEvaluateStore.goodsEvaluateSelectServiceFn(order_no);
        }
    }
    
    render() {
        const { 
            dataSource, isModalVisible, goodsEvaluateMap,
            onGoodsEvaluateClick, 
        } = store?.goodsEvaluateStore || {};
        const num = dataSource.filter(item => !item?.content).length ?? 0;

        return (
            <div className='common_width dm_goods_evaluation_center'>
                <div className='dm_goods_evaluation_center__title'>
                    <span>商品评价中心</span>
                    <div>( 还有 <i>{ num }</i> 件商品待评价 )</div>
                </div>

                {/* 表头 */}
                <Table 
                    columns={
                        columns({
                            onGoodsEvaluateClick: (record) => {
                                onGoodsEvaluateClick(record, () => {
                                    setTimeout(() => {
                                        this.formRef.current?.setFieldsValue?.({ 
                                            ...record,
                                        });
                                    }, 0)
                                });
                            }
                        })
                    } 
                    dataSource={ dataSource } 
                    pagination={ false }
                    bordered
                    rowKey="pid"
                />

                <Modal 
                    title={ `${ !goodsEvaluateMap?.content ? '添加' : '修改' }评价` } 
                    visible={ isModalVisible }
                    onOk={ this.onOk }
                    onCancel={ this.onCancel }
                >
                    <Form ref={ this.formRef } >
                        <Form.Item 
                            name="content"
                            rules={[{ 
                                required: true, 
                                whitespace: true,
                                message: '请输入评价内容!',
                            }]}
                        >
                            <Input.TextArea 
                                placeholder='请输入评价内容' 
                                allowClear 
                                showCount 
                                maxLength={ 300 }
                                autoSize={{ minRows: 5, maxRows: 6, }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * Modal - 确定 - 操作
     */
    onOk = () => {
        const { onModalOkClick } = store?.goodsEvaluateStore || {};

        this.formRef.current.validateFields().then(values => {
            if(!values || !Object.keys(values).length) return;

            onModalOkClick?.(values, () => {
                this.onCancel();
            });
        })
    }

    /**
     * Modal - 取消 - 操作
     */
    onCancel= () => {
        const { 
            onModalCancelClick,
        } = store?.goodsEvaluateStore || {};

        this.formRef.current.resetFields();
        onModalCancelClick?.();
    }
}

export default GoodsEvaluate;