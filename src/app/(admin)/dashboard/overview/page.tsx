import Transactions from '../../components/transactions/transactions';
import Chart from '../../components/chart/chart';
import Card from '../../components/card/card';

const OverView = () => {
    const cards = [
        {
            id: 1,
            title: 'Total Users',
            number: 10.928,
            change: 12
        },
        {
            id: 2,
            title: 'Total Product',
            number: 8.236,
            change: -2
        },
        {
            id: 3,
            title: 'Total Order',
            number: 6.642,
            change: 18
        },
        {
            id: 3,
            title: 'Total Transactions',
            number: 6.642,
            change: 18
        }
    ];
    return (
        <div className='flex gap-5 m-5'>
            {/* Main Content */}
            <div className='flex-3 flex flex-col gap-5'>
                <div className='flex gap-5 justify-between'>
                    {cards.map((item) => (
                        <Card item={item} key={item.id} />
                    ))}
                </div>
                <Transactions />
                <Chart />
            </div>
        </div>
    );
};

export default OverView;
