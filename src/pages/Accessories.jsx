import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import Card from '../components/Card';
import ProductModal from '../components/ProductModal';

// صفحة الإكسسوارات - تعرض قائمة منتجات الفئة
export default function Accessories() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all accessories on mount
  useEffect(() => {
    dispatch(fetchProducts({ category: 'Accessories' }));
  }, [dispatch]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Get all accessories
  const accessories = useMemo(() =>
    products.filter(p => p.category === 'Accessories'),
    [products]
  );

  // Get unique subcategories from all accessories
  const types = useMemo(() =>
    [...new Set(accessories.filter(p => p.subCategory).map(p => p.subCategory))],
    [accessories]
  );

  // Filter products by selected subcategory and search term
  const filteredProducts = useMemo(() => {
    return accessories.filter(p => {
      const matchesType = selectedType ? p.subCategory === selectedType : true;
      const matchesSearch = searchTerm
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;
      return matchesType && matchesSearch;
    });
  }, [accessories, selectedType, searchTerm]);

  return (
    <div className="font-cairo bg-bg-white pt-32">
      <section className="container mx-auto px-6 py-12" dir="rtl">
        <header className="mb-8 text-right">
          <h1 className="text-3xl md:text-4xl font-bold text-text-dark">الإكسسوارات</h1>
          <p className="mt-2 text-text-light">سماعات، ماوس، كيبورد وإكسسوارات أصلية.</p>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-dark mb-2">بحث عن إكسسوار</label>
            <input
              type="text"
              placeholder="ابحث بالاسم أو الوصف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
            />
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-text-dark mb-2">تصفية حسب النوع</label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-2 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
            >
              <option value="">جميع المنتجات</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
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