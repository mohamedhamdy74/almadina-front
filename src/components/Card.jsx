import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { getImageUrl } from '../utils/imageUrl';


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
    <div className="group relative flex flex-col overflow-hidden font-cairo h-full bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
      {/* Badge for Laptops */}
      {product.category?.toLowerCase() === 'laptops' && (
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-primary-medium text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            استيراد الخارج
          </span>
        </div>
      )}

      {/* صورة المنتج */}
      <Link to={`/${product.category?.toLowerCase()}/${product._id}`} className="block relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={getImageUrl(product.thumbnail)}
          alt={product.name}
          className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
        />


        {/* Quick Add Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 transition-all duration-500 z-20">
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="bg-white/90 backdrop-blur-sm text-primary-dark p-3 rounded-full shadow-xl hover:bg-primary-dark hover:text-white transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </Link>

      {/* المحتوى */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
          {/* الاسم والبراند */}
          <div className="flex-1">
            <Link to={`/${product.category?.toLowerCase()}/${product._id}`}>
              <h3 className="text-lg font-bold text-text-dark group-hover:text-primary-medium transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            {product.brand && (
              <p className="text-xs font-semibold text-primary-medium/80 uppercase tracking-wider mt-0.5">
                {product.brand}
              </p>
            )}
          </div>

          {/* السعر */}
          <div className="text-left">
            {user ? (
              <div className="flex flex-col items-end">
                <span className="text-xl font-black text-primary-dark">
                  {(Number(product.price) || 0).toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-text-light -mt-1">ج.م</span>
              </div>
            ) : (
              <Link to="/login" className="bg-primary-light/10 text-primary-medium text-[10px] font-bold px-2 py-1 rounded hover:bg-primary-medium hover:text-white transition-colors">
                عرض السعر
              </Link>
            )}
          </div>
        </div>

        {/* الوصف */}
        <p className="text-text-medium text-xs leading-relaxed line-clamp-2 mb-6 h-8">
          {product.description}
        </p>

        {/* رسالة الإضافة للسلة */}
        {cartMessage && (
          <div className={`mb-4 p-2 rounded-lg text-xs font-bold text-center animate-fadeIn ${cartMessage.includes('✓') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {cartMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3">
          <Link
            to={`/${product.category?.toLowerCase()}/${product._id}`}
            className="flex-1 bg-gray-50 text-text-dark text-sm font-bold py-3 rounded-xl text-center hover:bg-gray-100 transition-colors border border-gray-100"
          >
            التفاصيل
          </Link>

          {user && user.role === 'admin' && (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onEdit) onEdit(product);
                  else navigate('/admin', { state: { editProductId: product._id } });
                }}
                className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-blue-100"
                title="تعديل"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
