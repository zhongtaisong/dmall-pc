import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Col, message, Button } from 'antd';
// 各种表头
import { columns } from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 我的购物车
 */
@observer
class MyShoppingCart extends React.PureComponent<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            cartId: [],
            pidArr: []
        };
    }

    componentDidMount() {
        store.shoppingCartStore.shoppingCartSelectServiceFn();        
    }

    // 结算
    handleGoPay = () => {
        // const { selectedRows, pidArr } = this.state;
        // if( selectedRows.length ){
        //     this.props.history.push({
        //         pathname: '/views/goods/cart/settlement',
        //         state: {
        //             id: pidArr,
        //             type: 'cart'
        //         }
        //     });
        // }else{
        //     message.warning('请选择需要结算的商品！');
        // }
    }

    render() {
        const { dataSource, totalNum, } = store?.shoppingCartStore || {};
        
        return (
            <div className='common_width dm_MyShoppingCart'>
                <div className='dm_MyShoppingCart__title'>
                    <span>我的购物车</span>
                    <div>( 当前购物车共有 <i>{ totalNum }</i> 件商品 )</div>
                </div>
                <Table 
                    columns={ columns } 
                    dataSource={ dataSource } 
                    pagination={ false }
                    footer={ this.footer }
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                            store.shoppingCartStore.onRowSelectionChange(selectedRowKeys, selectedRows);
                        },
                    }}
                    rowKey={record => record?.goodsInfo?.id}
                />
            </div>
        );
    }

    /**
     * 表格底部按钮
     * @returns 
     */
    footer = () => {
        const { selectedRowKeys, buyTotalPrice, } = store?.shoppingCartStore || {};

        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button onClick={ this.onDeleteClick }>批量删除</Button>
                    <Button onClick={ this.onCollectionClick }>批量加入收藏</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ selectedRowKeys.length }</i>件商品</span>
                    <div>
                        总价：<span>¥{ buyTotalPrice?.toFixed?.(2) || 0.00 }</span>
                    </div>
                    <span className='go-pay' onClick={ this.handleGoPay }>去结算</span>
                </Col>
            </Row>
        );
    }

    /**
     * 批量删除 - 操作
     */
    onDeleteClick = () => {
        const { selectedRowKeys } = store?.shoppingCartStore || {};
        if(!Array.isArray(selectedRowKeys) || !selectedRowKeys.length) {
            return message.warning('请选择需要删除的商品!');
        }

        store.shoppingCartStore.shoppingCartDeleteServiceFn(selectedRowKeys);
    }

    /**
     * 批量加入收藏 - 操作
     */
    onCollectionClick = () => {
        const { selectedRowKeys } = store?.shoppingCartStore || {};
        if(!Array.isArray(selectedRowKeys) || !selectedRowKeys.length) {
            return message.warning('请选择需要加入收藏的商品!');
        }

        store.shoppingCartStore.goodsCollectionAddServiceFn(selectedRowKeys);
    }

}

export default MyShoppingCart;