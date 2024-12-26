import { Upload, Image, Space } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { SERVICE_URL } from '@config';
import { getUserInfo } from '@utils/common-fn';
import { withTranslation } from 'react-i18next';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IDmUploadProps extends UploadProps {
  isForm?: boolean;
}

function DmUpload(
  props: IDmUploadProps & {
    t: (text: string) => string;
  },
) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(props?.fileList || []);
  const { maxCount = Infinity, isForm = true, action, ...restProps } = props;
  const { token } = getUserInfo() || {};
  const { t } = props;

  useEffect(() => {
    setFileList(props?.fileList || []);
  }, [props]);

  return (
    <>
      <Upload
        listType='picture-card'
        action={`${SERVICE_URL}${action}`}
        accept='.png, .jpg, .jpeg'
        headers={{
          Authorization: `Bearer ${token}`,
        }}
        {...restProps}
        onPreview={async (file: UploadFile) => {
          if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
          }

          setPreviewImage(file.url || (file.preview as string));
          setPreviewOpen(true);
        }}
        onChange={(info) => {
          if (!info || !Object.keys(info).length) return;

          const { file, fileList } = info;
          if (isForm) {
            props?.onChange?.(fileList as any);
          }

          if (file?.status === 'uploading') return;

          setFileList(fileList);
        }}
      >
        {fileList.length >= maxCount ? null : (
          <Space direction='vertical' size={0}>
            <PlusOutlined />
            <div>{t(`上传`)}</div>
          </Space>
        )}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => {
              setPreviewOpen(visible);

              if (!visible) {
                setPreviewImage('');
              }
            },
          }}
          src={previewImage}
        />
      )}
    </>
  );
}

export default withTranslation()(DmUpload);
