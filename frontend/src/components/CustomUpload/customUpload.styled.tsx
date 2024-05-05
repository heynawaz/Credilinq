import styled from '@emotion/styled';
import { Upload } from 'antd';
const { Dragger } = Upload;

export const CustomDragger = styled(({ screen, ...other }: any) => <Dragger {...other} />)`
    .ant-upload-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        row-gap: 3px;
        transition: all 0.3s ease-in;
    }

    .ant-upload-list::before {
        display: none !important;
    }

    .ant-upload-list-item-container {
        width: 240px !important;
    }

    .ant-upload,
    .ant-upload-drag {
        height: 156px !important;
    }

    .ant-upload-list-item-done {
        border: 1px solid green;
        border-radius: 50px;
        padding: 20px 10px;

        .ant-upload-list-item-name {
            color: green;
        }
    }

    .ant-upload-list-item-uploading {
        border: 1px solid lightblue;
        border-radius: 50px;
        padding: 20px 10px;
    }

    .ant-upload-list-item-error {
        border: 1px solid lightcoral;
        border-radius: 50px;
        padding: 20px 10px;
    }

    .ant-upload-list-item-container:has(.ant-upload-list-item-undefined) {
        display: none !important;
    }

    .ant-upload-icon {
        /* display: none; */
        margin-right: 10px;
    }

    .ant-upload-list-item-name {
        padding: 0 !important;
    }

    .ant-upload-list-item-progress {
        display: none;
    }
`;
