import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Gift, ShieldCheck, Sparkles } from 'lucide-react';

const RegistrationCta = () => {
    return (
        <section className="relative py-20 overflow-hidden" dir="rtl">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-brand opacity-95"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Content */}
                    <div className="lg:w-1/2 text-center lg:text-right text-white">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight font-cairo">
                            انضم إلينا اليوم واستمتع <br /> <span className="text-secondary-light">بمزايا حصرية!</span>
                        </h2>
                        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto lg:mx-0 font-cairo">
                            سجل حسابك الآن لتتمكن من مشاهدة الأسعار الخاصة، الحصول على استشارات تقنية من مساعدنا الذكي، ومتابعة أحدث عروضنا أولاً بأول.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-right">
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <Gift className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-sm">عروض حصرية للأعضاء</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-sm">استشارات AI وترشيح للأجهزة</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-sm">ضمان وخدمات ما بعد البيع</span>
                            </div>
                            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <UserPlus className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-sm">سرعة في إتمام الطلب</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/login"
                                className="bg-white text-primary-dark px-10 py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                            >
                                إنشاء حساب مجاني
                                <UserPlus size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Image/Decoration Side */}
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 animate-float">
                            <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-white/40 to-transparent"></div>
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full bg-success"></div>
                                        </div>
                                        <div className="h-4 w-40 bg-white/20 rounded-full"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 w-full bg-white/10 rounded-full"></div>
                                        <div className="h-3 w-[80%] bg-white/10 rounded-full"></div>
                                        <div className="h-3 w-[90%] bg-white/10 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                        <div className="h-8 w-24 bg-primary-light/40 rounded-xl"></div>
                                        <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative floating card */}
                            <div className="absolute -bottom-10 -right-10 bg-accent-pink p-6 rounded-3xl shadow-2xl rotate-6 hidden md:block">
                                <Gift className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -top-6 -left-6 bg-success p-4 rounded-2xl shadow-2xl -rotate-12 hidden md:block">
                                <ShieldCheck className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationCta;
