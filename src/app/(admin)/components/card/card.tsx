import { MdSupervisedUserCircle } from 'react-icons/md';

type CardProps = {
    item: {
        title: string;
        number: number;
        change: number;
    };
};

const Card = ({ item }: CardProps) => {
    return (
        <div className='w-full p-5 rounded-lg bg-bgAdmin-soft flex gap-5 cursor-pointer hover:bg-[#2e374a]'>
            <MdSupervisedUserCircle size={24} />
            <div className='flex flex-col gap-5'>
                <span className='text-base font-bold'>{item.title}</span>
                <span className='text-2xl font-medium'>{item.number}</span>
                <span className='text-sm font-light'>
                    <span
                        className={
                            item.change > 0 ? 'text-lime-500' : 'text-red-500'
                        }
                    >
                        {item.change}%
                    </span>{' '}
                    {item.change > 0 ? 'more' : 'less'} than previous week
                </span>
            </div>
        </div>
    );
};

export default Card;
