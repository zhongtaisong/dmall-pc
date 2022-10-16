import React from 'react';
import { Comment, Avatar, Empty, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 商品评价
 */
@observer
class CommodityEvaluation extends React.PureComponent<any, any> {
    render() {
        const { evaluationList } = store?.goodsDetailStore || {};
        if(!Array.isArray(evaluationList) || !evaluationList.length) {
            return (
                <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='暂无评价' />
            );
        }

        return (
            <div className='commodity_evaluation'>
                {
                    evaluationList.map(item => {
                        return (
                            <Comment
                                key={ item?.id }
                                className="commodity_evaluation__comment"
                                author={ item?.uname }
                                avatar={ 
                                    <Avatar 
                                        style={{ backgroundColor: 'var(--dm-main-color)' }} 
                                        src={ item?.avatar }
                                        icon={<UserOutlined />} 
                                        alt="头像"
                                    /> 
                                }
                                content={ <div className='commodity_evaluation__comment--content'>{ item.content }</div> }
                                datetime={ item?.commentTime }
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default CommodityEvaluation;