import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../redux/slices/productSlice';

export default function ProductModal({ isOpen, onClose, productToEdit, defaultCategory }) {
    const dispatch = useDispatch();
    const [imageInputs, setImageInputs] = useState([0]); // Array of image input IDs
    const [existingThumbnail, setExistingThumbnail] = useState(null);
    const [existingImages, setExistingImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [deleteThumbnail, setDeleteThumbnail] = useState(false);

    // schema للتحقق من المنتج
    const productSchema = yup.object().shape({
        name: yup.string().required('اسم المنتج مطلوب'),
        brand: yup.string().required('الماركة مطلوبة'),
        price: yup.number().typeError('السعر يجب أن يكون رقم').required('السعر مطلوب'),
        description: yup.string().required('الوصف مطلوب'),
        category: yup.string().required('الفئة مطلوبة'),
    });

    const {
        register: productRegister,
        handleSubmit: handleProductSubmit,
        formState: { errors: productErrors },
        reset: resetProductForm,
    } = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: '',
            brand: '',
            price: '',
            description: '',
            category: 'Accessories',
        },
    });

    // تحديث القيم عند فتح modal للتعديل
    useEffect(() => {
        if (isOpen) {
            if (productToEdit) {
                // Flatten specifications into the form
                const formData = {
                    name: productToEdit.name || '',
                    brand: productToEdit.brand || '',
                    model: productToEdit.model || '',
                    price: productToEdit.price || '',
                    description: productToEdit.description || '',
                    category: productToEdit.category || 'Accessories',
                    subCategory: productToEdit.subCategory || '',
                    // Flatten specifications
                    cpu: productToEdit.specifications?.cpu || '',
                    ramMemory: productToEdit.specifications?.ramMemory || '',
                    hardDiskSize: productToEdit.specifications?.hardDiskSize || '',
                    screenSize: productToEdit.specifications?.screenSize || '',
                    color: productToEdit.specifications?.color || '',
                    graphicsDescription: productToEdit.specifications?.graphicsDescription || '',
                    operatingSystem: productToEdit.specifications?.operatingSystem || '',
                    // Convert specialFeatures array to comma-separated string
                    specialFeatures: productToEdit.specifications?.specialFeatures?.join(', ') || '',
                };

                resetProductForm(formData);
                // Load existing images
                setExistingThumbnail(productToEdit.thumbnail || null);
                setExistingImages(productToEdit.images || []);
                setImagesToDelete([]);
                setDeleteThumbnail(false);
            } else {
                resetProductForm({
                    name: '', brand: '', model: '', price: '', description: '',
                    category: defaultCategory || 'Accessories', subCategory: '',
                    cpu: '', ramMemory: '', hardDiskSize: '', screenSize: '',
                    color: '', graphicsDescription: '', operatingSystem: '', specialFeatures: ''
                });
                setExistingThumbnail(null);
                setExistingImages([]);
                setImagesToDelete([]);
                setDeleteThumbnail(false);
            }
            setImageInputs([0]); // Reset image inputs
        }
    }, [isOpen, productToEdit, defaultCategory, resetProductForm]);

    // إضافة input جديد للصور
    const handleAddImageInput = () => {
        setImageInputs([...imageInputs, imageInputs.length]);
    };

    // حذف input صورة
    const handleRemoveImageInput = (indexToRemove) => {
        if (imageInputs.length > 1) {
            setImageInputs(imageInputs.filter((_, index) => index !== indexToRemove));
            // Clear the file input
            const input = document.querySelector(`input[name="image_${indexToRemove}"]`);
            if (input) input.value = '';
        }
    };

    // حذف الصورة الرئيسية الموجودة
    const handleDeleteExistingThumbnail = () => {
        setDeleteThumbnail(true);
        setExistingThumbnail(null);
    };

    // حذف صورة إضافية موجودة
    const handleDeleteExistingImage = (imageUrl) => {
        setImagesToDelete([...imagesToDelete, imageUrl]);
    };

    // إلغاء حذف صورة إضافية
    const handleUndoDeleteImage = (imageUrl) => {
        setImagesToDelete(imagesToDelete.filter(img => img !== imageUrl));
    };

    // حفظ المنتج (إضافة أو تعديل)
    const handleSaveProduct = async (data) => {
        try {
            // Add text data with validation
            if (!data.name?.trim()) throw new Error('اسم المنتج مطلوب');
            if (!data.brand?.trim()) throw new Error('الماركة مطلوبة');
            if (!data.price || isNaN(data.price)) throw new Error('السعر مطلوب ويجب أن يكون رقماً');
            if (!data.description?.trim()) throw new Error('الوصف مطلوب');
            if (!data.category) throw new Error('الفئة مطلوبة');

            // Create FormData for file uploads
            const formData = new FormData();
            formData.append('name', data.name.trim());
            formData.append('brand', data.brand.trim());
            if (data.model?.trim()) {
                formData.append('model', data.model.trim());
            }
            formData.append('price', data.price.toString());
            formData.append('description', data.description.trim());
            formData.append('category', data.category);
            if (data.subCategory?.trim()) {
                formData.append('subCategory', data.subCategory.trim());
            }

            // Add specifications
            const specifications = {};
            if (data.cpu?.trim()) specifications.cpu = data.cpu.trim();
            if (data.ramMemory?.trim()) specifications.ramMemory = data.ramMemory.trim();
            if (data.hardDiskSize?.trim()) specifications.hardDiskSize = data.hardDiskSize.trim();
            if (data.screenSize?.trim()) specifications.screenSize = data.screenSize.trim();
            if (data.color?.trim()) specifications.color = data.color.trim();
            if (data.graphicsDescription?.trim()) specifications.graphicsDescription = data.graphicsDescription.trim();
            if (data.operatingSystem?.trim()) specifications.operatingSystem = data.operatingSystem.trim();
            if (data.specialFeatures?.trim()) {
                specifications.specialFeatures = data.specialFeatures.split(',').map(f => f.trim()).filter(f => f);
            }

            formData.append('specifications', JSON.stringify(specifications));

            // Add imagesToDelete for update operations
            if (productToEdit && imagesToDelete.length > 0) {
                formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
            }

            // Add deleteThumbnail flag if thumbnail is marked for deletion
            if (productToEdit && deleteThumbnail) {
                formData.append('deleteThumbnail', 'true');
            }

            // Get thumbnail file
            const thumbnailInput = document.querySelector('input[name="thumbnail"]');

            if (thumbnailInput && thumbnailInput.files && thumbnailInput.files.length > 0) {
                formData.append('thumbnail', thumbnailInput.files[0]);
            } else {
                if (!productToEdit) { // Only require thumbnail for new products
                    throw new Error('الصورة الرئيسية مطلوبة');
                }
            }

            // Get additional images from dynamic inputs
            imageInputs.forEach((inputId, index) => {
                const imageInput = document.querySelector(`input[name="image_${index}"]`);
                if (imageInput && imageInput.files && imageInput.files.length > 0) {
                    formData.append('images', imageInput.files[0]);
                }
            });

            let result;
            if (productToEdit) {
                result = await dispatch(updateProduct({ id: productToEdit._id, productData: formData })).unwrap();
            } else {
                result = await dispatch(createProduct(formData)).unwrap();
            }

            onClose();
            resetProductForm();
            setImageInputs([0]); // Reset image inputs

            // Clear file inputs
            if (thumbnailInput) thumbnailInput.value = '';
            imageInputs.forEach((_, index) => {
                const input = document.querySelector(`input[name="image_${index}"]`);
                if (input) input.value = '';
            });

        } catch (error) {
            console.error('Error saving product:', error);
            alert('حدث خطأ في حفظ المنتج: ' + (error?.message || error || 'خطأ غير معروف'));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-2 sm:p-4 pt-4 pb-4 sm:pt-12 sm:pb-12 z-50 animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-bg-white p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-4xl animate-in zoom-in duration-500 relative my-4 sm:my-12 max-h-[90vh] overflow-y-auto">
                {/* زر الخروج */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-text-light hover:text-text-dark transition-colors duration-200"
                    aria-label="إغلاق"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-text-dark text-center mb-6">
                    {productToEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                </h2>

                <form onSubmit={handleProductSubmit(handleSaveProduct)} className="space-y-4">
                    {/* الحقول الأساسية - عمودين */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">اسم المنتج</label>
                            <input
                                type="text"
                                {...productRegister('name')}
                                className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                            />
                            {productErrors.name && <p className="text-red-500 text-xs mt-1">{productErrors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">الماركة</label>
                            <input
                                type="text"
                                {...productRegister('brand')}
                                className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                            />
                            {productErrors.brand && <p className="text-red-500 text-xs mt-1">{productErrors.brand.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">الموديل (اختياري)</label>
                            <input
                                type="text"
                                {...productRegister('model')}
                                placeholder="مثال: 640 G2"
                                className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                            />
                            <p className="text-xs text-text-light mt-1">للابتوبات: مثل HP 640 G2</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">السعر</label>
                            <input
                                type="number"
                                {...productRegister('price')}
                                className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                            />
                            {productErrors.price && <p className="text-red-500 text-xs mt-1">{productErrors.price.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">الفئة</label>
                            <select
                                {...productRegister('category')}
                                className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                            >
                                <option value="Accessories">إكسسوارات</option>
                                <option value="Laptops">لابتوبات</option>
                            </select>
                            {productErrors.category && <p className="text-red-500 text-xs mt-1">{productErrors.category.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-2">الفئة الفرعية (اختياري)</label>
                            <input
                                type="text"
                                {...productRegister('subCategory')}
                                placeholder="مثال: Mouse, Keyboard, Headphone"
                                className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                            />
                            <p className="text-xs text-text-light mt-1">للإكسسوارات: Mouse, Keyboard, Headphone</p>
                        </div>
                    </div>

                    {/* الوصف - عرض كامل */}
                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">الوصف</label>
                        <textarea
                            {...productRegister('description')}
                            className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium resize-none"
                            rows="3"
                        />
                        {productErrors.description && <p className="text-red-500 text-xs mt-1">{productErrors.description.message}</p>}
                    </div>

                    {/* المواصفات التقنية */}
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold text-text-dark mb-4">المواصفات التقنية (اختيارية)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">المعالج</label>
                                <input
                                    type="text"
                                    {...productRegister('cpu')}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">الرام</label>
                                <input
                                    type="text"
                                    {...productRegister('ramMemory')}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">القرص الصلب</label>
                                <input
                                    type="text"
                                    {...productRegister('hardDiskSize')}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">حجم الشاشة</label>
                                <input
                                    type="text"
                                    {...productRegister('screenSize')}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">اللون</label>
                                <input
                                    type="text"
                                    {...productRegister('color')}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">كارت الشاشة (GPU)</label>
                                <input
                                    type="text"
                                    {...productRegister('graphicsDescription')}
                                    placeholder="مثال: Intel HD Graphics, NVIDIA GTX 1050"
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-2">نظام التشغيل</label>
                                <input
                                    type="text"
                                    {...productRegister('operatingSystem')}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-text-dark mb-2">المميزات الخاصة (مفصولة بفواصل)</label>
                                <input
                                    type="text"
                                    {...productRegister('specialFeatures')}
                                    placeholder="مثال: Backlit Keyboard, Fingerprint Reader, Lightweight"
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* الصورة الرئيسية */}
                    <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">الصورة الرئيسية {productToEdit ? '(اختياري)' : '*'}</label>

                        {/* عرض الصورة الرئيسية الموجودة */}
                        {existingThumbnail && !deleteThumbnail && (
                            <div className="mb-3 relative inline-block">
                                <img
                                    src={existingThumbnail}
                                    alt="الصورة الرئيسية الحالية"
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-primary-medium"
                                />
                                <button
                                    type="button"
                                    onClick={handleDeleteExistingThumbnail}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    title="حذف الصورة"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <p className="text-xs text-text-light mt-1">الصورة الحالية</p>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            name="thumbnail"
                            className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-medium file:text-white hover:file:bg-primary-dark"
                        />
                        <p className="text-xs text-text-light mt-1">
                            {existingThumbnail && !deleteThumbnail ? 'رفع صورة جديدة لاستبدال الحالية' : 'الصورة الرئيسية للمنتج'}
                        </p>
                    </div>

                    {/* الصور الإضافية - ديناميكية */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-text-dark">صور إضافية</h3>
                            <button
                                type="button"
                                onClick={handleAddImageInput}
                                className="px-4 py-2 bg-primary-medium text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors duration-200"
                            >
                                + إضافة صورة جديدة
                            </button>
                        </div>

                        {/* عرض الصور الإضافية الموجودة */}
                        {existingImages.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-text-dark mb-2">الصور الحالية</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {existingImages.map((imageUrl, index) => {
                                        const isMarkedForDeletion = imagesToDelete.includes(imageUrl);
                                        return (
                                            <div
                                                key={index}
                                                className={`relative group ${isMarkedForDeletion ? 'opacity-50' : ''
                                                    }`}
                                            >
                                                <img
                                                    src={imageUrl}
                                                    alt={`صورة ${index + 1}`}
                                                    className={`w-full h-24 object-cover rounded-lg ${isMarkedForDeletion
                                                        ? 'border-2 border-red-500'
                                                        : 'border-2 border-gray-200'
                                                        }`}
                                                />
                                                {isMarkedForDeletion ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUndoDeleteImage(imageUrl)}
                                                        className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 hover:bg-green-600 transition-colors"
                                                        title="إلغاء الحذف"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteExistingImage(imageUrl)}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                                        title="حذف الصورة"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                                {isMarkedForDeletion && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                        <span className="text-white text-xs font-bold">سيتم الحذف</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {imageInputs.map((inputId, index) => (
                                <div key={inputId} className="flex gap-2 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name={`image_${index}`}
                                            className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-medium file:text-white hover:file:bg-primary-dark"
                                        />
                                    </div>
                                    {imageInputs.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImageInput(index)}
                                            className="px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                            title="حذف"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-text-light mt-2">يمكنك إضافة عدة صور للمنتج</p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-gradient-to-r from-primary-medium to-accent-pink text-bg-white rounded-lg font-bold hover:from-primary-dark hover:to-accent-pink/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            {productToEdit ? 'تحديث المنتج' : 'إضافة المنتج'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
