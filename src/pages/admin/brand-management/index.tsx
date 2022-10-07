import React from 'react';
import { Form, Input, Button, Table, Modal, Popconfirm } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import { IBrandInfo } from '@store/admin/brand-management/type';
// mobx数据
import store from '@store';

/**
 * 品牌管理
 */
@observer
class BrandManagement extends React.PureComponent<any, {
    /** Modal是否可见 */
    visible: boolean;
    /** 品牌信息 */
    brandInfo: IBrandInfo;
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            brandInfo: null,
        }
    }

    componentDidMount() {
        store.brandManagementStore.adminBrandsSelectServiceFn();
    }

    render() {
        const { dataSource, total, } = store?.brandManagementStore || {};
        const { visible, brandInfo } = this.state;

        return (
            <div className='common_width'>
                <Button 
                    style={{ marginBottom: 12, }}
                    type='primary'
                    onClick={() => this.setState({ visible: true, })}
                >添加品牌</Button>

                <Table 
                    dataSource={ dataSource }
                    bordered
                    rowKey='brand_id'
                    pagination={{
                        showSizeChanger: true,
                        total,
                        onChange: (page: number, pageSize: number) => {
                            store.brandManagementStore.adminBrandsSelectServiceFn({
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
                        title="品牌名称" 
                        dataIndex="brand_name" 
                        key="brand_name" 
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
                        render={(text, record: IBrandInfo, index) => {
                            return (
                                <div className='operation-btn'>
                                    <span onClick={() =>this.onUpdateClick(record)}>更新</span>
                                    <Popconfirm title="你确定要删除？"
                                        onConfirm={() => this.onDeleteClick?.(record?.brand_id)}
                                    >
                                        <span>删除</span>
                                    </Popconfirm>
                                </div>
                            );
                        }}
                    />
                </Table>

                <Modal
                    title={`${ brandInfo?.brand_id ? '更新' : '添加' }品牌`}
                    visible={ visible }
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                >
                    <Form 
                        autoComplete="off"
                        ref={ this.formRef }
                    >
                        <Form.Item 
                            label='品牌名称'
                            name="brand_name"
                            rules={[{ 
                                required: true, 
                                message: '请输入品牌名称', 
                                whitespace: true 
                            }]}
                        >
                            <Input placeholder='请输入品牌名称' />
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
            brandInfo: record, 
            visible: true,
        }, () => {
            this.formRef.current.setFieldsValue(record);
        });
    }

    /**
     * 删除 - 操作
     * @param brand_id 
     */
    onDeleteClick = (brand_id: number) => {
        store.brandManagementStore.adminBrandsDeleteServiceFn(brand_id);
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { brandInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            let result = null;
            if(!brandInfo?.brand_id) {
                result = store.brandManagementStore.adminBrandsAddServiceFn(values);
            }else {
                result = store.brandManagementStore.adminBrandsUpdateServiceFn({
                    ...values,
                    brand_id: brandInfo?.brand_id,
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
            brandInfo: null, 
            visible: false,
        }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default BrandManagement;