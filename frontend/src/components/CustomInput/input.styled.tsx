import styled from '@emotion/styled';
import { Input } from 'antd';

export const StyledInput = styled(({ screen, ...other }: any) => <Input {...other} />)`
    height: 54px;
    border-radius: 4px;
    font-size: 16px;
    transition: all ease-in;

    :hover {
        border: 1px solid #7c7c7c;
    }

    :focus {
        box-shadow: none;
    }
`;
