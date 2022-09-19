import React from 'react';
import { Table, Button } from 'antd';
import { observer } from 'mobx-react';
// 收货地址弹窗 - 组件
import AddressModal from './components/address-modal';
// 表头
import columns from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 收货地址
 */
@observer
class EditableTable extends React.PureComponent<any, any> {
    render() {
        const { dataSource, isAddressModal, } = store?.userCenterStore || {};
        
        return (
            <div className='dm_ReceivingAddress'>
                <div className='dm_ReceivingAddress__btn'>
                    <Button type="primary"                         
                        onClick={() => store.userCenterStore.onToggleAddressModalClick(true)}
                    >添加收货地址</Button>
                </div>

                <div className='dm_ReceivingAddress__table'>
                    <Table
                        columns={ columns() }
                        dataSource={ dataSource }
                        bordered
                        rowKey="id"
                        pagination={ false }
                        size='middle'
                    />
                </div>

                {/* 收货地址弹窗 - 组件 */}
                {
                    isAddressModal ? (
                        <AddressModal />
                    ) : null
                }
            </div>
        );
    }
}

export default EditableTable;