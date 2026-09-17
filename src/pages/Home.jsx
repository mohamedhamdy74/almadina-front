import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import TrustSection from '../components/TrustSection';
import Categories from '../components/Categories';
import ProductCarousel from '../components/ProductCarousel';
import RegistrationCta from '../components/RegistrationCta';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Flame, Sparkles, ArrowLeft } from 'lucide-react';

function Home() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // عروض اليوم والأسبوع
  const dailyOffers = products.filter(p => p.isDailyOffer === true || p.isDailyOffer === 'true');
  const weeklyOffers = products.filter(p => p.isWeeklyOffer === true || p.isWeeklyOffer === 'true');

  return (
    <div className='font-cairo m-0 overflow-x-hidden'>
      <section className='relative grid grid-cols-1 bg-[url("/hero.png")] bg-cover bg-center py-20 px-6 md:p-52 min-h-screen font-cairo overflow-hidden'>
        {/* <!-- Overlay --> */}
        <div className="absolute inset-0 bg-black/25"></div>

        {/* المحتوى */}
        <div className="absolute inset-0 z-10 flex flex-col gap-5 text-center justify-center items-center w-full h-full">
          <h1 className="text-4xl leading-10 md:text-6xl font-bold text-white animate-in fade-in slide-in-from-bottom-10 duration-700">
            أفضل لابتوبات استيراد وإكسسوارات أصلية
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-200 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            وفر وقتك وابحث عن جهازك المثالي مع متجر المدينة
          </p>

          <div className="mt-8 md:text-2xl flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link
              to="/laptops"
              className="px-10 py-5 rounded-full bg-primary-medium text-white font-bold hover:bg-primary-dark transition"
            >
              تسوق الآن
            </Link>
            <Link
              to="/about"
              className="px-10 py-5 rounded-full bg-white text-primary-medium font-bold hover:bg-bg-light transition"
            >
              اعرف أكثر
            </Link>
          </div>
        </div>

        {/* شكل ديكوري متحرك */}
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent-pink rounded-full opacity-60 blur-2xl animate-bounce" />
        <div className="absolute top-32 right-10 w-40 h-40 bg-primary-light rounded-full opacity-50 blur-2xl animate-pulse" />

      </section>

      {/* سيكشن عرض اليوم */}
      <section className="relative py-16 overflow-hidden" dir="rtl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 opacity-[0.07]"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg shadow-orange-500/30">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-dark font-cairo">عرض اليوم</h2>
                <p className="text-text-medium text-sm mt-1">عروض حصرية محدثة يومياً بأقوى الخصومات</p>
              </div>
            </div>
            <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-orange-300/30 to-transparent rounded-full hidden md:block"></div>
          </div>

          {dailyOffers.length > 0 ? (
            <ProductCarousel
              title=""
              products={dailyOffers}
              isLoading={loading}
            />
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-orange-200/70 p-10 text-center shadow-sm max-w-xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-2">ترقبوا عروض اليوم قريباً!</h3>
              <p className="text-text-medium text-sm leading-relaxed mb-6">
                يقوم فريقنا باختيار أجهزة مميزة يومياً لعرضها هنا بأفضل سعر. تصفح بقية الأجهزة أو تواصل معنا للاستفسار.
              </p>
              <Link
                to="/laptops"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition shadow-md hover:shadow-lg"
              >
                تصفح أحدث الأجهزة المتاحة
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* سيكشن عرض الأسبوع */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-white to-purple-50/30" dir="rtl">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-2xl shadow-lg shadow-purple-500/30">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-dark font-cairo">عرض الأسبوع</h2>
                <p className="text-text-medium text-sm mt-1">تخفيضات أسبوعية مميزة على أفضل الأجهزة</p>
              </div>
            </div>
            <div className="h-1 flex-1 mx-8 bg-gradient-to-r from-purple-300/30 to-transparent rounded-full hidden md:block"></div>
          </div>

          {weeklyOffers.length > 0 ? (
            <ProductCarousel
              title=""
              products={weeklyOffers}
              isLoading={loading}
            />
          ) : (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-purple-200/70 p-10 text-center shadow-sm max-w-xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark mb-2">عروض الأسبوع قادمة قريباً</h3>
              <p className="text-text-medium text-sm leading-relaxed mb-6">
                نقوم باختيار أقوى لابتوبات الاستيراد وإكسسواراتها أسبوعياً لتقديمها بخصومات لا تفوت.
              </p>
              <Link
                to="/laptops"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition shadow-md hover:shadow-lg"
              >
                استكشف كل المنتجات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* الأقسام */}
      <Categories />

      {/* قروصلاة المنتجات */}
      <ProductCarousel
        title="أحدث اللابتوبات"
        products={products.filter(p => p.category?.toLowerCase() === 'laptops').slice(0, 8)}
        isLoading={loading}
      />

      <div className="bg-bg-light">
        <ProductCarousel
          title="إكسسوارات مميزة"
          products={products.filter(p => p.category?.toLowerCase() === 'accessories').slice(0, 8)}
          isLoading={loading}
        />
      </div>
      <RegistrationCta />

      {/* { trust section } */}
      <TrustSection />

    </div>
  );
}

export default Home;