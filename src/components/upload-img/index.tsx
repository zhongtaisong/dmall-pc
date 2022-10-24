import React from 'react';
import { Upload, message, Modal, } from 'antd';
import { LoadingOutlined, PlusOutlined, } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, } from 'antd/es/upload/interface';
import { fileToBase64 } from '@utils/common-fn';
import lodash from 'lodash';
import './index.less';

interface IComponentProps {
    /** 上传图片 - 回调函数 */
    onUploadCallBack?: Function;
    /** 限制上传数量 */
    maxCount: number;
    /** 图片列表 */
    fileList: Array<UploadFile>;
}

interface IComponentState {
    /** loading是否可见 */
    isLoading: boolean;
    /** 图片列表 */
    fileList: Array<UploadFile>;
    /** Modal是否可见 */
    isModal: boolean;
    /** 预览图片信息 */
    previewImageInfo: Partial<{
        /** 弹窗标题 */
        title: string;
        /** 预览图片url */
        url: string;
    }>;
}

/**
 * 上传图片
 */
export default class UploadImg extends React.PureComponent<Partial<IComponentProps>, IComponentState> {

    static defaultProps: Partial<IComponentProps> = {
        maxCount: 1,
    }

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            isLoading: false,
            fileList: props?.fileList || [],
            isModal: false,
            previewImageInfo: {},
        };
    }

    componentDidUpdate(prevProps: Readonly<Partial<IComponentProps>>): void {
        if(!lodash.isEqual(this.props.fileList, prevProps.fileList)) {
            this.setState({
                fileList: this.props.fileList,
            });
        }
    }

    render() {
        const { 
            isLoading, fileList, isModal, 
            previewImageInfo,
        } = this.state;
        const { maxCount, } = this.props;
        return (
            <>
                <Upload
                    className='dm_upload_img'
                    listType="picture-card"
                    accept="image/png, image/jpeg"
                    fileList={ fileList }
                    maxCount={ maxCount }
                    beforeUpload={ this.beforeUpload }
                    onPreview={ this.onUploadPreview }
                    onChange={ this.onUploadChange }
                >
                    {
                        fileList.length < maxCount ? (
                            <div className='dm_upload_img__plus'>
                                { isLoading ? <LoadingOutlined /> : <PlusOutlined /> }
                                <div className="dm_upload_img__plus--tip">点击上传</div>
                            </div>
                        ) : null
                    }
                </Upload>
                
                <Modal 
                    visible={ isModal } 
                    title={ previewImageInfo?.title }
                    footer={ null } 
                    onCancel={ this.onModalCancel }
                >
                    <img 
                        style={{ width: '100%' }} 
                        src={ previewImageInfo?.url } 
                        alt={ previewImageInfo?.title }
                    />
                </Modal>
            </>
        );
    }

    /**
     * 预览图片 - 操作
     * @param file 
     */
    onUploadPreview = async (file: UploadFile) => {
        if(file && !file?.url && !file?.preview) {
            file.preview = await fileToBase64(file?.originFileObj);
        }
      
        this.setState({
            isModal: true,
            previewImageInfo: {
                title: file?.name || file?.url?.substring?.(file?.url?.lastIndexOf?.('/') + 1),
                url: file?.url || file?.preview,
            },
        });
    }

    /**
     * 关闭Modal - 回调函数
     */
    onModalCancel = () => {
        this.setState({ isModal: false, });
    }

    /**
     * 监听 - upload变化
     * @param info 
     */
    onUploadChange = (info: UploadChangeParam<UploadFile>) => {
        if(!info || !Object.keys(info).length) return;

        const { file, } = info;
        const { fileList, } = this.state;
        const { onUploadCallBack, } = this.props;
        this.setState({ isLoading: true, });

        let fileList_new = [];
        if(file?.status === 'removed') {
            fileList_new = fileList.filter(item => item?.uid !== file?.uid) || [];
        }else {
            fileList_new = info?.fileList;
        }
        setTimeout(() => {
            this.setState({ 
                isLoading: false, 
                fileList: fileList_new,
            });
            onUploadCallBack?.(fileList_new);
        }, 1000);
    }

    /**
     * 上传之前 - 操作
     * @param file 
     * @returns 
     */
    beforeUpload = (file) => {
        const isLt2M = file?.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小必须小于2MB!');
            return false;
        }

        return false;
    };
};
