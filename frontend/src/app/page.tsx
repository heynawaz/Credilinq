'use client';
import { CustomInput, CustomPhoneInput, CustomUpload, Footer, Header, Heading, Stepper } from '@/components';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Checkbox, CheckboxProps, Col, Form, message, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const router = useRouter();
    const [checked, setChecked] = useState<boolean | any>(false);
    const [fileList, setFileList] = useState([]);
    const [mobile, setMobile] = useState<string>('');
    const [mobileRequired, setMobileRequired] = useState(false)
    const [form] = Form.useForm();
    const currentStep = 1

    // const stepDisable: any = {
    //     "0": ['companyUEN', 'companyName'],
    //     "1": ['fullName', 'position', 'email', 'confirmEmail', 'mobile'],
    //     "2": ['fileList'],
    //     "3": ['termsCheck'],
    // }

    // const isStepDisabled = (step: number) => {
    //     return stepDisable[step].some((field: any) => !form.getFieldValue(field));
    // };

    const onChange: CheckboxProps['onChange'] = (e) => {
        setChecked(e.target.checked);
    };

    const onChangeUpload = ({ fileList: newFileList }: any) => {
        try {
            const filteredFileList = newFileList.filter((file: any) => {
                if (file.type === 'application/pdf') {
                    return true;
                } else {
                    message.error('You can only upload PDF files!');
                    return false;
                }
            });

            setFileList(filteredFileList);
        } catch (e) {
            console.log('Error', e);
        }
    };

    const validateEmails = ({ getFieldValue }: any) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue('email') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two emails that you entered do not match!');
        }
    });

    const onMobileChange = (e: string) => {
        setMobile(e);
    };

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append('companyName', values?.companyName);
            formData.append('companyUEN', values?.companyUEN);
            formData.append('confirmEmail', values?.confirmEmail);
            formData.append('email', values?.email);
            formData.append('mobile', mobile);
            formData.append('position', values?.position);
            formData.append('termsCheck', checked);
            formData.append('fullName', values?.fullName);

            fileList?.forEach((file: any) => {
                formData.append('files', file?.originFileObj);
            });

            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-details`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(() => router.push('/health-check-details'))
                .catch(() => message.error('Something went wrong!'));

        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('Something went wrong!');
        }
    };

    const data = [
        {
            heading: <Heading text='Company Information' />,
            data: (
                <div className='my-6'>
                    <Row gutter={[50, 0]}>
                        <Col span={12}>
                            <Form.Item
                                name='companyUEN'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Company UEN is required.'
                                    },
                                    {
                                        pattern: /^\S*$/,
                                        message: 'Whitespaces not allowed.'
                                    },
                                    {
                                        pattern: /^\d{8}[a-zA-Z]$/,
                                        min: 9,
                                        message: 'Please enter 8 digits followed by an alphabet only (eg: 23141543L).'
                                    }
                                ]}
                            >
                                <CustomInput placeholder='Enter your company UEN' minLength={9} maxLength={9} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='companyName'

                                rules={[
                                    {
                                        required: true,
                                        message: 'Company name is required.'
                                    },
                                    {
                                        pattern: /^[a-zA-Z\s]+$/,
                                        message: 'Invalid name.'
                                    }
                                ]}
                            >
                                <CustomInput placeholder='Enter your company name' />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            )
        },
        {
            heading: <Heading text='Applicant Information' />,
            data: (
                <div className='my-6'>
                    <Row gutter={[50, 0]}>
                        <Col span={12}>
                            <Form.Item
                                name='fullName'

                                rules={[
                                    {
                                        required: true,
                                        message: 'Full name is required.'
                                    },
                                    {
                                        pattern: /^[a-zA-Z\s]+$/,
                                        message: 'Invalid name.'
                                    }
                                ]}
                            >
                                <CustomInput placeholder='Enter your full name'
                                // disabled={isStepDisabled(1)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='position'

                                rules={[
                                    {
                                        required: true,
                                        message: 'Position within company is required.'
                                    }
                                ]}
                            >
                                <CustomInput placeholder='Enter your position within company'
                                // disabled={isStepDisabled(1)} 
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[50, 0]} className='mt-6'>
                        <Col span={12}>
                            <Form.Item
                                name='email'

                                extra={<p className='text-primary mt-1'>The report will be delivered on this email address</p>}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email is required.'
                                    },
                                    {
                                        pattern: /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,9})$/,
                                        message: 'Invalid email.'
                                    }
                                ]}
                            >
                                <CustomInput placeholder='Enter your email address' type='email'
                                //  disabled={isStepDisabled(1)} 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='confirmEmail'

                                rules={[
                                    {
                                        required: true,
                                        message: 'Verify email is required.'
                                    },
                                    validateEmails
                                ]}
                            >
                                <CustomInput placeholder='Re-enter your email address'
                                // disabled={isStepDisabled(1)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[50, 0]} className='mt-6'>
                        <Col span={12}>
                            <Form.Item name='mobile'>
                                <CustomPhoneInput
                                    onChange={onMobileChange}
                                    required={mobileRequired}
                                // disabled={isStepDisabled(1)} 
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            )
        },
        {
            heading: <Heading text='Upload Documents' />,
            data: (
                <div className='my-6'>
                    <Row gutter={[50, 0]}>
                        <Col span={12}>
                            <Form.Item name='multiFiles' valuePropName='fileList' getValueFromEvent={onChangeUpload} rules={[
                                {
                                    required: true,
                                    message: 'Document upload is required.'
                                }
                            ]}>
                                <CustomUpload fileList={fileList} setFileList={setFileList}
                                // disabled={isStepDisabled(2)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={2}>
                                    <CheckOutlined style={{ fontSize: '150%', marginTop: '6px' }} />
                                </Col>
                                <Col span={22}>
                                    <p className='text-[16px] text-[#00000099]'>
                                        PDFs (not scanned copies) of company&apos;s operating bank current account(s) statements for the past 6
                                        months. <br /> Example: If today is 01 May 24, then please upload bank statements from Nov 23 to Apr 24 (both
                                        months inclusive)
                                    </p>
                                </Col>
                            </Row>
                            <Row className='mt-[20px]'>
                                <Col span={2}>
                                    <CheckOutlined style={{ fontSize: '150%', marginTop: '6px' }} />
                                </Col>
                                <Col span={22}>
                                    <p className='text-[16px] text-[#00000099]'>
                                        If your company is multi-banked, then please upload 6 months bank statements for each bank account
                                    </p>
                                </Col>
                            </Row>
                            <Row className='mt-[20px]'>
                                <Col span={2}>
                                    <CheckOutlined style={{ fontSize: '150%', marginTop: '6px' }} />
                                </Col>
                                <Col span={22}>
                                    <p className='text-[16px] text-[#00000099]'>
                                        If your file is password protected, we request you to remove the password and upload the file to avoid
                                        submission failure
                                    </p>
                                </Col>
                            </Row>
                            <Row className='mt-[20px]'>
                                <Col span={2}>
                                    <CheckOutlined style={{ fontSize: '150%', marginTop: '6px' }} />
                                </Col>
                                <Col span={22}>
                                    <p className='text-[16px] text-[#00000099]'>
                                        In case if you are facing any issue while uploading bank statements, Please contact us on&nbsp;
                                        <Link href={'mailto:support@credilinq.ai'}>support@credilinq.ai</Link>
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        },
        {
            heading: <Heading text='Terms & Conditions' />,
            data: (
                <div className='my-6'>
                    <Form.Item valuePropName='checked' name='termsCheck' rules={[
                        {
                            required: true,
                            message: 'Accepting Terms & Conditions is required.'
                        }
                    ]}>
                        <Checkbox
                            checked={checked}
                            // disabled={isStepDisabled(3)}
                            onChange={onChange}
                            className={`text-[16px] ${checked ? 'text-black' : 'text-[#00000099]'}`}
                        >
                            By ticking, you are confirming that you have understood and are agreeing to the details mentioned:
                        </Checkbox>
                    </Form.Item>
                    <div className='px-4 mt-6'>
                        <Row className='mt-[18px]'>
                            <Col span={1}>
                                <CheckOutlined style={{ fontSize: '140%', marginTop: '3px' }} />
                            </Col>
                            <Col span={23} className='pl-2'>
                                <p className={`text-[16px] ${checked ? 'text-black' : 'text-[#00000099]'}`}>
                                    I confirm that I am the authorized person to upload bank statements on behalf of my company
                                </p>
                            </Col>
                        </Row>
                        <Row className='mt-[20px]'>
                            <Col span={1}>
                                <CheckOutlined style={{ fontSize: '140%', marginTop: '3px' }} />
                            </Col>
                            <Col span={23} className='pl-2'>
                                <p className={`text-[16px] ${checked ? 'text-black' : 'text-[#00000099]'}`}>
                                    I assure you that uploaded bank statements and provided company information match and are of the same company, if
                                    there is a mismatch then my report will not be generated
                                </p>
                            </Col>
                        </Row>
                        <Row className='mt-[20px]'>
                            <Col span={1}>
                                <CheckOutlined style={{ fontSize: '140%', marginTop: '3px' }} />
                            </Col>
                            <Col span={23} className='pl-2'>
                                <p className={`text-[16px] ${checked ? 'text-black' : 'text-[#00000099]'}`}>
                                    I understand that this is a general report based on the bank statements and Credilinq is not providing a solution
                                    or guiding me for my business growth
                                </p>
                            </Col>
                        </Row>
                        <Row className='mt-[20px]'>
                            <Col span={1}>
                                <CheckOutlined style={{ fontSize: '140%', marginTop: '3px' }} />
                            </Col>
                            <Col span={23} className='pl-2'>
                                <p className={`text-[16px] ${checked ? 'text-black' : 'text-[#00000099]'}`}>
                                    I have read and understand the &nbsp;
                                    <Link href={'https://smehealthcheck.credilinq.ai/terms-and-conditions'} target='_blank'>
                                        Terms & Conditions
                                    </Link>
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <Header />
            <div className='grid place-items-center'>
                <div className='w-[1150px] grid place-items-center bg-white shadow-xl py-14 px-8'>
                    <Form form={form} onFinish={onFinish}>
                        <Stepper data={data} currentStep={currentStep} />
                        <div className='w-full flex justify-end'>
                            <Form.Item>
                                <Button
                                    htmlType='submit'
                                    className='text-md tracking-wider font-semibold h-auto px-4 py-2 mt-12 bg-primary text-white'
                                >
                                    SUBMIT
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
}
