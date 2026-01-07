import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartMessage, setCartMessage] = useState('');

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find(p => p._id === id);
            if (foundProduct) {
                setProduct(foundProduct);
                setMainImage(foundProduct.thumbnail);
            }
        }
    }, [products, id]);

    const handleAddToCart = async () => {
        if (!user) {
            setCartMessage('يجب تسجيل الدخول أولاً');
            setTimeout(() => setCartMessage(''), 3000);
            return;
        }

        setAddingToCart(true);
        try {
            await dispatch(addToCart({ productId: product._id, quantity: 1 })).unwrap();
            setCartMessage('تمت الإضافة إلى السلة بنجاح!');
            setTimeout(() => setCartMessage(''), 3000);
        } catch (error) {
            setCartMessage(error || 'فشل في إضافة المنتج');
            setTimeout(() => setCartMessage(''), 3000);
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-medium mx-auto"></div>
                    <p className="mt-4 text-text-light">جاري التحميل...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-text-light text-xl">المنتج غير موجود</p>
                </div>
            </div>
        );
    }

    const allImages = [product.thumbnail, ...(product.images || [])];

    return (
        <div className="container mx-auto py-12 pt-40 animate-in fade-in duration-700 font-cairo">
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start font-cairo">
                {/* معرض الصور */}
                <div className="flex flex-col gap-4 items-center md:w-1/2">
                    <div className="relative group">
                        <img src={mainImage} alt={product.name} className="w-full h-96 object-cover object-center rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-105" />
                        <span className="absolute top-2 left-2 bg-primary-medium text-white px-3 py-1 rounded-full text-xs animate-in fade-in duration-500">عرض حصري</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {allImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`صورة ${idx + 1}`}
                                className={`w-20 h-20 object-cover object-center rounded-lg cursor-pointer border-2 transition-all duration-300 ${mainImage === img ? 'border-primary-medium scale-110' : 'border-bg-light hover:scale-105'}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* تفاصيل المنتج */}
                <div className="flex-1 flex flex-col gap-6 animate-in slide-in-from-right duration-700">
                    <h1 className="text-4xl font-extrabold text-primary-medium mb-2 animate-in fade-in duration-700 delay-100 font-cairo">{product.name}</h1>

                    {/* عرض الموديل إذا كان موجود */}
                    {product.model && (
                        <p className="text-lg text-text-medium font-semibold -mt-4 mb-2">
                            <span className="text-primary-dark">{product.brand}</span> {product.model}
                        </p>
                    )}

                    {user ? (
                        <p className="text-success font-bold text-2xl mb-2 animate-in fade-in duration-700 delay-200 font-cairo">
                            {product.price} ج.م
                        </p>
                    ) : (
                        <Link to="/login" className="text-primary-medium font-bold text-xl mb-2 animate-in fade-in duration-700 delay-200 font-cairo hover:underline block">
                            سجل لمشاهدة السعر
                        </Link>
                    )}
                    <p className="text-text-medium text-lg mb-4 animate-in fade-in duration-700 delay-300 font-cairo">{product.description}</p>

                    {/* المواصفات */}
                    {product.specifications && (
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-text-dark mb-2 animate-in fade-in duration-700 delay-400 font-cairo">المواصفات التقنية</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.specifications.cpu && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark">المعالج: </span>
                                        <span className="text-text-medium ml-2">{product.specifications.cpu}</span>
                                    </div>
                                )}
                                {product.specifications.ramMemory && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark"> الرام: </span>
                                        <span className="text-text-medium ml-2">{product.specifications.ramMemory}</span>
                                    </div>
                                )}
                                {product.specifications.hardDiskSize && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark">القرص الصلب: </span>
                                        <span className="text-text-medium ml-2">{product.specifications.hardDiskSize}</span>
                                    </div>
                                )}
                                {product.specifications.screenSize && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark">حجم الشاشة: </span>
                                        <span className="text-text-medium ml-2">{product.specifications.screenSize}</span>
                                    </div>
                                )}
                                {product.specifications.color && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark">  اللون:  </span>
                                        <span className="text-text-medium ml-2">{product.specifications.color}</span>
                                    </div>
                                )}
                                {product.specifications.graphicsDescription && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark">كارت الشاشة: </span>
                                        <span className="text-text-medium ml-2">{product.specifications.graphicsDescription}</span>
                                    </div>
                                )}
                                {product.specifications.operatingSystem && (
                                    <div className="bg-bg-light p-3 rounded-lg">
                                        <span className="font-semibold text-text-dark">نظام التشغيل: </span>
                                        <span className="text-text-medium ml-2">{product.specifications.operatingSystem}</span>
                                    </div>
                                )}
                                {product.specifications.specialFeatures && product.specifications.specialFeatures.length > 0 && (
                                    <div className="bg-bg-light p-3 rounded-lg md:col-span-2">
                                        <span className="font-semibold text-text-dark">المميزات الخاصة:</span>
                                        <div className="mt-1">
                                            {product.specifications.specialFeatures.map((feature, idx) => (
                                                <span key={idx} className="inline-block bg-primary-medium text-white px-2 py-1 rounded text-xs ml-1 mb-1">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-4 mt-6">
                        {cartMessage && (
                            <div className={`p-3 rounded-lg text-center font-bold ${cartMessage.includes('نجاح') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {cartMessage}
                            </div>
                        )}
                        <button
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                            className="w-full py-4 bg-gradient-to-r from-primary-medium to-accent-pink text-white rounded-xl font-bold text-xl shadow-lg hover:from-primary-dark hover:to-accent-pink/90 transition-all duration-500 animate-in zoom-in delay-700 font-cairo disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {addingToCart ? 'جاري الإضافة...' : 'إضافة إلى السلة'}
                        </button>
                        <a href={`https://wa.me/201553091959?text=أرغب%20في%20شراء%20${encodeURIComponent(product.name)}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-green-500 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-2 shadow-lg hover:bg-green-600 transition-all duration-500 animate-in zoom-in delay-800 font-cairo">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.72 11.06a6.5 6.5 0 10-5.66 5.66l2.12-.53a1 1 0 01.98.26l1.54 1.54a1 1 0 001.41 0l2.12-2.12a1 1 0 000-1.41l-1.54-1.54a1 1 0 01-.26-.98l.53-2.12z" /></svg>
                            تواصل واتساب
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}