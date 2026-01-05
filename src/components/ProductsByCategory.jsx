import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/slices/productSlice';
import ProductModal from './ProductModal';

export default function ProductsByCategory({ products }) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState('Laptops');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = ['Laptops', 'Accessories'];
    const categoryLabels = {
        'Laptops': 'اللابتوبات',
        'Accessories': 'الإكسسوارات',
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getProductsByCategory = (category) => {
        return filteredProducts.filter(p => p.category === category);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteProduct(id)).unwrap();
            alert('تم حذف المنتج بنجاح');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert(`فشل حذف المنتج: ${error}`);
        }
    };

    const handleAddProduct = (category) => {
        setSelectedCategory(category);
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setSelectedCategory(null);
    };

    return (
        <div className="bg-bg-white rounded-2xl shadow-xl p-6" dir="rtl">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-text-dark mb-4">إدارة المنتجات</h2>
                <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium transition-all"
                />
            </div>

            {categories.map((category) => {
                const categoryProducts = getProductsByCategory(category);
                const isExpanded = expandedCategory === category;

                return (
                    <div key={category} className="mb-6 border border-bg-light rounded-xl overflow-hidden">
                        {/* Category Header */}
                        <div
                            className="bg-gradient-to-r from-primary-medium to-primary-dark p-4 flex items-center justify-between cursor-pointer hover:from-primary-dark hover:to-primary-medium transition-all"
                            onClick={() => setExpandedCategory(isExpanded ? null : category)}
                        >
                            <div className="flex items-center gap-3">
                                <svg
                                    className={`w-6 h-6 text-bg-white transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                                <h3 className="text-xl font-bold text-bg-white">{categoryLabels[category]}</h3>
                                <span className="bg-bg-white text-primary-dark px-3 py-1 rounded-full text-sm font-semibold">
                                    {categoryProducts.length}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddProduct(category);
                                }}
                                className="px-4 py-2 bg-bg-white text-primary-dark rounded-lg font-semibold hover:bg-accent-pink hover:text-bg-white transition-all duration-300 hover:scale-105"
                            >
                                + إضافة منتج
                            </button>
                        </div>

                        {/* Category Products */}
                        {isExpanded && (
                            <div className="p-4 bg-bg-light/30">
                                {categoryProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {categoryProducts.map((product) => (
                                            <div
                                                key={product._id}
                                                className="bg-bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-bg-light"
                                            >
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.name}
                                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                                />
                                                <h4 className="text-lg font-bold text-text-dark mb-2 line-clamp-1">
                                                    {product.name}
                                                </h4>
                                                <p className="text-success font-semibold mb-2">{product.price} ج.م</p>
                                                <p className="text-text-light text-sm mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <p className="text-text-medium text-xs mb-3">
                                                    الماركة: {product.brand}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="flex-1 py-2 bg-primary-medium text-bg-white rounded-lg font-semibold hover:bg-primary-dark transition-all duration-300 hover:scale-105 text-sm"
                                                    >
                                                        تعديل
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="flex-1 py-2 bg-accent-pink text-bg-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:scale-105 text-sm"
                                                    >
                                                        حذف
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-text-light">
                                        لا توجد منتجات في هذه الفئة
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Product Modal */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                productToEdit={editingProduct}
                defaultCategory={selectedCategory}
            />
        </div>
    );
}
