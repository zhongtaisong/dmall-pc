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
 * 我的订单
 */
@observer
class MyOrder extends React.PureComponent<any, any> {
    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        const { ordernum } = this.props?.match?.params || {};
        store.goodsEvaluateStore.goodsEvaluateSelectServiceFn(ordernum);
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        const { ordernum } = this.props?.match?.params || {};
        const prevOrdernum = prevProps?.match?.params?.id;
        if(ordernum && prevOrdernum && ordernum !== prevOrdernum) {
            store.goodsEvaluateStore.goodsEvaluateSelectServiceFn(ordernum);
        }
    }
    
    render() {
        const { 
            dataSource, isModalVisible, goodsEvaluateMap,
            onGoodsEvaluateClick, 
            onModalCancelClick,
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
                    onCancel={() => onModalCancelClick?.()}
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
                                allowClear 
                                showCount 
                                maxLength={ 300 }
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

            onModalOkClick?.(values);
        })
    }
}

export default MyOrder;