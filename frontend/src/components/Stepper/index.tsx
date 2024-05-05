import { CustomSteps } from './stepper.styled';

interface IStepperProps {
    data: Record<string, string | React.ReactNode>[];
    currentStep: number
}

export function Stepper(props: IStepperProps) {
    const { data, currentStep = 2, ...rest } = props;
    const items = data?.map((element: any, index: number) => ({
        title: element?.heading,
        description: element?.data
    }));
    return <CustomSteps direction='vertical' size='small' current={currentStep} items={items} {...rest} />;
}
