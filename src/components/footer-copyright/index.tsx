import React from 'react';
import { Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { FOOTER_MENU_LIST } from './data';
// less样式
import './index.less';

/**
 * 底部版权区域
 */
@observer
class FooterCopyright extends React.PureComponent<any, any> {
    render() {
        return (
            <div className='dm_FooterCopyright'>
                <Row className='common_width'>
                    {
                        FOOTER_MENU_LIST.map(item01 => {
                            return (
                                <Col 
                                    key={ item01.id }
                                    span={ 8 } 
                                >
                                    <i>{ item01.title }</i>
                                    {
                                        item01?.content?.map?.(item02 => {
                                            return (
                                                <a 
                                                    key={ item02.cid }
                                                    target='_blank' 
                                                    href={ item02.url } 
                                                    rel="noreferrer"
                                                >{ item02.name }</a>
                                            )
                                        })
                                    }
                                </Col>
                            );
                        })
                    }
                </Row>

                <ul className='dm_FooterCopyright__copyright'> 
                    <li>Copyright © 2019 - { new Date().getFullYear() } 闹钟太松了 版权所有</li>
                    <li>|</li>
                    <li>最近更新时间：{ this.getFormatDate() }</li>
                </ul>
            </div>
        );
    }

    /**
     * 获取 - 格式化日期
     */
    getFormatDate = () => {
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        return `${ y }-${ m < 10 ? `0${ m }` : m }-${ d }`;
    }
}

export default FooterCopyright;