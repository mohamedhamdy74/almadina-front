import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ReviewsSection() {
  const reviews = [
    {
      name: "أحمد محمد",
      text: "منتجات ممتازة وجودة عالية جدًا 👌، والتوصيل أسرع مما توقعت.",
      rating: 5,
    },
    {
      name: "سارة علي",
      text: "خدمة عملاء محترمة جدًا ومتجاوبة. فعلاً تجربة تسوق مميزة.",
      rating: 4,
    },
    {
      name: "محمود خالد",
      text: "سعر مناسب مقارنة بالخدمة والجودة. أكيد هكرر الشراء ❤️.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-bg-light font-cairo">
      {/* العنوان */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-text-dark">آراء عملائنا  </h2>
        <p className="mt-2 text-text-medium">
          بنفخر بثقة عملائنا وتجربتهم معانا
        </p>
      </div>

      {/* الـ Slider */}
      <div className="container mx-auto p-6">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="pb-10"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 max-w-lg mx-auto">
                {/* التقييم */}
                <div className="flex justify-center mb-3">
                  {Array(review.rating)
                    .fill("⭐")
                    .map((star, i) => (
                      <span key={i} className="text-warning text-xl">
                        {star}
                      </span>
                    ))}
                </div>
                {/* النص */}
                <p className="text-text-medium italic leading-relaxed mb-4">
                  "{review.text}"
                </p>
                {/* الاسم */}
                <h3 className="font-bold text-text-dark mb-5">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ReviewsSection;
