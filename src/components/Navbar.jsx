import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { Bot, User, ShoppingCart, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { itemCount } = useSelector((state) => state.cart);

    // روابط التنقل
    const homeLink = user?.role === 'admin' ? '/admin' : '/';
    const navLinks = [
        { name: 'الرئيسية', path: homeLink },
        { name: 'اللابتوبات', path: '/laptops' },
        { name: 'الإكسسوارات', path: '/accessories' },
        { name: 'من نحن', path: '/about' },
        {
            name: 'مساعد AI',
            path: '/ai-assistant',
            icon: <Bot className="w-5 h-5 inline-block ml-1" />
        },
    ];

    const brandLogo = (
        <Link to={homeLink} className="flex-shrink-0">
            <img src='/logo.png' className="h-16 md:h-28 w-auto object-contain animate-in fade-in zoom-in duration-700 mr-2 md:mr-3" alt="Logo" />
        </Link>
    );

    return (
        <nav className="fixed top-3 md:top-5 left-3 right-3 md:left-10 md:right-10 mx-auto z-50 h-16 md:h-24 shadow-md bg-white/90 rounded-full font-cairo font-bold text-slate-800 backdrop-blur-md transition-all duration-300">
            <div className="container flex items-center justify-between px-4 md:px-6 mx-auto h-full">
                {/* Logo */}
                {brandLogo}

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex md:gap-5 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="transition-colors duration-200 cursor-pointer flex items-center gap-1 text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg"
                        >
                            {link.icon && link.icon}
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section: Icons & Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                    {/* User / Auth Icon */}
                    {user ? (
                        <Link
                            to="/profile"
                            className="relative p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition duration-300"
                            aria-label="Profile"
                            title="الملف الشخصي"
                        >
                            <User className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 text-[10px] bg-green-500 text-white rounded-full px-1.5 py-0.5 shadow-sm">
                                {user.role === 'admin' ? 'أدمن' : 'عميل'}
                            </span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition duration-300"
                            aria-label="Login"
                        >
                            <User className="w-6 h-6" />
                        </Link>
                    )}

                    {/* Cart Icon */}
                    <Link
                        to="/cart"
                        className="relative p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition duration-300"
                        aria-label="Shopping Cart"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-pink-500 text-white animate-bounce">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 transition-colors rounded-full md:hidden text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden md:hidden animate-in slide-in-from-top-5 duration-300">
                    <div className="flex flex-col p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            >
                                {link.icon && link.icon}
                                {link.name}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                to="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-lg text-primary-medium bg-primary-light/10 rounded-xl transition-colors"
                            >
                                <User className="w-5 h-5" />
                                الملف الشخصي
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;