import * as React from 'react';
import { Popover, ConfigProvider, Avatar, Dropdown, Menu, Space } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { SketchPicker } from 'react-color';
import { commonFn } from '@utils';
import { MENU_LIST } from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';
import { LANGUAGE_LIST } from '@config';
import { setItem } from '@analytics/storage-utils';
import { cache } from '@utils/cache';
import _ from 'lodash';
import { dmI18n, getCurrentLanguageInfoFn } from '@i18n/index';
import { eventBus } from '@utils/event-bus';
import { withTranslation } from 'react-i18next';

/**
 * 顶部菜单
 */
@observer
class TopMenu extends React.PureComponent<
  Partial<
    RouteComponentProps & {
      t: (key: string) => string;
    }
  >,
  {
    /**
     * 是否展示登录、注册
     */
    isLoginAndRegister: boolean;
    languageInfo: IObject;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      isLoginAndRegister: !commonFn?.isLogin?.(),
      languageInfo: getCurrentLanguageInfoFn(),
    };
  }

  render() {
    const { nickname, phone, avatar, role } = commonFn?.getUserInfo?.() || {};
    const { isLoginAndRegister, languageInfo } = this.state;
    const { t } = this.props;
    let { welcomeObjectName } = store?.headerBarStore || {};
    welcomeObjectName = welcomeObjectName || nickname || phone || t(`朋友`);

    let menuItems_new = _.cloneDeep(MENU_LIST);
    if (role !== '0') {
      menuItems_new = menuItems_new.filter(
        (item) => !['/i18n-page'].includes(item?.pathname),
      );
    }

    if (Array.isArray(menuItems_new) && menuItems_new?.length) {
      menuItems_new.forEach((item) => {
        if (item && Object.keys(item).length) {
          Object.assign(item, {
            name: t(item?.name),
          });
        }
      });
    }

    return (
      <div className='dm_topMenu' id='dm_topMenu'>
        <div className='common_width dm_topMenu__content'>
          <Space className='dm_topMenu__content--left' size={32}>
            <div className='dm_topMenu__content--left__info'>
              <Avatar
                style={{ backgroundColor: 'var(--dm-main-color)' }}
                src={avatar}
                icon={<UserOutlined />}
                size='small'
                alt='头像'
              />
              <div>
                {t(`欢迎您`)}，{welcomeObjectName}
              </div>
            </div>
          </Space>

          <div className='dm_topMenu__content--right'>
            {isLoginAndRegister ? (
              <>
                <span onClick={() => this.props.history.push('/login')}>
                  {t(`登录`)}
                </span>
                <span onClick={() => this.props.history.push('/register')}>
                  {t(`注册`)}
                </span>
              </>
            ) : (
              <span onClick={this.onLogoutClick}>{t(`退出登录`)}</span>
            )}

            {menuItems_new.map((item) => {
              return (
                <span
                  key={item?.pathname}
                  onClick={() => this.intoTargetPage(item)}
                >
                  {item.name}
                </span>
              );
            })}
            <Popover
              overlayClassName='dm_topMenu__popover'
              placement='bottom'
              content={
                <SketchPicker
                  presetColors={['#1890ff', '#25b864', '#ff6f00']}
                  color={`var(--dm-main-color)`}
                  onChange={this.onColorChange}
                />
              }
            >
              <div className='dm_topMenu__content--right__theme'>
                <div style={{ background: `var(--dm-main-color)` }} />
                <span>{t(`主题色`)}</span>
              </div>
            </Popover>

            <Dropdown
              className='dm_topMenu__content--right__language'
              overlay={
                <Menu
                  onClick={(info) => {
                    const key = info?.key;
                    if (!key || languageInfo?.key === key) return;

                    const languageInfo_new =
                      LANGUAGE_LIST?.find((item) => item?.key === key) || {};
                    setItem(cache.LANGUAGE_INFO, languageInfo_new);
                    dmI18n.changeLanguage(key);
                    this.setState({ languageInfo: languageInfo_new });
                    eventBus.emit('onLanguageChange', languageInfo_new);
                  }}
                >
                  {LANGUAGE_LIST.map((item) => {
                    return (
                      <Menu.Item
                        // @ts-ignore
                        key={item?.key}
                      >
                        {item?.label}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              }
              arrow
              placement='bottomRight'
            >
              <Space>
                <span>{languageInfo?.label}</span>

                <DownOutlined style={{ fontSize: 12 }} />
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 退出登录 - 操作
   */
  onLogoutClick = () => {
    store?.headerBarStore?.logoutServiceFn().then((result) => {
      if (!result) return;

      this.setState({ isLoginAndRegister: true });
      this.props.history.replace('/login');
    });
  };

  /**
   * 跳转到目标页面
   * @param obj 菜单Object
   */
  intoTargetPage = (obj: { name: string; pathname?: string }) => {
    if (!obj || !Object.keys(obj).length) return;
    const { pathname } = obj;
    const { history } = this.props;
    const isLogin = commonFn?.isLogin?.();

    if (!isLogin) {
      return history.push('/login');
    }

    return pathname && history.push(pathname);
  };

  /**
   * 监听 - 拾色器操作
   */
  onColorChange = ({ hex }) => {
    ConfigProvider.config({
      theme: {
        primaryColor: hex,
        errorColor: hex,
        warningColor: hex,
        successColor: hex,
        infoColor: hex,
      },
    });
  };
}

export default withTranslation()(TopMenu);
