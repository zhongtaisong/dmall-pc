import React from 'react';
import { observer } from 'mobx-react';
import { PUBLIC_URL } from '@config';
// 页面组件 - 数据
import pageState from '../../state';
// less样式
import './index.less';

const PARAMS_MAP = {
    productName: "商品名称",
    weight: "商品毛重",
    placeOfOrigin: "商品产地",
    systems: "系统",
    cpu: "处理器",
    thickness: "厚度",
    disk: "硬盘容量",
    standbyTime: "待机时长",
    series: "系列",
    bareWeight: "裸机重量",
    screenSize: "屏幕尺寸",
    gpu: "显卡型号",
    characteristic: "特性",
    memory: "内存容量",
    gpuCapacity: "显存容量",
    bodyMaterial: "机身材质",
};

/**
 * 商品信息 - 配置信息、商品介绍图片
 */
@observer
class GoodsInfo extends React.PureComponent<any, any> {
    render() {
        const { goodsInfo } = pageState;

        return (
            <div className='goods_detail_goods_info'>
                <ul className='goods_detail_goods_info__params'>
                    {
                        goodsInfo?.['brandName'] ? (
                            <li>
                                <span>品牌: </span>
                                { goodsInfo['brandName'] }
                            </li>
                        ) : null
                    }
                    {
                        Object.entries(PARAMS_MAP).map(([key, value]) => {
                            if(!goodsInfo?.[key]) return null;

                            return (
                                <li key={ key }>
                                    <span>{ value }: </span>
                                    { goodsInfo[key] }
                                </li>
                            );
                        })
                    }
                </ul>

                <ul className='goods_detail_goods_info__images'>
                    {
                        goodsInfo?.detailImgs?.map?.(item => {
                            if(!item) return null;
                            
                            return (
                                <li key={ item }>
                                    <img src={ `${ PUBLIC_URL }${ item }` } alt='商品介绍图片' /> 
                                </li>
                            );
                        })
                    }
                </ul>

            </div>
        );
    }
}

export default GoodsInfo;