import {
    LucideProps,
    Moon,
    SunMedium,
    ShoppingBag,
    Menu,
    ChevronRight,
    SlidersHorizontal,
    Maximize2,
    ChevronUp
} from 'lucide-react';

export const Icons = {
    Moon,
    SunMedium,
    ShoppingBag,
    Menu,
    ChevronRight,
    SlidersHorizontal,
    Maximize2,
    ChevronUp,
    EmptyBox: (props: LucideProps) => (
        <svg
            {...props}
            viewBox='0 0 1024 1024'
            width='17'
            height='20'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M743.68 176.61952h-448l-220.16 240.52736v345.6c0 56.54528 45.85472 102.4 102.4 102.4h683.52c56.54528 0 102.4-45.85472 102.4-102.4v-345.6l-220.16-240.52736z m-416.43008 71.68h384.8704l176.52736 192.8704h-193.87392c0 0.28672 0.04096 0.57344 0.04096 0.84992 0 94.57664-76.94336 171.52-171.52 171.52-94.5664 0-171.52-76.94336-171.52-171.52 0-0.27648 0.04096-0.5632 0.0512-0.84992h-201.12384l176.54784-192.8704z m534.19008 545.16736h-683.52c-16.93696 0-30.72-13.78304-30.72-30.72v-249.89696h143.4112c30.33088 99.75808 123.02336 172.36992 232.69376 172.36992 109.68064 0 202.36288-72.61184 232.69376-172.36992h136.17152v249.89696a30.7712 30.7712 0 0 1-30.73024 30.72z'
                fill='inherite'
            />
        </svg>
    ),
    UpArrowLong: (props: LucideProps) => (
        <svg
            {...props}
            width='16'
            height='20'
            viewBox='0 0 16 20'
            fill='inherite'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M8 19V1.5'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d='M15 8L8 1L1 8'
                stroke='white'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
            />
        </svg>
    ),
    LongArrow: (props: LucideProps) => (
        <svg
            {...props}
            width='30'
            height='8'
            viewBox='0 0 30 8'
            fill='#9BA0A3'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M29.3536 4.35355C29.5488 4.15829 29.5488 3.84171 29.3536 3.64645L26.1716 0.464466C25.9763 0.269204 25.6597 0.269204 25.4645 0.464466C25.2692 0.659728 25.2692 0.976311 25.4645 1.17157L28.2929 4L25.4645 6.82843C25.2692 7.02369 25.2692 7.34027 25.4645 7.53553C25.6597 7.7308 25.9763 7.7308 26.1716 7.53553L29.3536 4.35355ZM0 4.5L29 4.5L29 3.5L0 3.5L0 4.5Z'
                fill='inherite'
            />
        </svg>
    )
};
