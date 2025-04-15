/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { usePathname } from 'next/navigation';
import Search from '../search/search';
import withSuspense from '../suspense/withSuspense';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentTime, getFormattedDate, getWeatherCondition } from '@/lib';
const SuspendedSearch = withSuspense(Search);

const Navbar: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{
        lat: number | null;
        lon: number | null;
    }>({
        lat: null,
        lon: null
    });
    const pathname = usePathname();
    console.log(pathname);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });
                },
                () => {
                    setError('Unable to retrieve your location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (location.lat && location.lon) {
            const getWeather = async () => {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&temperature_unit=celsius`;

                try {
                    const response = await axios.get(url);
                    setWeather(response.data.current_weather);
                } catch (err) {
                    setError('Unable to fetch weather data');
                }
            };

            getWeather();
        }
    }, [location]);
    return (
        <div className='p-5 rounded-lg bg-bgAdmin-soft flex flex-col md:flex-row items-center justify-between overflow-hidden mx-5'>
            {/* Title */}
            {/* <div className='text-bgAdminText-soft font-bold capitalize'>
                {isNaN(Number(pathname.split('/').pop()))
                    ? pathname.split('/').pop()
                    : pathname.split('/').slice(-2, -1)[0] +
                      ' ' +
                      pathname.split('/').pop()}
            </div> */}
            <h1 className='text-lg font-light text-bgAdminText'>
                Brand Discount Dashboard
            </h1>

            {/* Menu */}
            <div className='flex items-center gap-5 pt-3 md:pt-0'>
                {/* Search Box */}
                {/* <div className='flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg'>
                    <SuspendedSearch placeholder='Search' />
                </div> */}
                <div className='hidden sm:flex gap-2.5 '>
                    <div
                        className='font-medium bg-white rounded px-3 py-2 flex items-center justify-center text-third-500 text-[#192133]'
                        suppressHydrationWarning
                    >
                        {getCurrentTime()}
                    </div>
                    <div>
                        <div
                            className='font-normal text-second-900'
                            suppressHydrationWarning
                        >
                            {getFormattedDate()}
                        </div>
                        <div className='font-semibold text-first-500'>
                            {getWeatherCondition(weather?.weathercode)},
                            {weather?.temperature.toFixed(0)}℃
                        </div>
                    </div>
                </div>

                {/* Icons */}
                {/* <div className='flex gap-5 text-white'>
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                    <MdPublic size={20} />
                </div> */}
            </div>
        </div>
    );
};

export default Navbar;
