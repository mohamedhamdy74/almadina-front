import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../redux/slices/authSlice';


export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // true للدخول، false للتسجيل
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // تعريف schema للتحقق
  const loginSchema = yup.object().shape({
    email: yup.string().email('البريد غير صحيح').required('البريد مطلوب'),
    password: yup.string().required('كلمة المرور مطلوبة'),
  });
  const registerSchema = yup.object().shape({
    name: yup.string().required('الاسم مطلوب'),
    email: yup.string().email('البريد غير صحيح').required('البريد مطلوب'),
    password: yup.string().required('كلمة المرور مطلوبة'),
    phone: yup.string().required('رقم التليفون مطلوب'),
    governorate: yup.string().required('المحافظة مطلوبة'),
    area: yup.string().required('المنطقة مطلوبة'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      let user;
      if (isLogin) {
        const result = await dispatch(loginUser(data)).unwrap();
        user = result.user;
      } else {
        const result = await dispatch(registerUser(data)).unwrap();
        user = result.user;
      }

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      reset();
    } catch (err) {
      // Error is handled by Redux
      console.error('Login/Register error:', err);
    }
  };

  return (
    <div className="font-cairo min-h-screen flex items-center justify-center px-4 pb-12 pt-16 md:pt-40 animate-in fade-in duration-1000 bg-[url('/hero.png')] bg-cover bg-[center_top] md:bg-center bg-fixed relative overflow-hidden">
      {/* طبقة تظليل للخلفية لضمان وضوح الفورم */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      <div className="relative z-10 bg-bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in slide-in-from-bottom duration-700">
        {/* اللوجو */}
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img
              src="/logo.png"
              alt="المدينة ستور"
              className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
            />
          </Link>
        </div>

        {/* تبديل بين الدخول والتسجيل */}
        <div className="flex mb-6 md:mb-8 bg-bg-light rounded-lg p-1 text-sm md:text-base">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-1.5 md:py-2 px-4 rounded-lg font-bold transition-all duration-300 ${isLogin
              ? 'bg-primary-medium text-bg-white shadow-md animate-in fade-in zoom-in duration-300'
              : 'text-text-medium hover:text-primary-medium'
              }`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-1.5 md:py-2 px-4 rounded-lg font-bold transition-all duration-300 ${!isLogin
              ? 'bg-primary-medium text-bg-white shadow-md animate-in fade-in zoom-in duration-300'
              : 'text-text-medium hover:text-primary-medium'
              }`}
          >
            إنشاء حساب
          </button>
        </div>

        {/* العنوان */}
        <div className="text-center mb-4 animate-in fade-in slide-in-from-top duration-500">
          <h2 className="inline-flex items-center justify-center gap-2 text-xl md:text-3xl font-bold text-text-dark leading-tight mx-auto">
            <span>{isLogin ? 'سجل دخولك لمشاهدة أقوى عروضنا' : 'انضم لعائلة المدينة ستور'}</span>
            {isLogin && (
              <svg
                className="w-7 h-7 md:w-8 md:h-8 text-orange-500 fill-current animate-pulse shrink-0"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 23C12 23 18.5 19.5 18.5 14.5C18.5 11 16.5 9 16.5 9C16.5 9 17.5 10.5 17.5 12C17.5 14 15.5 15.5 13.5 14C13.5 11 14 8 12.5 4C12.5 4 13.5 7 11.5 10C9.5 13 8.5 14.5 9 17.5C9.5 20.5 12 23 12 23Z" />
              </svg>
            )}
          </h2>
        </div>
        <p className="text-sm md:text-base text-center text-text-light mb-6 md:mb-8 animate-in fade-in slide-in-from-top duration-500 delay-100 px-2">
          {isLogin ? 'استكشف أحدث المنتجات والخصومات الحصرية لمشتركينا' : 'سجل الآن واستمتع بتجربة تسوق فريدة وعروض لا تنتهي'}
        </p>

        {/* النموذج */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* البريد الإلكتروني */}
          <div className="animate-in fade-in slide-in-from-left duration-500 delay-200">
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-3 pl-12 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-all duration-200 bg-bg-white text-text-dark"
                placeholder="example@email.com"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* كلمة المرور */}
          <div className="animate-in fade-in slide-in-from-left duration-500 delay-300">
            <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                {...register('password')}
                className="w-full px-4 py-3 pl-12 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-all duration-200 bg-bg-white text-text-dark"
                placeholder="كلمة المرور"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* حقول إضافية للتسجيل */}
          {!isLogin && (
            <>
              {/* الاسم */}
              <div className="animate-in fade-in slide-in-from-left duration-500 delay-400">
                <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full px-4 py-3 pl-12 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-all duration-200 bg-bg-white text-text-dark"
                    placeholder="الاسم الكامل"
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* رقم التليفون */}
              <div className="animate-in fade-in slide-in-from-left duration-500 delay-450">
                <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
                  رقم التليفون
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="w-full px-4 py-3 pl-12 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-all duration-200 bg-bg-white text-text-dark"
                    placeholder="01xxxxxxxxx"
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* المحافظة */}
              <div className="animate-in fade-in slide-in-from-left duration-500 delay-500">
                <label htmlFor="governorate" className="block text-sm font-medium text-text-dark mb-2">
                  المحافظة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="governorate"
                    {...register('governorate')}
                    className="w-full px-4 py-3 pl-12 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-all duration-200 bg-bg-white text-text-dark"
                    placeholder="القاهرة، الجيزة، الإسكندرية..."
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate.message}</p>}
              </div>

              {/* المنطقة */}
              <div className="animate-in fade-in slide-in-from-left duration-500 delay-550">
                <label htmlFor="area" className="block text-sm font-medium text-text-dark mb-2">
                  المنطقة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="area"
                    {...register('area')}
                    className="w-full px-4 py-3 pl-12 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-all duration-200 bg-bg-white text-text-dark"
                    placeholder="المنطقة أو الحي"
                  />
                  <svg className="absolute left-3 top-3.5 w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                {errors.area && <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>}
              </div>
            </>
          )}

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary-medium to-accent-pink text-bg-white rounded-lg font-bold hover:from-primary-dark hover:to-accent-pink/90 transition-all duration-300 animate-in zoom-in duration-500 delay-600 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري التحميل...' : (isLogin ? 'دخول' : 'إنشاء الحساب')}
          </button>

          {/* عرض الأخطاء */}
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {error}
            </div>
          )}
        </form>

        {/* روابط إضافية */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom duration-500 delay-700">
          {isLogin ? (
            <>
              <p className="text-text-light mt-2">
                ليس لديك حساب؟{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary-medium hover:text-primary-dark transition-colors duration-200 font-bold"
                >
                  سجل الآن
                </button>
              </p>
            </>
          ) : (
            <p className="text-text-light">
              لديك حساب بالفعل؟{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-primary-medium hover:text-primary-dark transition-colors duration-200 font-bold"
              >
                سجل دخولك
              </button>
            </p>
          )}
        </div>

        {/* رابط العودة للرئيسية */}
        <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom duration-500 delay-800">
          <Link to="/" className="text-text-medium hover:text-primary-medium transition-colors duration-200 flex items-center justify-center space-x-2 space-x-reverse">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}