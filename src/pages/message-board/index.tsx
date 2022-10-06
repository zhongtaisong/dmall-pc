import React from 'react';
import { Comment, Avatar, Button, Input, List, Form } from 'antd';
import { observer } from 'mobx-react';
import { FormInstance } from 'antd/es/form';
import { isLogin } from '@utils/common-fn';
// 全局设置
import { PUBLIC_URL } from '@config';
// mobx数据
import store from '@store';
// less样式
import './index.less';

/**
 * 留言板
 */
@observer
class MessageBoard extends React.PureComponent<any, {
    /**
     * 赞、踩
     */
    actionInfo: {
        [key: string]: {
            type?: 'agree' | 'disagree',
            num?: number;
        };
    };
}> {

    formRef = React.createRef<FormInstance>();

    constructor(props) {
        super(props);
        this.state = {
            actionInfo: {},
        };
    }

    componentDidMount() {
        store.messageBoardStore.messageBoardSelectServiceFn();
    }

    render() {
        const { messageBoardList } = store?.messageBoardStore || {};
        const { actionInfo, } = this.state;
        
        return (
            <div className='common_width dm_message_board'>
                <List
                    dataSource={ messageBoardList }
                    header={ `${messageBoardList.length}条留言` }
                    itemLayout="horizontal"
                    renderItem={props => {
                        const actionItem = actionInfo[props?.id] || {};

                        return (
                            <Comment 
                                author={ props.uname }
                                avatar={ <Avatar src={ props?.avatar ? `${ PUBLIC_URL }${ props?.avatar }` : null } alt="头像" /> }
                                content={ props?.content  }
                                datetime={ props?.create_time }
                            />
                        );
                    }}
                />

                {
                    isLogin() ? (
                        <Comment
                            content={
                                <Form 
                                    ref={ this.formRef }
                                    onFinish={ this.onFinish }
                                >
                                    <Form.Item
                                        name="content"
                                        rules={[
                                            {
                                                required: true, 
                                                whitespace: true,
                                                message: '请输入留言',
                                            },
                                            {
                                                type: "string",
                                                max: 300, 
                                                message: '留言内容限制在300个字内',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={ 4 } showCount maxLength={ 300 } />
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: 'right', }}>
                                        <Button htmlType="submit" type="primary">发表留言</Button>
                                    </Form.Item>
                                </Form>
                            }
                        />
                    ) : null
                }
            </div>
        );
    }

    /**
     * 发表留言 - 操作
     * @param values 
     */
    onFinish = (values) => {
        store.messageBoardStore.messageBoardAddServiceFn(values, () => {
            this.formRef.current?.resetFields?.();
        });
    }

}

export default MessageBoard;