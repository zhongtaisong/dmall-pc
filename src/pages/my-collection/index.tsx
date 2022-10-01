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
 * 我的收藏
 */
@observer
class MyCollection extends React.PureComponent<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            cartId: []
        };
    }

    componentDidMount() {
        store.myCollectionStore.goodsCollectionSelectServiceFn();
    }

    render() {
        const { dataSource } = store?.myCollectionStore || {};
        
        return (
            <div className='common_width dm_MyCollection'>
                <div className='dm_MyCollection__title'>
                    <span>我的收藏</span>
                    <div>( 共有 <i>{ dataSource?.length || 0 }</i> 笔藏品 )</div>
                </div>

                <Table 
                    columns={ columns } 
                    dataSource={ dataSource } 
                    pagination={ false }
                    footer={ this.footer }
                    bordered
                    rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys) => store.myCollectionStore.onRowSelectionChange(selectedRowKeys),
                    }} 
                    scroll={{ x: '100%', y: 380 }}
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
        const { selectedRowKeys } = store?.myCollectionStore || {};
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button onClick={ this.onDeleteClick }>批量删除</Button>
                    <Button onClick={ this.onAddShoppingCartClick }>批量加入购物车</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ selectedRowKeys?.length ?? 0 }</i>件商品</span>
                </Col>
            </Row>
        );
    }

    /**
     * 批量删除 - 操作
     */
    onDeleteClick = () => {
        const { selectedRowKeys } = store?.myCollectionStore || {};
        if(!Array.isArray(selectedRowKeys) || !selectedRowKeys.length) {
            return message.warning('请选择需要删除的商品!');
        }

        store.myCollectionStore.goodsCollectionDeleteServiceFn(selectedRowKeys);
    }

    /**
     * 批量加入购物车 - 操作
     */
    onAddShoppingCartClick = () => {
        const { selectedRowKeys } = store?.myCollectionStore || {};
        if(!Array.isArray(selectedRowKeys) || !selectedRowKeys.length) {
            return message.warning('请选择需要加入购物车的商品!');
        }

        const goodsInfo = selectedRowKeys.reduce((res, item) => {
            res.push({ pid: item, num: 1, });
            return res;
        }, []);
        store.myCollectionStore.shoppingCartAddServiceFn(goodsInfo);
    }

}

export default MyCollection;