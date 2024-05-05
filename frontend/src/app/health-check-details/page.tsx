'use client';
import { CustomTable } from '@/components';
import { useEffect, useState } from 'react';

export default function HealthCheckDetails(context: { params: { slug: string } }) {
    const { id }: any = context.params;
    const [userDetails, setUserDetails] = useState([])

    async function fetchDetailsById() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-details`, {
                method: 'GET'
            }).then(response => response.json())
            setUserDetails(response)
        } catch (err) {
            console.log("Error", err);
        }
    }

    useEffect(() => {
        fetchDetailsById()
    }, [id])

    return (
        <div className='flex justify-center mt-20'>
            <CustomTable userDetails={userDetails} />
        </div>
    );
}
