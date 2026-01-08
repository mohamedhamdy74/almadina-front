import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { User, Mail, Phone, MapPin, LogOut, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center font-cairo bg-bg-light">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-text-dark mb-4">يرجى تسجيل الدخول أولاً</h2>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-primary-medium text-white rounded-lg hover:bg-primary-dark transition"
                    >
                        تسجيل الدخول
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light font-cairo pt-32 pb-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 animate-in fade-in slide-in-from-bottom duration-500">
                    <div className="bg-gradient-brand h-32 relative">
                        <div className="absolute -bottom-12 right-12">
                            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                                <User className="w-12 h-12 text-primary-medium" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-16 pb-8 px-12">
                        <h1 className="text-3xl font-bold text-text-dark mb-2">{user.name}</h1>
                        <span className="inline-block px-3 py-1 bg-primary-light/20 text-primary-dark rounded-full text-sm font-bold">
                            {user.role === 'admin' ? 'مدير النظام' : 'عميل'}
                        </span>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
                    <h2 className="text-xl font-bold text-text-dark border-b pb-4">معلومات الحساب</h2>

                    <div className="grid gap-6">
                        <div className="flex items-center gap-4 group">
                            <div className="p-3 bg-bg-light rounded-xl group-hover:bg-primary-light group-hover:text-white transition-colors">
                                <Mail className="w-6 h-6 text-primary-medium group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">البريد الإلكتروني</p>
                                <p className="text-lg font-semibold text-text-dark">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="p-3 bg-bg-light rounded-xl group-hover:bg-primary-light group-hover:text-white transition-colors">
                                <Phone className="w-6 h-6 text-primary-medium group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">رقم الهاتف</p>
                                <p className="text-lg font-semibold text-text-dark dir-ltr text-right">{user.phone || 'غير مسجل'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="p-3 bg-bg-light rounded-xl group-hover:bg-primary-light group-hover:text-white transition-colors">
                                <MapPin className="w-6 h-6 text-primary-medium group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-text-medium">العنوان</p>
                                <p className="text-lg font-semibold text-text-dark">
                                    {user.governorate ? `${user.governorate}، ${user.area}` : 'أسوان، المدينة'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-4 rounded-2xl hover:bg-red-100 transition-all duration-300 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>

                {/* Optional: Navigation Link back to Home */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-text-medium hover:text-primary-medium flex items-center gap-2 mx-auto transition-colors"
                    >
                        <span>العودة للتسوق</span>
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
