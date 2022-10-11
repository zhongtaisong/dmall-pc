import React from 'react';
import { Form, Input, Button, Table, Modal, Popconfirm, Select, } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import { IRecordInfo } from '@store/admin/goods-evaluate-management/type';
// mobx数据
import store from '@store';

/**
 * 评价管理
 */
@observer
class GoodsEvaluateManagement extends React.PureComponent<any, {
    /** Modal是否可见 */
    visible: boolean;
    /** 表格行信息 */
    recordInfo: IRecordInfo;
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            recordInfo: null,
        }
    }

    componentDidMount() {
        store.goodsEvaluateManagementStore.adminGoodsEvaluateSelectServiceFn();
        store.goodsEvaluateManagementStore.adminGoodsSelectPidsServiceFn();
    }

    render() {
        const { dataSource, total, pids, } = store?.goodsEvaluateManagementStore || {};
        const { visible, recordInfo } = this.state;

        return (
            <div className='common_width'>
                <Button 
                    style={{ marginBottom: 12, }}
                    type='primary'
                    onClick={() => this.setState({ visible: true, })}
                >添加评价</Button>

                <Table 
                    dataSource={ dataSource }
                    bordered
                    rowKey='id'
                    pagination={{
                        showSizeChanger: true,
                        total,
                        onChange: (page: number, pageSize: number) => {
                            store.goodsEvaluateManagementStore.adminGoodsEvaluateSelectServiceFn({
                                current: page - 1,
                                pageSize,
                            });
                        },
                        showTotal: total => `共 ${total} 条`,
                    }}
                >
                    <Table.Column 
                        title="序号" 
                        dataIndex="index" 
                        key="index" 
                        align='center'
                        width='6%'
                        render={(text, record, index) => `${index+1}`}
                    />

                    <Table.Column 
                        title="用户名" 
                        dataIndex="uname" 
                        key="uname" 
                    />

                    <Table.Column 
                        title="商品编号" 
                        dataIndex="pid" 
                        key="pid" 
                        width='10%'
                        align='center'
                    />

                    <Table.Column 
                        title="评价内容" 
                        dataIndex="content" 
                        key="content" 
                    />

                    <Table.Column 
                        title="创建时间" 
                        dataIndex="create_time" 
                        key="create_time" 
                        width='18%'
                        align='center'
                    />

                    <Table.Column 
                        title="更新时间" 
                        dataIndex="update_time" 
                        key="update_time" 
                        width='18%'
                        align='center'
                    />

                    <Table.Column 
                        title="操作" 
                        dataIndex="operation" 
                        key="operation" 
                        align='center'
                        width='12%'
                        render={(text, record: IRecordInfo, index) => {
                            return (
                                <div className='operation-btn'>
                                    <span onClick={() =>this.onUpdateClick(record)}>更新</span>
                                    <Popconfirm title="你确定要删除？"
                                        onConfirm={() => this.onDeleteClick?.(record?.id)}
                                    >
                                        <span>删除</span>
                                    </Popconfirm>
                                </div>
                            );
                        }}
                    />
                </Table>

                <Modal
                    title={`${ recordInfo?.id ? '更新' : '添加' }评价`}
                    visible={ visible }
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                >
                    <Form 
                        autoComplete="off"
                        ref={ this.formRef }
                    >
                        <Form.Item 
                            label='商品编号'
                            name="pid"
                            rules={[{ 
                                required: true,
                                message: '请选择商品编号'
                            }]}
                        >
                            {
                                !recordInfo?.id ? (
                                    <Select placeholder="请选择商品编号" >
                                        {
                                            pids?.map?.(item => (
                                                <Select.Option 
                                                    key={ item }
                                                >{ item }</Select.Option>
                                            ))
                                        }
                                    </Select>
                                ) : (
                                    <Input disabled={ Boolean(recordInfo?.id) } />
                                )
                            }
                        </Form.Item>

                        <Form.Item 
                            label='评价内容'
                            name="content"
                            rules={[{ 
                                required: true, 
                                message: '请输入评价内容', 
                                whitespace: true,
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
     * 更新 - 操作
     * @param record 
     */
    onUpdateClick = (record) => {
        this.setState({ 
            recordInfo: record, 
            visible: true,
        }, () => {
            this.formRef.current.setFieldsValue(record);
        });
    }

    /**
     * 删除 - 操作
     * @param id 
     */
    onDeleteClick = (id: number) => {
        store.goodsEvaluateManagementStore.adminGoodsEvaluateDeleteServiceFn(id);
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { recordInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            let result = null;
            if(!recordInfo?.id) {
                result = store.goodsEvaluateManagementStore.goodsEvaluateAddServiceFn(values);
            }else {
                result = store.goodsEvaluateManagementStore.goodsEvaluateUpdateServiceFn({
                    ...values,
                    id: recordInfo?.id,
                });
            }

            if(!result) return;
            result?.then?.(bol => {
                if(!bol) return;
                this.onCancelClick();
            });
        });
    }

    /**
     * Modal - 取消 - 操作
     */
    onCancelClick = () => {
        this.setState({ 
            recordInfo: null, 
            visible: false,
        }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default GoodsEvaluateManagement;