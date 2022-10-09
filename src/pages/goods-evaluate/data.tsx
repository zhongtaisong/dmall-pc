import React from 'react';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';

export default function columns({ onGoodsEvaluateClick, } : {
    /** 添加、修改评价 - 操作 */
    onGoodsEvaluateClick: Function;
}): any {
    const columns = [
        {
            title: '图片',
            dataIndex: 'mainPicture',
            key: 'mainPicture',
            align: 'center',
            width: '10%',
            render: (text) => <img style={{ width: '100%', }} src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
        },
        {
            title: '商品详情',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            width: '30%',
            render: (text, record) => {
                return (
                    <div 
                        className='dm_MyOrder__columns--description'
                        onClick={() => window.open(`/views/goods-detail/${ record?.pid }`)}
                    >
                        <span 
                            className='two_line_ellipsis'
                            style={{ 
                                color: 'var(--dm-main-color)',
                                cursor: 'pointer',
                            }}
                        >{ text }</span>
                        <span className='single_line_ellipsis'>规格：{ record?.spec }</span>
                    </div>
                );
            }
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '10%',
            render: (text) => `￥${ Number(text || 0)?.toFixed?.(2) || "0.00" }`,
        },
        {
            title: '数量',
            dataIndex: 'num',
            key: 'num',
            align: 'center',
            width: '10%',
            render: (text) => `x ${text}`
        },
        {
            title: '评价内容',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: '10%',
            render: (text, record) => {
                return (              
                    <div className='operation-btn'>
                        <span onClick={() => onGoodsEvaluateClick?.(record)}>
                            { !record?.content ? '添加' : '修改' }评价
                        </span>
                    </div>
                );
            }
        }
    ];

    columns.forEach(item => {
        if(!item.render) {
            item['render'] = (text) => text || '-';
        }
    })

    return columns;
};