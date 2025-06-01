import { RecentlyViewedSlider } from '../shop/components';
import { HeroImage } from './components';
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
