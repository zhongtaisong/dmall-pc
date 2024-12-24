import React from 'react';
import { Result } from 'antd';
// less样式
import './index.less';
import { withTranslation } from 'react-i18next';

/**
 * 401、402、403、404等页面
 */
class ResultPages extends React.PureComponent<any, any> {
  render() {
    const { t } = this.props;

    return (
      <Result
        className='dm_ResultPages'
        status='404'
        title='404'
        subTitle={t(`页面不存在`)}
        {...this.props}
      />
    );
  }
}

export default withTranslation()(ResultPages);
