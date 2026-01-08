import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeFromCart, updateCartItem } from '../redux/slices/cartSlice';

// مكون عنصر السلة
function CartItem({ item, onRemove, onUpdateQuantity }) {
  const product = item.product;

  if (!product) return null;

  return (
    <div className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-left duration-700">
      <div className="flex items-center space-x-4 space-x-reverse">
        <img
          src={getImageUrl(product.thumbnail || product.imageUrl || product.image || (product.images && product.images[0]))}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-xl border border-slate-100"
          onError={(e) => {
            e.target.src = 'https://placehold.co/150x150/f3f4f6/374151?text=' + encodeURIComponent(product.name);
            e.target.onerror = null;
          }}
        />
        <div>
          <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
          <p className="text-blue-600 font-bold">{item.price.toLocaleString()} ج.م</p>
        </div>
      </div>
      <div className="flex items-center space-x-6 space-x-reverse">
        <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
          <button
            onClick={() => onUpdateQuantity(product._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center bg-white text-slate-700 rounded-md shadow-sm hover:bg-slate-100 transition-colors duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="text-slate-800 font-bold w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(product._id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-200 font-bold"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(product._id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full"
          title="حذف المنتج"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalAmount, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch cart when component mounts and user is logged in
    if (user) {
      dispatch(getCart());
    }
  }, [dispatch, user]);

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const handleWhatsAppCheckout = () => {
    let message = "مرحباً، أرغب في إتمام طلب للمنتجات التالية:\n\n";
    items.forEach((item, index) => {
      const product = item.product;
      message += `${index + 1}. ${product.name} (العدد: ${item.quantity}) - ${item.price.toLocaleString()} ج.م\n`;
    });
    message += `\nالمجموع الكلي: ${totalAmount.toLocaleString()} ج.م`;

    const url = `https://wa.me/201553091959?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Show login message if user is not logged in
  if (!user) {
    return (
      <div className="font-cairo bg-slate-50 min-h-screen pt-40 pb-20">
        <section className="container mx-auto px-4 md:px-6" dir="rtl">
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">يجب تسجيل الدخول أولاً</h2>
            <p className="text-slate-500 mb-8">قم بتسجيل الدخول لعرض وإدارة سلة التسوق الخاصة بك</p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
            >
              تسجيل الدخول
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="font-cairo bg-slate-50 min-h-screen pt-40 pb-20">
      <section className="container mx-auto px-4 md:px-6" dir="rtl">
        <header className="mb-8 text-right animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">سلة التسوق</h1>
          <p className="mt-2 text-slate-500">مراجعة المنتجات المختارة قبل الشراء</p>
        </header>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-500">جاري تحميل السلة...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 animate-in fade-in zoom-in duration-700">
            <div className="bg-slate-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">سلة التسوق فارغة</h2>
            <p className="text-slate-500 mb-8">ابدأ التسوق وأضف بعض المنتجات المميزة إلى سلتك</p>
            <div className="flex justify-center gap-4">
              <Link
                to="/laptops"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
              >
                تصفح اللابتوبات
              </Link>
              <Link
                to="/accessories"
                className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
              >
                تصفح الإكسسوارات
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div key={item._id || item.product?._id} style={{ animationDelay: `${index * 100}ms` }}>
                  <CartItem item={item} onRemove={handleRemove} onUpdateQuantity={handleUpdateQuantity} />
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 sticky top-32 animate-in fade-in slide-in-from-right duration-700">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">ملخص الطلب</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">عدد المنتجات:</span>
                    <span className="text-slate-800 font-bold">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">المجموع الفرعي:</span>
                    <span className="text-slate-800 font-bold">{totalAmount.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">الشحن:</span>
                    <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg text-sm">مجاني</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-bold text-slate-900">
                    <span>المجموع الكلي:</span>
                    <span>{totalAmount.toLocaleString()} ج.م</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all duration-200 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2 mb-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  إتمام الطلب عبر واتساب
                </button>

                <Link
                  to="/laptops"
                  className="w-full block text-center py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors duration-200 font-medium"
                >
                  متابعة التسوق
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}