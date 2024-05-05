import { CustomHeading } from './heading.styled';

export function Heading({ text }: { text: string }) {
    return (
        <>
            <CustomHeading className='bg-primary px-4 py-2 rounded-md w-full text-white text-xl'>
                {text}
            </CustomHeading>
        </>
    );
}
