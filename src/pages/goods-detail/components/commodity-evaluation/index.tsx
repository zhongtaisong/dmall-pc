import React, { createElement } from 'react';
import { Comment, Avatar, Empty, Tooltip, } from 'antd';
import { observer } from 'mobx-react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import lodash from 'lodash';
// 设置
import { PUBLIC_URL } from '@config';
// mobx数据
import store from '@store';
// less样式
import './index.less';

interface IComponentState {
    /**
     * 当前操作，赞、踩
     */
    actionKeyMap: {
        [key: string]: "liked" | "disliked";
    };
}

/**
 * 商品评价
 */
@observer
class CommodityEvaluation extends React.PureComponent<any, IComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            actionKeyMap: {},
        };
    }

    render() {
        const { evaluationList } = store?.goodsDetailStore || {};
        const { actionKeyMap } = this.state;
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
                                actions={[
                                    <Tooltip 
                                        key="agree"
                                        className="commodity_evaluation__comment--action"
                                        title="赞"
                                    >
                                        <span onClick={() => this.onActionClick(item?.id, 'liked')}>
                                            { createElement(actionKeyMap[item?.id] === 'liked' ? LikeFilled : LikeOutlined) }
                                            <span className="commodity_evaluation__comment--action__number">{ item?.agree || 0 }</span>
                                        </span>
                                    </Tooltip>,
                                    <div 
                                        key="disagree"
                                        className="commodity_evaluation__comment--action"
                                        title="踩"
                                    >
                                        <span onClick={() => this.onActionClick(item?.id, 'disliked')}>
                                            { createElement(actionKeyMap[item?.id] === 'disliked' ? DislikeFilled : DislikeOutlined) }
                                            <span className="commodity_evaluation__comment--action__number">{ item?.disagree || 0 }</span>
                                        </span>
                                    </div>
                                ]}
                                author={ item?.uname }
                                avatar={ <Avatar src={ `${ PUBLIC_URL }${ item?.avatar }` } alt="用户头像" /> }
                                content={ <div className='commodity_evaluation__comment--content'>{ item.content }</div> }
                                datetime={ item?.commentTime }
                            />
                        );
                    })
                }
            </div>
        );
    }

    /**
     * 点赞、踩 - 操作
     * @param id 
     * @param key 
     */
    onActionClick = (id, key) => {
        let { actionKeyMap } = this.state;
        actionKeyMap = lodash.cloneDeep(actionKeyMap);
        const actionKeyMapItem = actionKeyMap[id];
        if(key === actionKeyMapItem) {
            delete actionKeyMap[id];
        }else {
            actionKeyMap[id] = key;
        }

        this.setState({ actionKeyMap, });
    }
}

export default CommodityEvaluation;