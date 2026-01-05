import React from 'react';

export default function DashboardStats({ users, products }) {
    const totalUsers = users.length;
    const adminUsers = users.filter(u => u.role === 'admin').length;
    const regularUsers = totalUsers - adminUsers;

    const totalProducts = products.length;
    const laptops = products.filter(p => p.category === 'Laptops').length;
    const accessories = products.filter(p => p.category === 'Accessories').length;

    const stats = [
        {
            title: 'إجمالي المستخدمين',
            value: totalUsers,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-blue-700',
            details: `${adminUsers} أدمن | ${regularUsers} مستخدم عادي`,
        },
        {
            title: 'إجمالي المنتجات',
            value: totalProducts,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            gradient: 'from-primary-medium to-primary-dark',
            details: `${laptops} لابتوب | ${accessories} إكسسوار`,
        },
        {
            title: 'اللابتوبات',
            value: laptops,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            gradient: 'from-green-500 to-green-700',
            details: 'منتجات اللابتوب',
        },
        {
            title: 'الإكسسوارات',
            value: accessories,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            gradient: 'from-accent-pink to-red-600',
            details: 'منتجات الإكسسوارات',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" dir="rtl">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.gradient} p-6 rounded-2xl shadow-xl text-bg-white transform hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom`}
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                            {stat.icon}
                        </div>
                        <div className="text-left">
                            <p className="text-4xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                    <p className="text-sm opacity-90">{stat.details}</p>
                </div>
            ))}
        </div>
    );
}
