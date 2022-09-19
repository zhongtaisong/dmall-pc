import React from 'react';
import { Popover, ConfigProvider } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
import { SketchPicker } from 'react-color';
import { commonFn } from '@utils';
import { isOpenPath } from '@utils/common-fn';
import { MENU_LIST } from './data';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 顶部菜单
 */
@observer
class TopMenu extends React.PureComponent<Partial<RouteComponentProps>, {
    /**
     * 是否展示登录、注册
     */
    isLoginAndRegister: boolean;
}> {

    constructor(props) {
        super(props);
        this.state = {
            isLoginAndRegister: !commonFn?.isLogin?.(),
        };
    }

    render() {
        const { pathname } = this.props.location;
        const { admin, nickName, uname } = commonFn?.getUserInfo?.() || {};
        const { isLoginAndRegister } = this.state;
        const left_value = nickName || uname;

        return (
            <div className='dm_topMenu'>
                <div className='common_width dm_topMenu__content'>
                    <div className='dm_topMenu__content--left'>
                        欢迎您{ left_value ? `，${ left_value }` : null }
                    </div>
                    { !pathname.includes('/views/admin') && (
                        <div className='dm_topMenu__content--right'>
                            {
                                isLoginAndRegister ? (
                                    <>
                                        <span onClick={() => this.props.history.push('/login')}>登录</span>
                                        <span onClick={() => this.props.history.push('/register')}>注册</span>
                                    </>
                                ) : (
                                    <span onClick={ this.onLogoutClick }>退出登录</span>
                                )
                            }
                            {
                                MENU_LIST.map(item => {
                                    if([6].includes(item.key)) {
                                        if(admin !== '1') {
                                            return null;
                                        }
                                    };

                                    return (
                                        <span key={ item.key }
                                            onClick={() => this.intoTargetPage(item)}
                                        >{ item.name }</span>
                                    );
                                })
                            }
                            <Popover
                                overlayClassName='dm_topMenu__popover'
                                placement="bottom"
                                content={
                                    <SketchPicker
                                        presetColors={['#1890ff', '#25b864', '#ff6f00']}
                                        color={ `var(--dm-main-color)` }
                                        onChange={ this.onColorChange }
                                    />
                                }
                            >
                                <div className='dm_topMenu__content--right__theme'>
                                    <div style={{ background: `var(--dm-main-color)`}} />
                                    <span>主题色</span>
                                </div>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    /**
     * 退出登录 - 操作
     */
    onLogoutClick = () => {
        store?.headerBarStore?.logoutServiceFn?.(() => {
            this.setState({ isLoginAndRegister: true }, () => {
                const isOpen = isOpenPath(this.props.location.pathname);
                if(!isOpen) {
                    this.props.history.replace('/login');
                }
            });
        });
    }

    /**
     * 跳转到目标页面
     * @param obj 菜单Object
     */
    intoTargetPage = (obj: {
        key: number;
        name: string;
        pathName?: string;
    }) => {
        if(!obj || !Object.keys(obj).length) return;
        const { pathName } = obj;
        const { history } = this.props;
        const isLogin = commonFn?.isLogin?.()

        if(!isLogin) {
            return history.push('/login');
        }

        return pathName && history.push(pathName);
    }

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

    }

}

export default TopMenu;