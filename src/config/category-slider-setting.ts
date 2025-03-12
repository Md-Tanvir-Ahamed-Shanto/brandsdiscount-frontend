export const categorySliderSettings = {
    className: 'slick-container',
    centerMode: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 8,
    slidesToScroll: 1,
    centerPadding: '0',
    dots: false,
    arrows: false,
    swipe: false,
    autoPlay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 580,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
};
