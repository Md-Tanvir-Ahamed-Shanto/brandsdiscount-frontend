import { RecentlyViewedSlider } from '../shop/components';
import { Featured, HeroImage } from './components';

const Home = () => {
    return (
        <>
            <HeroImage />
            <Featured />
            <RecentlyViewedSlider />
        </>
    );
};

export default Home;
