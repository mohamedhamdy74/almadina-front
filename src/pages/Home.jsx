import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import TrustSection from '../components/TrustSection';
import ReviewsSection from '../components/ReviewsSection';
import Categories from '../components/Categories';
import ProductCarousel from '../components/ProductCarousel';
import RegistrationCta from '../components/RegistrationCta';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';

function Home() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get latest 3 products (assuming backend returns them in order or we just take first 3)
  // If needed we can sort by createdAt if available, but for now taking first 3 is fine
  const latestProducts = products.slice(0, 3);

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
      <ReviewsSection />
    </div>
  );
}

export default Home;