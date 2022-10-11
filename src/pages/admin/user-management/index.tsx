import React from 'react';
import { Form, Input, Button, Table, Modal, Popconfirm, Select, notification, } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import { IRecordInfo } from '@store/admin/user-management/type';
import { validatePhone, validateUname } from '@utils/common-fn';
import jsmd5 from 'js-md5';
import { PWD_KEY } from '@config';
// mobx数据
import store from '@store';

/**
 * 用户管理
 */
@observer
class UserManagement extends React.PureComponent<any, {
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
        store.userManagementStore.adminUserSelectServiceFn();
    }

    render() {
        const { dataSource, total, } = store?.userManagementStore || {};
        const { visible, recordInfo } = this.state;

        return (
            <div className='common_width'>
                <Button 
                    style={{ marginBottom: 12, }}
                    type='primary'
                    onClick={() => this.setState({ visible: true, })}
                >添加用户</Button>

                <Table 
                    dataSource={ dataSource }
                    bordered
                    rowKey='id'
                    pagination={{
                        showSizeChanger: true,
                        total,
                        onChange: (page: number, pageSize: number) => {
                            store.userManagementStore.adminUserSelectServiceFn({
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
                        title="昵称" 
                        dataIndex="nickName" 
                        key="nickName" 
                    />

                    <Table.Column 
                        title="性别" 
                        dataIndex="gender" 
                        key="gender"
                        width='6%'
                        align='center'
                        render={(text) => {
                            return {
                                0: "男",
                                1: "女",
                                2: "保密",
                            }?.[text] || "-";
                        }} 
                    />

                    <Table.Column 
                        title="手机号码" 
                        dataIndex="phone" 
                        key="phone" 
                    />

                    <Table.Column 
                        title="邮箱" 
                        dataIndex="email" 
                        key="email" 
                    />

                    <Table.Column 
                        title="是否允许进入DemoMall管理后台" 
                        dataIndex="admin_status" 
                        key="admin_status" 
                        align='center'
                        render={(text) => {
                            return {
                                0: "否",
                                1: "是",
                            }?.[text] || "-";
                        }} 
                    />

                    <Table.Column 
                        title="创建时间" 
                        dataIndex="create_time" 
                        key="create_time"
                        align='center'
                    />

                    <Table.Column 
                        title="更新时间" 
                        dataIndex="update_time" 
                        key="update_time" 
                        align='center'
                    />

                    <Table.Column 
                        title="操作" 
                        dataIndex="operation" 
                        key="operation" 
                        align='center'
                        width='16%'
                        render={(text, record: IRecordInfo, index) => {
                            return (
                                <div className='operation-btn'>
                                    <span onClick={() =>this.onUpdateClick(record)}>更新</span>
                                    <Popconfirm title="你确定要删除？"
                                        onConfirm={() => this.onDeleteClick?.(record)}
                                    >
                                        <span>删除</span>
                                    </Popconfirm>
                                    <Popconfirm title="你确定要重置密码？" 
                                        onConfirm={() => store.userManagementStore.adminUserResetPasswordServiceFn({
                                            id: record?.id,
                                            uname: record?.uname,
                                        }, (content) => {
                                            notification.open({
                                                message: '重置用户密码成功',
                                                description: (
                                                    <div>
                                                        初始密码为：
                                                        <span style={{ 
                                                            fontWeight: 'bold',
                                                            fontSize: 16,
                                                        }}>{ content }</span>
                                                    </div>
                                                ),
                                            });
                                        })}
                                    >
                                        <span>重置密码</span>
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
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <Form.Item 
                            label="用户名"
                            name="uname"
                            required
                            rules={[{ validator: (rule, value) => validateUname?.(value), }]}
                        >
                            <Input 
                                placeholder='请输入用户名' 
                                disabled={ Boolean(recordInfo?.id) }
                            />
                        </Form.Item>

                        {
                            !recordInfo?.id ? (
                                <>
                                    <Form.Item 
                                        label="密码"
                                        name="upwd"
                                        hasFeedback
                                        rules={[{
                                            required: true,
                                            message: '请输入密码', 
                                            whitespace: true 
                                        }]}
                                    >
                                        <Input.Password placeholder='请输入密码' />
                                    </Form.Item>
            
                                    <Form.Item 
                                        label="确认密码"
                                        name="confirmUpwd"
                                        dependencies={['upwd']}
                                        required
                                        hasFeedback
                                        rules={[
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    value = value?.trim?.();
                                                    if(!value) {
                                                        return Promise.reject("请输入确认密码");
                                                    };
                    
                                                    if (getFieldValue('upwd') !== value) {
                                                        return Promise.reject("两次输入的密码不一致");
                                                    }
                    
                                                    return Promise.resolve();
                                                },
                                            })
                                        ]}
                                    >
                                        <Input.Password placeholder='请输入确认密码' />
                                    </Form.Item>
                                </>
                            ) : null
                        }

                        <Form.Item 
                            label="手机号码"
                            name="phone"
                            required
                            rules={[{ validator: (rule, value) => validatePhone?.(value), }]}
                        >
                            <Input placeholder='请输入手机号码' />
                        </Form.Item>

                        <Form.Item 
                            label="邮箱"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: '请输入合法的邮箱',
                                },
                                {
                                    required: true,
                                    message: '请输入邮箱', 
                                    whitespace: true 
                                }
                            ]}
                        >
                            <Input placeholder='请输入邮箱' />
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
     * @param record 
     */
    onDeleteClick = (record) => {
        store.userManagementStore.adminUserDeleteServiceFn(record?.uname, record?.id);
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { recordInfo } = this.state;

        this.formRef.current.validateFields().then(values => {
            let result = null;
            if(!recordInfo?.id) {
                result = store.userManagementStore.adminUserAddServiceFn({
                    ...values,
                    upwd: jsmd5(`${values['upwd']}${PWD_KEY}`),
                    confirmUpwd: jsmd5(`${values['confirmUpwd']}${PWD_KEY}`),
                });
            }else {
                result = store.userManagementStore.adminUserUpdateServiceFn({
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

export default UserManagement;