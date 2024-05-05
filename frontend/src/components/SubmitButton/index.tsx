import { Button, Form, type FormInstance } from 'antd';
import React from 'react';

interface SubmitButtonProps {
    form: FormInstance;
}

export const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button
            disabled={!submittable}
            htmlType='submit'
            className='text-md tracking-wider font-semibold h-auto px-4 py-2 mt-12 bg-primary text-white'
        >
            {children}
        </Button>
    );
};
