import styled from '@emotion/styled';
import PhoneInput from 'react-phone-input-2';

export const CustomPhoneStyle = styled(({ screen, ...other }: any) => <PhoneInput {...other} />)`
    .form-control {
        width: 100% !important;
        height: 54px;
        border-radius: 4px;
        font-size: 16px;
        transition: all ease-in;
        border-color: darkgray;
    }

    .flag-dropdown {
        width: 50px;
        background: transparent;
        border-right: none;
        border-color: darkgray;
    }

    .selected-flag {
        font-size: 60px;
    }
`;
