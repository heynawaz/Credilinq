import { CloseCircleFilled, InboxOutlined } from '@ant-design/icons';
import { message, type UploadProps } from 'antd';
import { CustomDragger } from './customUpload.styled';

const fileUploadProps: UploadProps = {
    name: 'file',
    accept: '.pdf',
    maxCount: 6,
    multiple: true,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    beforeUpload(file) {
        if (file.type !== 'application/pdf') {
            message.error('You can only upload PDF files!');
            return false;
        }
    },
    onChange(info) {
        const { status, type } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(event: React.DragEvent) {
        const droppedFiles = event.dataTransfer.files;
        console.log('Dropped files', droppedFiles);

        if (event.type !== 'application/pdf') {
            message.error('You can only upload PDF files!');
            return false;
        }
    },
    showUploadList: {
        showRemoveIcon: true,
        removeIcon: <CloseCircleFilled />
    }
};

export function CustomUpload(props: any) {
    const { ...rest } = props;
    return (
        <CustomDragger {...fileUploadProps} {...rest}>
            <p className='ant-upload-drag-icon'>
                <InboxOutlined className='text-primary/80' />
            </p>
            <p className='ant-upload-hint text-[16px] !text-slate-400'>
                <span className='underline decoration-1 underline-offset-4'>Click to upload</span> or drag and drop Bank Statements
            </p>
        </CustomDragger>
    );
}
