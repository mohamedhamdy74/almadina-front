import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

export default function Sidebar({ activeSection, setActiveSection, isOpen, onClose }) {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: 'لوحة التحكم',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            id: 'users',
            label: 'المستخدمين',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            id: 'products',
            label: 'المنتجات',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 h-screen w-64 bg-gradient-to-b from-primary-dark via-primary-medium to-primary-dark shadow-2xl z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                dir="rtl"
            >
                {/* Logo/Header */}
                <div className="p-6 border-b border-primary-light/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-bg-white text-center">
                            لوحة الأدمن
                        </h2>
                        <p className="text-primary-light text-sm text-center mt-1">إدارة المتجر</p>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-bg-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="mt-6 px-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveSection(item.id);
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition-all duration-300 ${activeSection === item.id
                                ? 'bg-bg-white text-primary-dark shadow-lg scale-105'
                                : 'text-bg-white hover:bg-primary-light/30 hover:scale-102'
                                }`}
                        >
                            {item.icon}
                            <span className="font-semibold text-lg">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 w-full p-4 border-t border-primary-light/30">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-accent-pink text-bg-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </div>
        </>
    );
}

