import React from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Modal,
  Popconfirm,
  Select,
  Checkbox,
} from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import { IRecordInfo } from '@store/admin/goods-evaluate-management/type';
// mobx数据
import store from '@store';

/** 角色类型 */
const ROLE_TYPE = {
  0: '超级管理员',
  1: '管理员',
  2: '访客',
};

/** 操作类型 */
const OPERATION_TYPE = {
  0: '添加',
  1: '删除',
  2: '更新',
  3: '查询',
  4: '详情',
  5: '重置密码',
  6: '上下架',
  7: '推广',
};

/**
 * 权限管理
 */
@observer
class PermissionManagement extends React.PureComponent<
  any,
  {
    /** Modal是否可见 */
    visible: boolean;
    /** 表格行信息 */
    recordInfo: IRecordInfo;
  }
> {
  formRef = React.createRef<FormInstance>();

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      recordInfo: null,
    };
  }

  componentDidMount() {
    store.permissionManagementStore.adminPermissionSelectServiceFn();
    store.permissionManagementStore.adminPermissionSelectUnameServiceFn();
  }

  render() {
    const { dataSource, total, unameList } =
      store?.permissionManagementStore || {};
    const { visible, recordInfo } = this.state;

    return (
      <div className='common_width'>
        <Button
          style={{ marginBottom: 12 }}
          type='primary'
          onClick={() => this.setState({ visible: true })}
        >
          添加权限
        </Button>

        <Table
          dataSource={dataSource}
          bordered
          rowKey='id'
          pagination={{
            showSizeChanger: true,
            total,
            onChange: (page: number, pageSize: number) => {
              store.permissionManagementStore.adminPermissionSelectServiceFn({
                current: page - 1,
                pageSize,
              });
            },
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: '140%' }}
        >
          <Table.Column
            title='序号'
            dataIndex='index'
            key='index'
            align='center'
            width='6%'
            render={(text, record, index) => `${index + 1}`}
          />

          <Table.Column
            title='用户名'
            dataIndex='uname'
            key='uname'
            width='10%'
          />

          <Table.Column
            title='角色'
            dataIndex='role'
            key='role'
            width='10%'
            render={(text) => ROLE_TYPE?.[text] || '-'}
          />

          <Table.Column
            title='品牌管理'
            dataIndex='brand_management'
            key='brand_management'
            width='10%'
            render={(text) => this.renderResult(text)}
          />

          <Table.Column
            title='商品管理'
            dataIndex='goods_management'
            key='goods_management'
            width='14%'
            render={(text) => this.renderResult(text)}
          />

          <Table.Column
            title='订单管理'
            dataIndex='order_management'
            key='order_management'
            width='10%'
            render={(text) => this.renderResult(text)}
          />

          <Table.Column
            title='用户管理'
            dataIndex='user_management'
            key='user_management'
            width='10%'
            render={(text) => this.renderResult(text)}
          />

          <Table.Column
            title='评价管理'
            dataIndex='goods_evaluate_management'
            key='goods_evaluate_management'
            width='10%'
            render={(text) => this.renderResult(text)}
          />

          <Table.Column
            title='权限管理'
            dataIndex='permission_management'
            key='permission_management'
            width='10%'
            render={(text) => this.renderResult(text)}
          />

          <Table.Column
            title='创建时间'
            dataIndex='create_time'
            key='create_time'
            width='10%'
          />

          <Table.Column
            title='更新时间'
            dataIndex='update_time'
            key='update_time'
            width='10%'
          />

          <Table.Column
            title='操作'
            dataIndex='operation'
            key='operation'
            align='center'
            fixed='right'
            width='8%'
            render={(text, record: IRecordInfo, index) => {
              return (
                <div className='operation-btn'>
                  <span onClick={() => this.onUpdateClick(record)}>更新</span>
                  <Popconfirm
                    title='你确定要删除？'
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
          title={`${recordInfo?.id ? '更新' : '添加'}评价`}
          visible={visible}
          onCancel={this.onCancelClick}
          onOk={this.onOkClick}
        >
          <Form
            layout='horizontal'
            autoComplete='off'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            ref={this.formRef}
          >
            <Form.Item
              label='用户名'
              name='uname'
              rules={[
                {
                  required: true,
                  message: '请选择用户名',
                },
              ]}
            >
              {!recordInfo?.id ? (
                <Select placeholder='请选择用户名'>
                  {unameList?.map?.((item) => (
                    <Select.Option key={item}>{item}</Select.Option>
                  ))}
                </Select>
              ) : (
                <Input disabled={Boolean(recordInfo?.id)} />
              )}
            </Form.Item>

            <Form.Item
              label='角色'
              name='role'
              rules={[
                {
                  required: true,
                  message: '请选择角色',
                },
              ]}
            >
              <Select placeholder='请选择角色'>
                {Object.entries(ROLE_TYPE).map(([key, value]) => {
                  if (key === '0') return null;

                  return (
                    <Select.Option key={key} value={key}>
                      {value}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label='品牌管理'
              name='brand_management'
              rules={[
                {
                  required: true,
                  message: '请选择操作类型',
                },
              ]}
            >
              <Checkbox.Group>
                {Object.entries(OPERATION_TYPE).map(([key, value]) => {
                  if (!key) return null;

                  const key_new = Number(key);
                  if (key_new > 3) return null;

                  return (
                    <Checkbox key={key_new} value={key_new}>
                      {value}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label='商品管理'
              name='goods_management'
              rules={[
                {
                  required: true,
                  message: '请选择操作类型',
                },
              ]}
            >
              <Checkbox.Group>
                {Object.entries(OPERATION_TYPE).map(([key, value]) => {
                  if (!key) return null;

                  const key_new = Number(key);
                  if (key_new === 5 || key_new > 7) return null;

                  return (
                    <Checkbox key={key_new} value={key_new}>
                      {value}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label='订单管理'
              name='order_management'
              rules={[
                {
                  required: true,
                  message: '请选择操作类型',
                },
              ]}
            >
              <Checkbox.Group>
                {Object.entries(OPERATION_TYPE).map(([key, value]) => {
                  if (!key) return null;

                  const key_new = Number(key);
                  if (![1, 3, 4].includes(key_new)) return null;

                  return (
                    <Checkbox key={key_new} value={key_new}>
                      {value}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label='用户管理'
              name='user_management'
              rules={[
                {
                  required: true,
                  message: '请选择操作类型',
                },
              ]}
            >
              <Checkbox.Group>
                {Object.entries(OPERATION_TYPE).map(([key, value]) => {
                  if (!key) return null;

                  const key_new = Number(key);
                  if (key_new === 4 || key_new > 5) return null;

                  return (
                    <Checkbox key={key_new} value={key_new}>
                      {value}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label='评价管理'
              name='goods_evaluate_management'
              rules={[
                {
                  required: true,
                  message: '请选择操作类型',
                },
              ]}
            >
              <Checkbox.Group>
                {Object.entries(OPERATION_TYPE).map(([key, value]) => {
                  if (!key) return null;

                  const key_new = Number(key);
                  if (key_new > 3) return null;

                  return (
                    <Checkbox key={key_new} value={key_new}>
                      {value}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label='权限管理'
              name='permission_management'
              rules={[
                {
                  required: true,
                  message: '请选择操作类型',
                },
              ]}
            >
              <Checkbox.Group>
                {Object.entries(OPERATION_TYPE).map(([key, value]) => {
                  if (!key) return null;

                  const key_new = Number(key);
                  if (key_new > 4) return null;

                  return (
                    <Checkbox key={key_new} value={key_new}>
                      {value}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }

  /**
   * 渲染结果
   * @param text
   * @returns
   */
  renderResult = (text) => {
    if (!text) return '-';

    const data = text?.split?.(',') || [];
    if (!Array.isArray(data) || !data.length) return '-';

    const result = data
      .map((item) => OPERATION_TYPE?.[item])
      .filter((item) => item);
    if (!Array.isArray(result) || !result.length) return '-';
    return result.join('、');
  };

  /**
   * 更新 - 操作
   * @param record
   */
  onUpdateClick = (record) => {
    this.setState(
      {
        recordInfo: record,
        visible: true,
      },
      () => {
        this.formRef.current.setFieldsValue(record);
      },
    );
  };

  /**
   * 删除 - 操作
   * @param id
   */
  onDeleteClick = (id: number) => {
    store.permissionManagementStore.adminPermissionDeleteServiceFn(id);
  };

  /**
   * Modal - 保存 - 操作
   */
  onOkClick = () => {
    const { recordInfo } = this.state;

    this.formRef.current.validateFields().then((values) => {
      console.log('66666666666666', values);

      Object.entries(values).forEach(([key, value]) => {
        if (key.includes('management')) {
          if (Array.isArray(value)) {
            values[key] = value.join(',') || null;
          }
        }
      });

      let result = null;
      if (!recordInfo?.id) {
        result =
          store.permissionManagementStore.adminPermissionAddServiceFn(values);
      } else {
        result = store.permissionManagementStore.adminPermissionUpdateServiceFn(
          {
            ...values,
            id: recordInfo?.id,
          },
        );
      }

      if (!result) return;
      result?.then?.((bol) => {
        if (!bol) return;
        this.onCancelClick();
      });
    });
  };

  /**
   * Modal - 取消 - 操作
   */
  onCancelClick = () => {
    this.setState(
      {
        recordInfo: null,
        visible: false,
      },
      () => {
        this.formRef.current.resetFields();
      },
    );
  };
}

export default PermissionManagement;
