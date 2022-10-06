import React from 'react';
import { observer } from 'mobx-react';
import { Table, Form, Select, message, } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import {FormInstance} from 'antd/es/form';
import { IBuyGoodsInfo } from '@store/common/type';
// 收货地址弹窗 - 组件
import AddressModal from '@com/address-modal';
// 各种表头
import { columns } from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 确认订单
 */
@observer
class ConfirmOrder extends React.PureComponent<RouteComponentProps<unknown, unknown, {
    /** 商品id */
    goodsInfo: Array<IBuyGoodsInfo>;
}>, any> {
    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        store.confirmOrderStore.selectAddressListServiceFn((addressId) => {
            this.formRef.current.setFieldsValue({ addressId });
        });
        const { goodsInfo, } = this.props.location?.state || {};
        if(Array.isArray(goodsInfo)) {
            store.confirmOrderStore.shoppingCartSelectPidsServiceFn(goodsInfo);
        }
    }

    render() {
        const { 
            addressDataSource, currentAddress, 
            onValuesChange, goodsDataSource,
            buyTotalNum, totalPrice,
        } = store?.confirmOrderStore || {};
        const { isAddressModal, } = store?.userCenterStore || {};

        return (
            <div className='common_width dm_confirm_order'>
                <div className='dm_confirm_order__title'>
                    <span>确认订单</span>
                </div>
                
                <Table 
                    columns={ columns } 
                    dataSource={ goodsDataSource } 
                    pagination={ false }
                    bordered
                    rowKey="pid"
                    footer={() => {
                        return (
                            <div className='dm_confirm_order__bottom'>
                                <div className='dm_confirm_order__bottom--info'>
                                    <div className='dm_confirm_order__bottom--info__list'>
                                        <div className='dm_confirm_order__bottom--info__list--item'>
                                            <div>选择收货地址：</div>
                                                <div className='dm_confirm_order__bottom--info__list--item__address'>
                                                    <Form 
                                                        ref={ this.formRef }
                                                        layout="inline"
                                                        onValuesChange={(changedValues, values) => onValuesChange?.(changedValues, values)}
                                                    >
                                                        <Form.Item 
                                                            noStyle
                                                            name="addressId" 
                                                            rules={[{ 
                                                                required: true,
                                                                message: "请选择收货地址!",
                                                            }]}
                                                            initialValue={ currentAddress?.id }
                                                        >
                                                            <Select 
                                                                placeholder="请选择"
                                                                style={{ width: 360, }}
                                                            >
                                                                {
                                                                    addressDataSource?.map?.(item => {
                                                                        if(!item?.address) return null;
    
                                                                        return (
                                                                            <Select.Option 
                                                                                key={ item?.id }
                                                                                value={ item?.id } 
                                                                            >{ item?.address }</Select.Option>
                                                                        );
                                                                    })
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    </Form>
                                                    <div 
                                                        className='dm_confirm_order__bottom--info__list--item__address--btn'
                                                        onClick={() => store.userCenterStore.onToggleAddressModalClick(true)}
                                                    >新增收货地址</div>
                                                </div>
                                        </div>
                                        <div className='dm_confirm_order__bottom--info__list'>
                                            <div className='dm_confirm_order__bottom--info__list--item'>
                                                <div>收货人：</div>
                                                <span>{ currentAddress?.name || '-' }</span>
                                            </div>
                                            <div className='dm_confirm_order__bottom--info__list--item'>
                                                <div>联系电话：</div>
                                                <span>{ currentAddress?.phone || '-' }</span>
                                            </div>
                                            <div className='dm_confirm_order__bottom--info__list--item'>
                                                <div>收货地址：</div>
                                                <span>{ currentAddress?.address || '-' }</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dm_confirm_order__bottom--info__list'>
                                        <div className='dm_confirm_order__bottom--info__list--item'>
                                            <div>商品件数：</div>
                                            <span>共 { buyTotalNum || 0 } 件</span>
                                        </div>
                                        <div className='dm_confirm_order__bottom--info__list--item'>
                                            <div>合计：</div>
                                            <span>￥{ totalPrice?.toFixed?.(2) || 0.00 }</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='dm_confirm_order__bottom--btn'>
                                    <ul>
                                        <li>
                                            共
                                            <div>{ buyTotalNum || 0 }</div>
                                            件
                                        </li>
                                        <li>
                                            <p>合计:</p>
                                            <div>
                                                <span>￥</span>
                                                <i>{ totalPrice?.toFixed?.(2) || 0.00 }</i>
                                            </div>
                                        </li>
                                    </ul>
                                    <div onClick={ this.onCreateOrderClick }>生成订单</div>
                                </div>
                            </div>
                        );
                    }}
                />

                {/* 收货地址弹窗 - 组件 */}
                {
                    isAddressModal ? (
                        <AddressModal 
                            visible={ isAddressModal }
                            formData={ null }
                            onOk={(values, callBack) => {
                                store.userCenterStore.addAddressServiceFn(values, () => {
                                    callBack?.();
                                    store.confirmOrderStore.selectAddressListServiceFn((addressId) => {
                                        this.formRef.current.setFieldsValue({ addressId });
                                    });
                                });
                            }}
                            onCancel={() => {
                                store.userCenterStore.onToggleAddressModalClick(false);
                            }}
                        />
                    ) : null
                }
            </div>
        );
    }

    /**
     * 生成订单 - 操作
     */
    onCreateOrderClick = () => {
        const { 
            orderAddServiceFn, currentAddress,
            goodsDataSource,
        } = store?.confirmOrderStore || {};
        this.formRef.current.validateFields().then(values => {
            if(!values || !Object.keys(values).length) return;

            const orderInfos = goodsDataSource.map(item => ({
                pid: item?.pid,
                num: item?.num,
                price: item?.goodsInfo.price,
                totalprice: item?.totalprice,
            }));
    
            orderAddServiceFn?.({
                addressId: currentAddress?.id,
                orderInfos,
            });
        }).catch(err => {
            message.error("请选择收货地址!");
        });
    }

}

export default ConfirmOrder;