import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { fetchUsers } from '../redux/slices/userSlice';
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import UserManagement from '../components/UserManagement';
import ProductsByCategory from '../components/ProductsByCategory';

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);
  const { items: users } = useSelector((state) => state.users);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light to-bg-white" dir="rtl">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:mr-64 p-4 lg:p-8">
        {/* Mobile Header with Toggle */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-primary-medium text-bg-white rounded-lg shadow-md hover:bg-primary-dark transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-text-dark">لوحة التحكم</h1>
        </div>

        {/* Header */}
        <header className="mb-8 animate-in fade-in slide-in-from-top duration-500 hidden lg:block">
          <h1 className="text-4xl font-bold text-text-dark mb-2">
            {activeSection === 'dashboard' && 'لوحة التحكم'}
            {activeSection === 'users' && 'إدارة المستخدمين'}
            {activeSection === 'products' && 'إدارة المنتجات'}
          </h1>
          <p className="text-text-light">
            {activeSection === 'dashboard' && 'نظرة عامة على المتجر'}
            {activeSection === 'users' && 'عرض وتعديل وحذف المستخدمين'}
            {activeSection === 'products' && 'عرض وتعديل وحذف المنتجات حسب الفئة'}
          </p>
        </header>

        {/* Content Sections */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          {activeSection === 'dashboard' && (
            <DashboardStats users={users} products={products} />
          )}

          {activeSection === 'users' && (
            <UserManagement users={users} />
          )}

          {activeSection === 'products' && (
            <ProductsByCategory products={products} />
          )}
        </div>
      </div>
    </div>
  );
}
