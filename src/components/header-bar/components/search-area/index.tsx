import React from 'react';
import { Row, Col, Input, Button, Badge } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import lodash from 'lodash';
import { MENU_LIST_01, MENU_LIST_02 } from './data';
// less样式
import './index.less';

/**
 * 搜索区域
 */
@observer
class SearchArea extends React.PureComponent<Partial<RouteComponentProps>, any> {
    render() {
        const { history, location } = this.props;
        const keyword = location.pathname.split("/")?.[3] || '';

        return (
            <>
                <div className='dm_SearchArea'>
                    <Row className='common_width dm_SearchArea__content'>
                        <Col span={ 4 } 
                            className='dm_SearchArea__content--logo' 
                            onClick={() => history.push("/")} 
                        >
                            <svg className="icon-font" aria-hidden="true">
                                <use xlinkHref="#icon-logo"></use>
                            </svg>
                        </Col>
                        <Col span={ 12 } className='dm_SearchArea__content--menu'>
                            {
                                !location.pathname.includes('/views/admin') ? (
                                    <>
                                        {
                                            MENU_LIST_01.map(item => {
                                                return (
                                                    <Link 
                                                        key={ item.key }
                                                        to={ item.pathname } 
                                                        className={ location?.pathname?.includes?.(item.pathname) ? 'active' : '' }
                                                    >{ item.name }</Link>
                                                );
                                            })
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            MENU_LIST_02.map(item => {
                                                // if(!adminObj?.[item.authKey]) return null;

                                                return (
                                                    <Link 
                                                        key={ item.key }
                                                        to={ item.pathname } 
                                                        className={ location?.pathname?.includes?.(item.pathname) ? 'active' : '' }
                                                    >{ item.name }</Link>
                                                );
                                            })
                                        }
                                    </>
                                )
                            }
                        </Col>
                        <Col span={ 8 } className='dm_SearchArea__content--search'>
                            {
                                !location.pathname.includes('/views/admin') ? (
                                    <>
                                        {
                                            location?.pathname?.includes?.("/goods-list") ? (
                                                <Input.Search 
                                                    className='dm_SearchArea__content--search__input'
                                                    placeholder="请输入关键字" 
                                                    enterButton 
                                                    defaultValue={ keyword }
                                                    onSearch={ this.getSearchKws } 
                                                />
                                            ) : null
                                        }
                                        <Badge count={ 0 } overflowCount={ 99 }>
                                            <Button 
                                                icon={ <ShoppingCartOutlined style={{ fontSize: 15 }} /> } 
                                                type="primary" 
                                                className='dm_SearchArea__content--search__cart'
                                                onClick={ this.goShopCartFn }
                                            >购物车</Button>
                                        </Badge>
                                    </>
                                ) : ''
                            }
                        </Col>
                    </Row>
                </div>
            </>
        );
    }

    /**
     * 获取搜索关键字
     * @param value 关键字
     * @returns 
     */
    getSearchKws = lodash.debounce((value: string) => {
        this.props.history.push(`/views/goods-list/${ value?.trim?.() }`);
    }, 360);

    /**
     * 进入 - 购物车页面
     */
    goShopCartFn = () => {
        const { history } = this.props;
        const isAuth = true;
        let pathname = "/views/cart";
        if(!isAuth) {
            pathname = "/login";
        }
        history.push(pathname);
    }
}

export default SearchArea;