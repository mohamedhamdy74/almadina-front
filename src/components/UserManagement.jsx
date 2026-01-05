import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/slices/userSlice';

export default function UserManagement({ users }) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', governorate: '', area: '', role: 'user' });

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            governorate: user.governorate || '',
            area: user.area || '',
            role: user.role
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            try {
                await dispatch(deleteUser(userId)).unwrap();
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateUser({ id: editingUser._id, userData: formData })).unwrap();
            setIsModalOpen(false);
            setEditingUser(null);
        } catch (error) {
            alert(error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-bg-white rounded-2xl shadow-xl p-6" dir="rtl">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-text-dark mb-4">إدارة المستخدمين</h2>
                <input
                    type="text"
                    placeholder="ابحث عن مستخدم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium transition-all"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-primary-medium to-primary-dark text-bg-white">
                        <tr>
                            <th className="px-6 py-4 text-right text-sm font-semibold">الاسم</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">البريد الإلكتروني</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">التليفون</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">المحافظة</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">المنطقة</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">الدور</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">تاريخ الإنشاء</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`border-b border-bg-light hover:bg-primary-light/10 transition-colors ${index % 2 === 0 ? 'bg-bg-white' : 'bg-bg-light/50'
                                        }`}
                                >
                                    <td className="px-6 py-4 text-text-dark font-semibold">{user.name}</td>
                                    <td className="px-6 py-4 text-text-medium">{user.email}</td>
                                    <td className="px-6 py-4 text-text-medium">{user.phone || '-'}</td>
                                    <td className="px-6 py-4 text-text-medium">{user.governorate || '-'}</td>
                                    <td className="px-6 py-4 text-text-medium">{user.area || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                                                ? 'bg-accent-pink text-bg-white'
                                                : 'bg-success/20 text-success'
                                                }`}
                                        >
                                            {user.role === 'admin' ? 'أدمن' : 'مستخدم'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-light text-sm">
                                        {formatDate(user.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="px-4 py-2 bg-primary-medium text-bg-white rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 text-sm font-semibold"
                                            >
                                                تعديل
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="px-4 py-2 bg-accent-pink text-bg-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 text-sm font-semibold"
                                            >
                                                حذف
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-12 text-center text-text-light">
                                    لا توجد مستخدمين
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in duration-300">
                        <h3 className="text-2xl font-bold text-text-dark mb-6">تعديل المستخدم</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2">الاسم</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2">البريد الإلكتروني</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2">رقم التليفون</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2">المحافظة</label>
                                <input
                                    type="text"
                                    value={formData.governorate}
                                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-text-dark font-semibold mb-2">المنطقة</label>
                                <input
                                    type="text"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-text-dark font-semibold mb-2">الدور</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 border border-bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium"
                                >
                                    <option value="user">مستخدم</option>
                                    <option value="admin">أدمن</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-gradient-to-r from-primary-medium to-primary-dark text-bg-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    حفظ التغييرات
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 bg-bg-light text-text-dark rounded-lg font-bold hover:bg-text-light hover:text-bg-white transition-all duration-300"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
