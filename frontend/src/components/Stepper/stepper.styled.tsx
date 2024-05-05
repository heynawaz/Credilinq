import styled from '@emotion/styled';
import { Steps } from 'antd';

export const CustomSteps = styled(({ screen, ...other }: any) => <Steps {...other} />)`
    .ant-steps-item-title {
        width: 100%;
        padding: 0 !important;
    }

    .ant-steps-item-tail {
        margin-top: 62px !important;
        height: calc(100% - 85px) !important;
        background-color: darkgray;
    }

    .ant-steps-item-icon {
        margin-top: 11px !important;
        background-color: rgb(236, 0, 85) !important;
        border: none;
    }

    .ant-steps-icon {
        color: white;
    }

    .ant-steps-item-wait .ant-steps-item-icon {
        background-color: rgba(0, 0, 0, 0.38) !important;
        border: none;
        .ant-steps-icon {
            color: white ;
        }
    }

    .ant-steps-item-finish .ant-steps-item-icon {
        background-color: purple !important;
        color: white !important;

        .ant-steps-icon{
            color: white
        }
   }
`;
