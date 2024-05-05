import styled from '@emotion/styled';

export const CustomHeading = styled(({ screen, ...other }: any) => (
    <div {...other} />
))`
    &.ant-steps-item-title {
        width: 100%;
    }
`;
