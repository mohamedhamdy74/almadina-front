import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

function Card({ product, onEdit }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setCartMessage('يجب تسجيل الدخول أولاً');
      setTimeout(() => setCartMessage(''), 3000);
      return;
    }

    setAddingToCart(true);
    try {
      await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
      setCartMessage('تمت الإضافة للسلة ✓');
      setTimeout(() => setCartMessage(''), 3000);
    } catch (error) {
      setCartMessage(error || 'فشل في الإضافة');
      setTimeout(() => setCartMessage(''), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  // If no product prop, return null
  if (!product) {
    return null;
  }

  return (
    <div className="group relative flex flex-col overflow-hidden font-cairo h-full">
      {/* الصورة - قابلة للنقر للذهاب لصفحة التفاصيل */}
      <Link to={`/${product.category}/${product._id}`} className="block">
        <div className="h-80 w-full overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 cursor-pointer"
          />
        </div>
      </Link>

      {/* المحتوى */}
      <div className="relative border border-gray-200 bg-bg-white p-5 rounded-lg shadow-md flex-1 flex flex-col">
        {/* السعر */}
        <p className="text-success font-semibold">
          {product.price}ج.م
        </p>

        {/* الاسم - قابل للنقر */}
        <Link to={`/${product.category}/${product._id}`}>
          <h3 className="mt-2 text-lg font-bold text-text-dark hover:text-primary-medium transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* عرض الموديل إذا كان موجود */}
        {product.model && (
          <p className="text-sm text-text-medium font-semibold -mt-1">
            <span className="text-primary-dark">{product.brand}</span> {product.model}
          </p>
        )}

        {/* الوصف */}
        <p className="mt-2 line-clamp-3 text-text-medium text-sm leading-relaxed flex-1">
          {product.description}
        </p>

        {/* رسالة الإضافة للسلة */}
        {cartMessage && (
          <div className={`mt-2 p-2 rounded text-xs font-bold text-center ${cartMessage.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {cartMessage}
          </div>
        )}

        {/* Admin buttons */}
        {user && user.role === 'admin' && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onEdit) {
                  onEdit(product);
                } else {
                  navigate('/admin', { state: { editProductId: product._id } });
                }
              }}
              className="flex-1 rounded-md bg-blue-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-600"
            >
              تعديل
            </button>
            <button className="flex-1 rounded-md bg-red-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-600">
              حذف
            </button>
          </div>
        )}

        {/* الأزرار */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="w-full rounded-md bg-primary-dark px-4 py-2.5 text-sm font-bold text-bg-white transition hover:bg-primary-medium hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingToCart ? 'جاري الإضافة...' : 'إضافة إلي السلة'}
          </button>
          <Link
            to={`/${product.category}/${product._id}`}
            className="w-full rounded-md border-2 border-primary-medium text-primary-medium px-4 py-2.5 text-sm font-bold transition-all duration-300 hover:bg-primary-medium hover:text-white hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            تفاصيل
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
