import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Card from './Card';

const ProductCarousel = ({ title, products, isLoading }) => {
    if (isLoading) {
        return (
            <div className="py-20 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-medium border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="mt-4 text-text-medium font-cairo">جاري التحميل...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white overflow-hidden" dir="rtl">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-dark font-cairo">
                        {title}
                    </h2>
                    <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-primary-light/20 to-transparent rounded-full hidden md:block"></div>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    rtl={true}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                    className="product-swiper !pb-14"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product._id} className="h-auto">
                            <div className="h-full transform transition-all duration-300 hover:-translate-y-2">
                                <Card product={product} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ProductCarousel;
