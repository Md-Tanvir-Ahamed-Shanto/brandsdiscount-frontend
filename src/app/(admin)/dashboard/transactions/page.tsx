import Image from 'next/image';
import Pagination from '../../components/pagination/pagination';

interface Transaction {
    name: string;
    status: 'Pending' | 'Done' | 'Cancelled';
    date: string;
    amount: string;
}

const transactions: Transaction[] = [
    {
        name: 'John Doe',
        status: 'Pending',
        date: '14.02.2024',
        amount: '$3,200'
    },
    {
        name: 'Jane Smith',
        status: 'Done',
        date: '13.02.2024',
        amount: '$1,500'
    },
    {
        name: 'Alice Brown',
        status: 'Cancelled',
        date: '12.02.2024',
        amount: '$4,750'
    },
    {
        name: 'Charlie Johnson',
        status: 'Pending',
        date: '11.02.2024',
        amount: '$2,300'
    }
];

const Transactions = () => {
    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg shadow-md'>
            <h2 className='mb-5 text-lg font-light text-bgAdminText'>
                Latest Transactions
            </h2>
            <table className='w-full border-collapse'>
                <thead>
                    <tr>
                        <th className='py-3 px-4 text-left font-medium'>
                            Name
                        </th>
                        <th
                            className='
                            py-3
                            px-4
                            text-left
                            font-medium'
                        >
                            Status
                        </th>
                        <th className='py-3 px-4 text-left font-medium'>
                            Date
                        </th>
                        <th className='py-3 px-4 text-left font-medium'>
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className='border-t border-gray-300'>
                            <td className='py-3 px-4'>
                                <div className='flex items-center gap-3'>
                                    <Image
                                        src='/astronaut.png'
                                        alt={transaction.name}
                                        width={40}
                                        height={40}
                                        className='object-cover rounded-full'
                                    />
                                    <span>{transaction.name}</span>
                                </div>
                            </td>
                            <td className='py-3 px-4'>
                                <span
                                    className={`rounded-md px-3 py-1 text-white text-sm font-medium 
                  ${
                      transaction.status === 'Pending'
                          ? 'bg-yellow-500 bg-opacity-75'
                          : transaction.status === 'Done'
                            ? 'bg-blue-500 bg-opacity-75'
                            : 'bg-red-500 bg-opacity-75'
                  }`}
                                >
                                    {transaction.status}
                                </span>
                            </td>
                            <td className='py-3 px-4'>{transaction.date}</td>
                            <td className='py-3 px-4 font-semibold'>
                                {transaction.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={transactions.length} />
        </div>
    );
};

export default Transactions;
