import type { TableProps } from 'antd';
import { Table } from 'antd';
import { useState } from 'react';

interface DataType {
    companyUEN: string;
    companyName: string;
    fullName: string;
    position: string;
    email: string;
    confirmEmail: string;
    mobile: string;
    termsCheck: boolean;
}

export const CustomTable = (props: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { userDetails } = props

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'ID',
            render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Company UEN',
            dataIndex: 'companyUEN',
            key: 'companyUEN'
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName'
        },
        {
            title: 'Full Name',
            key: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'Position In Company',
            key: 'position',
            dataIndex: 'position'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        }
    ];

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return <Table columns={columns} dataSource={userDetails} onChange={handleChange} pagination={{ pageSize: pageSize }} className='w-[90%] shadow-md rounded-md' />
}
