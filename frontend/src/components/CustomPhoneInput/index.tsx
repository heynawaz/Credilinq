import 'react-phone-input-2/lib/style.css';
import { CustomPhoneStyle } from './customPhoneInput.styled';

export function CustomPhoneInput({ onChange, disabled, required }: any) {
    return (
        <>
            <CustomPhoneStyle
                disabled={disabled}
                inputProps={{
                    name: 'phone',
                    required: true
                }}
                country={'sg'}
                countryCodeEditable={false}
                onlyCountries={['sg']}
                onChange={onChange}
            />
            {required && <div className="ant-form-item-explain-error">Mobile is required.</div>}
        </>
    );
}
