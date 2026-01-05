import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import Card from '../components/Card';
import ProductModal from '../components/ProductModal';

// صفحة اللابتوبات - تعرض قائمة منتجات الفئة
export default function Laptops() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all laptops on mount
  useEffect(() => {
    dispatch(fetchProducts({ category: 'Laptops' }));
  }, [dispatch]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Get all laptops
  const laptops = useMemo(() =>
    products.filter(p => p.category === 'Laptops'),
    [products]
  );

  // Get unique brands from all laptops
  const brands = useMemo(() =>
    [...new Set(laptops.filter(p => p.brand).map(p => p.brand))],
    [laptops]
  );

  // Filter products by selected brand
  const filteredProducts = useMemo(() =>
    selectedBrand
      ? laptops.filter(p => p.brand === selectedBrand)
      : laptops,
    [laptops, selectedBrand]
  );

  return (
    <div className="font-cairo bg-bg-white pt-32">
      <section className="container mx-auto px-6 py-12" dir="rtl">
        <header className="mb-8 text-right">
          <h1 className="text-3xl md:text-4xl font-bold text-text-dark">اللابتوبات</h1>
          <p className="mt-2 text-text-light">أفضل أجهزة لابتوب استيراد بحالة ممتازة.</p>
        </header>

        {/* Brand Filter */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-text-dark mb-2">تصفية حسب الماركة</label>
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="px-4 py-2 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
          >
            <option value="">جميع المنتجات</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-8">جاري التحميل...</div>}

        {/* Error State */}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {filteredProducts.map((product) => (
            <Card key={product._id} product={product} onEdit={handleEditProduct} />
          ))}
        </div>

        {/* No Products */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-8 text-text-light">لا توجد منتجات متاحة</div>
        )}

        {/* Modal للتعديل */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          productToEdit={editingProduct}
        />
      </section>
    </div>
  );
}