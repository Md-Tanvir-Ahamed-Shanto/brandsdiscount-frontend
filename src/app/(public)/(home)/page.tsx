import { TrendingSlider } from '../shop/components';
import { Featured, HeroImage } from './components';

const Home = () => {
    return (
        <>
            {/* <HeroSlider /> */}
            <HeroImage />
            <Featured />
            {/* <RecentlyView /> */}
            <div className='container'>
                <h3 className='font-bold text-2xl mb-8'>Trending Products</h3>
                <div className='mb-12'>
                    <TrendingSlider />
                </div>
            </div>
        </>
    );
};

export default Home;
