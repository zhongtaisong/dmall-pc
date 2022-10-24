import React from 'react';
import { 
    Form, Button, Table, Modal, 
    Popconfirm, Tooltip, Select,
} from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import UploadImg from '@com/upload-img';
import { IGoodsInfo } from '@store/admin/goods-management/type';
import type { UploadFile, } from 'antd/es/upload/interface';
// 基本信息 - 组件
import BasicInfo from './components/basic-info';
// 商品属性 - 组件
import GoodsAttributes from './components/goods-attributes';
// mobx数据
import store from '@store';
import './index.less';

/**
 * 品牌管理
 */
@observer
class GoodsManagement extends React.PureComponent<any, {
    /** Modal是否可见 */
    visible: boolean;
    /** 表格行信息 */
    recordInfo: Partial<IGoodsInfo>;
    /** 是否禁用表单 */
    disabled: boolean;
    /** banner推广图片是否可见 */
    isBannerPicture: boolean;
    /** 当前是否为推广操作 */
    isSpread: boolean;
}> {
    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            recordInfo: {},
            disabled: false,
            isBannerPicture: false,
            isSpread: false,
        }
    }

    componentDidMount() {
        store.goodsManagementStore.adminGoodsSelectServiceFn();
        store.goodsManagementStore.adminBrandsSelectAllServiceFn();
    }

    render() {
        const { 
            dataSource, total, adminGoodsUpdateStatusServiceFn,
        } = store?.goodsManagementStore || {};
        const { 
            visible, recordInfo, disabled, 
            isBannerPicture, isSpread,
        } = this.state;
        let modal_title = null;
        if(!recordInfo?.id) {
            modal_title = "添加";
        }else {
            if(!isSpread) {
                modal_title = disabled ? "查看" : "更新";
            }else {
                modal_title = "推广";
            }
        }

        return (
            <div className='common_width'>
                <Button 
                    style={{ marginBottom: 12, }}
                    type='primary'
                    onClick={() => this.setState({ visible: true, })}
                >添加商品</Button>

                <Table 
                    dataSource={ toJS(dataSource) }
                    bordered
                    rowKey='id'
                    pagination={{
                        showSizeChanger: true,
                        total,
                        onChange: (page: number, pageSize: number) => {
                            store.goodsManagementStore.adminGoodsSelectServiceFn({
                                current: page - 1,
                                pageSize,
                            });
                        },
                        showTotal: total => `共 ${total} 条`,
                    }}
                    scroll={{ x: "140%", }}
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
                        title="品牌" 
                        dataIndex="brand_name" 
                        key="brand_name" 
                        width='12%'
                        render={text => {
                            if(!text) return "-";

                            return (
                                <Tooltip title={ text }>
                                    <span className='single_line_ellipsis'>{ text }</span>
                                </Tooltip>
                            );
                        }}
                    />

                    <Table.Column 
                        title="商品名称" 
                        dataIndex="goods_name" 
                        key="goods_name" 
                        width='14%'
                        render={text => {
                            if(!text) return "-";

                            return (
                                <Tooltip title={ text }>
                                    <span className='two_line_ellipsis'>{ text }</span>
                                </Tooltip>
                            );
                        }}
                    />

                    <Table.Column 
                        title="商品描述" 
                        dataIndex="description" 
                        key="description" 
                        width='14%'
                        render={text => {
                            if(!text) return "-";

                            return (
                                <Tooltip title={ text }>
                                    <span className='two_line_ellipsis'>{ text }</span>
                                </Tooltip>
                            );
                        }}
                    />

                    <Table.Column 
                        title="促销文案" 
                        dataIndex="copywriting" 
                        key="copywriting" 
                        width='14%'
                        render={text => {
                            if(!text) return "-";

                            return (
                                <Tooltip title={ text }>
                                    <span className='two_line_ellipsis'>{ text }</span>
                                </Tooltip>
                            );
                        }}
                    />

                    <Table.Column 
                        title="单价" 
                        dataIndex="price" 
                        key="price" 
                        align="center"
                        width='10%'
                        render={text => {
                            return `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`;
                        }}
                    />

                    <Table.Column 
                        title="上下架" 
                        dataIndex="status" 
                        key="status" 
                        width='8%'
                        align='center'
                        render={(text) => {
                            return {
                                0: "下架",
                                1: "上架",
                            }?.[text] || "-";
                        }} 
                    />

                    <Table.Column 
                        title="热门推荐" 
                        dataIndex="recommend_status" 
                        key="recommend_status" 
                        width='10%'
                        align='center'
                        render={(text) => {
                            return {
                                0: "否",
                                1: "是",
                            }?.[text] || "-";
                        }} 
                    />

                    <Table.Column 
                        title="banner推广" 
                        dataIndex="banner_status" 
                        key="banner_status" 
                        width='12%'
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
                        width='10%'
                        align='center'
                    />

                    <Table.Column 
                        title="更新时间" 
                        dataIndex="update_time" 
                        key="update_time" 
                        width='10%'
                        align='center'
                    />

                    <Table.Column 
                        title="操作" 
                        dataIndex="operation" 
                        key="operation" 
                        align='center'
                        fixed="right"
                        width='20%'
                        render={(text, record: IGoodsInfo, index) => {
                            return (
                                <div className='operation-btn'>
                                    <span onClick={() =>this.onDetailClick(record)}>详情</span>
                                    <span onClick={() =>this.onUpdateClick(record)}>更新</span>
                                    <span onClick={() => adminGoodsUpdateStatusServiceFn?.({
                                        id: record?.id,
                                        status: record?.status === 1 ? 0 : 1,
                                    })}>{ record?.status === 1 ? "下架" : "上架" }</span>
                                    <span onClick={() => this.onSpreadClick(record)}>推广</span>
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
                    wrapClassName="goods_management_modal"
                    width={ 1000 }
                    title={`${ modal_title }商品`}
                    visible={ visible }
                    onCancel={ this.onCancelClick }
                    onOk={ this.onOkClick }
                    {...disabled && { footer: null }}
                >
                    <Form 
                        autoComplete="off"
                        ref={ this.formRef }
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        disabled={ disabled }
                        labelWrap
                    >
                        {
                            !isSpread ? (
                                <>
                                    {/* 基本信息 - 组件 */}
                                    <BasicInfo />
                                    {/* 商品属性 - 组件 */}
                                    <GoodsAttributes />
            
                                    <Form.Item
                                        className='goods_management_modal__upload'
                                        label="商品主图"
                                        name="main_picture"
                                        valuePropName="fileList"
                                        rules={[{
                                            required: true, 
                                            message: '请上传商品主图!',
                                        }]}
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 21 }}
                                        extra="1、每张图片大小限制在 2M 以内; 2、最多上传 1 张图片。"
                                    >
                                        <UploadImg 
                                            maxCount={ 1 }
                                            onUploadCallBack={(result: Array<UploadFile>) => {
                                                this.formRef.current.setFieldsValue({ main_picture: result, });
                                            }}
                                        />
                                    </Form.Item>
            
                                    <Form.Item
                                        className='goods_management_modal__upload'
                                        label="商品小图"
                                        name="goods_picture"
                                        valuePropName="fileList"
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 21 }}
                                        extra="1、每张图片大小限制在 2M 以内; 2、最多上传 4 张图片。"
                                    >
                                        <UploadImg 
                                            maxCount={ 4 }
                                            onUploadCallBack={(result: Array<UploadFile>) => {
                                                this.formRef.current.setFieldsValue({ goods_picture: result, });
                                            }}
                                        />
                                    </Form.Item>
            
                                    <Form.Item
                                        className='goods_management_modal__upload'
                                        label="商品详情图片"
                                        name="detail_picture"
                                        valuePropName="fileList"
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 21 }}
                                        extra="1、每张图片大小限制在 2M 以内; 2、最多上传 5 张图片。"
                                    >
                                        <UploadImg 
                                            maxCount={ 5 }
                                            onUploadCallBack={(result: Array<UploadFile>) => {
                                                this.formRef.current.setFieldsValue({ detail_picture: result, });
                                            }}
                                        />
                                    </Form.Item>
                                </>
                            ) : (
                                <>
                                    <Form.Item 
                                        label='设为热门推荐商品'
                                        name="recommend_status"
                                        rules={[{ 
                                            required: true, 
                                            message: '是否设为热门推荐商品', 
                                        }]}
                                    >
                                        <Select placeholder="请选择" >
                                            <Select.Option value={ 1 }>是</Select.Option>
                                            <Select.Option value={ 0 }>否</Select.Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item 
                                        label='设为banner推广商品'
                                        name="banner_status"
                                        rules={[{ 
                                            required: true, 
                                            message: '是否设为banner推广商品', 
                                        }]}
                                    >
                                        <Select placeholder="请选择" 
                                            onChange={value => this.setState({ isBannerPicture: Boolean(value), })}
                                        >
                                            <Select.Option value={ 1 }>是</Select.Option>
                                            <Select.Option value={ 0 }>否</Select.Option>
                                        </Select>
                                    </Form.Item>

                                    {
                                        isBannerPicture ? (
                                            <Form.Item
                                                className='goods_management_modal__upload'
                                                label="banner推广图片"
                                                name="banner_picture"
                                                valuePropName="fileList"
                                                rules={[{
                                                    required: true, 
                                                    message: '请上传banner推广图片!',
                                                }]}
                                                labelCol={{ span: 3 }}
                                                wrapperCol={{ span: 21 }}
                                                extra="1、每张图片大小限制在 2M 以内; 2、最多上传 1 张图片。"
                                            >
                                                <UploadImg 
                                                    maxCount={ 1 }
                                                    onUploadCallBack={(result: Array<UploadFile>) => {
                                                        this.formRef.current.setFieldsValue({ banner_picture: result, });
                                                    }}
                                                />
                                            </Form.Item>
                                        ) : null
                                    }
                                </>
                            )
                        }
                    </Form>
                </Modal>
            </div>
        );
    }

    /**
     * 推广 - 操作
     * @param record 
     */
    onSpreadClick = (record) => {
        this.setState({ 
            isSpread: true,
        }, () => {
            this.onUpdateClick(record);
        });
    }

    /**
     * 详情 - 操作
     * @param record 
     */
     onDetailClick = (record) => {
        this.setState({ 
            disabled: true,
        }, () => {
            this.onUpdateClick(record);
        });
    }

    /**
     * 更新 - 操作
     * @param record 
     */
    onUpdateClick = (record) => {
        this.setState({ 
            recordInfo: record, 
            visible: true,
            isBannerPicture: record?.banner_status === 1,
        }, () => {
            this.formRef.current.setFieldsValue(record);
        });
    }

    /**
     * 删除 - 操作
     * @param brand_id 
     */
    onDeleteClick = (brand_id: number) => {
        store.goodsManagementStore.adminGoodsDeleteServiceFn(brand_id);
    }

    /**
     * Modal - 保存 - 操作
     */
    onOkClick = () => {
        const { recordInfo, isSpread, } = this.state;
        this.formRef.current.validateFields().then(values => {
            const { main_picture, goods_picture, detail_picture, banner_picture, ...otherValues } = values;
            const goods_info = {...otherValues};
            const formData = new FormData();
            if(Array.isArray(banner_picture)) {
                const { originFileObj, } = banner_picture?.[0] || {};
                originFileObj && formData.append("banner_picture", originFileObj);
            }

            if(Array.isArray(main_picture)) {
                const { originFileObj, url, } = main_picture?.[0] || {};
                originFileObj && formData.append("main_picture", originFileObj);

                if(url) {
                    goods_info['main_picture'] = url;
                }
            }

            if(Array.isArray(goods_picture)) {
                const picture_old = [];
                goods_picture.forEach(item => {
                    item?.originFileObj && formData.append("goods_picture", item?.originFileObj);
                    if(item?.url) {
                        picture_old.push(item.url);
                    }
                });

                if(Array.isArray(picture_old)) {
                    goods_info['goods_picture'] = picture_old;
                }
            }

            if(Array.isArray(detail_picture)) {
                const picture_old = [];
                detail_picture.forEach(item => {
                    item?.originFileObj && formData.append("detail_picture", item?.originFileObj);
                    if(item?.url) {
                        picture_old.push(item.url);
                    }
                });

                if(Array.isArray(picture_old)) {
                    goods_info['detail_picture'] = picture_old;
                }
            }

            if(!isSpread) {
                formData.append("goods_info", JSON.stringify(goods_info));
            }else {
                formData.append("recommend_goods_info", JSON.stringify(otherValues));
            }

            let result = null;
            if(!recordInfo?.id) {
                result = store.goodsManagementStore.adminGoodsAddServiceFn(formData);
            }else {
                formData.append("id", String(recordInfo?.id));
                if(!isSpread) {
                    result = store.goodsManagementStore.adminGoodsUpdateServiceFn(formData);
                }else {
                    result = store.goodsManagementStore.adminGoodsUpdateRecommendServiceFn(formData);
                }
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
            disabled: false,
            isSpread: false,
        }, () => {
            this.formRef.current.resetFields();
        });
    }
}

export default GoodsManagement;