import React from 'react';
import { Result } from 'antd';
// less样式
import './index.less';

/**
 * 401、402、403、404等页面
 */
export default class ResultPages extends React.PureComponent<any, any> {
    render() {
        return (
            <Result
                className='dm_ResultPages'
                status='404'
                title='404'
                subTitle='页面不存在'
                {...this.props}
            />
        );
    }
};
