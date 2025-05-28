import { RecentlyViewedSlider, TrendingSlider } from '../shop/components';
import { Featured, HeroImage } from './components';
import Categories from './components/Categories';

const Home = () => {
    return (
        <>
            <HeroImage />
            <Categories />
            <RecentlyViewedSlider />
        </>
    );
};

export default Home;
