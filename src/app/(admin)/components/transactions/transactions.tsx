import Image from 'next/image';

const Transactions = () => {
    return (
        <div className='bg-bgAdmin-soft p-5 rounded-lg'>
            <h2 className='mb-5 text-lg font-light text-soft'>
                Latest Transactions
            </h2>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='py-2 px-4 text-left'>Name</th>
                        <th className='py-2 px-4 text-left'>Status</th>
                        <th className='py-2 px-4 text-left'>Date</th>
                        <th className='py-2 px-4 text-left'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        {
                            status: 'Pending',
                            date: '14.02.2024',
                            amount: '$3.200'
                        },
                        {
                            status: 'Done',
                            date: '14.02.2024',
                            amount: '$3.200'
                        },
                        {
                            status: 'Cancelled',
                            date: '14.02.2024',
                            amount: '$3.200'
                        },
                        {
                            status: 'Pending',
                            date: '14.02.2024',
                            amount: '$3.200'
                        }
                    ].map((transaction, index) => (
                        <tr key={index}>
                            <td className='py-2 px-4'>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src='/astronaut.png'
                                        alt=''
                                        width={40}
                                        height={40}
                                        className='object-cover rounded-full'
                                    />
                                    <span>John Doe</span>
                                </div>
                            </td>
                            <td className='py-2 px-4'>
                                <span
                                    className={`rounded-md p-2 text-white text-sm ${
                                        transaction.status === 'Pending'
                                            ? 'bg-yellow-400'
                                            : transaction.status === 'Done'
                                              ? 'bg-blue-300'
                                              : 'bg-red-300'
                                    }`}
                                >
                                    {transaction.status}
                                </span>
                            </td>
                            <td className='py-2 px-4'>{transaction.date}</td>
                            <td className='py-2 px-4'>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
