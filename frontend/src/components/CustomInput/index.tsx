import { cn } from '@/utils/cn';
import { StyledInput } from './input.styled';

interface IInputProps {
    placeholder: string;
    minLength?: number;
    maxLength?: number;
    className?: string;
    type?: string;
    disabled?: boolean;
}

export function CustomInput(props: IInputProps) {
    const { placeholder, className, minLength, maxLength, type, disabled, ...rest } = props;
    return (
        <>
            <StyledInput
                disabled={disabled}
                placeholder={placeholder}
                type={type}
                minLength={minLength}
                maxLength={maxLength}
                className={cn('focus:border-primary focus:border-2', className)}
                {...rest}
            />
        </>
    );
}
