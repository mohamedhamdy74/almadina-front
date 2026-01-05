import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, MapPin, Mail, Clock, CheckCircle, Award, Gift, Shield, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function About() {
    // Fixed coordinates for the store location
    const position = [24.088527580475343, 32.894893957672714];

    return (
        <div className="font-cairo bg-bg-light min-h-screen pt-48 pb-12">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-16">
                <div className="bg-gradient-to-r from-primary-dark to-primary-medium rounded-3xl p-12 text-center text-white shadow-2xl animate-in fade-in slide-in-from-top duration-700">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">من نحن</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-100 leading-relaxed">
                        المدينة ستور.. وجهتك الأولى لأفضل اللابتوبات الاستيراد والإكسسوارات الأصلية في أسوان.
                        نجمع بين الجودة العالية والسعر المناسب لضمان أفضل تجربة لك.
                    </p>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="container mx-auto px-6 mb-20">
                <h2 className="text-3xl font-bold text-center text-text-dark mb-12">لماذا تختار المدينة ستور؟</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Award className="w-10 h-10 text-primary-medium" />, title: "جودة مضمونة", desc: "جميع أجهزتنا يتم فحصها بدقة لضمان أعلى كفاءة." },
                        { icon: <Gift className="w-10 h-10 text-primary-medium" />, title: "هدايا وخصومات", desc: "خصومات خاصة عند زيارة المحل، وهدية (ماوس + شنطة) مع كل جهاز." },
                        { icon: <Shield className="w-10 h-10 text-primary-medium" />, title: "ضمان حقيقي", desc: "نقدم ضمان شامل على جميع المنتجات لراحتك." },
                        { icon: <CheckCircle className="w-10 h-10 text-primary-medium" />, title: "خدمة ما بعد البيع", desc: "دعم فني متواصل لمساعدتك في أي وقت." },
                    ].map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
                            <div className="bg-bg-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text-dark mb-3">{item.title}</h3>
                            <p className="text-text-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact & Map Section */}
            <section className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Contact Info */}
                    <div className="p-10 lg:p-16 bg-gradient-brand text-white flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-8">تواصل معنا</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">العنوان</h3>
                                    <p className="text-gray-100">اسوان / عباس فريد / دخلة السوق بجوار مسجد منصور حمادة</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">رقم الهاتف</h3>
                                    <a href="tel:+201553091959" className="text-gray-100 hover:text-white transition-colors text-lg dir-ltr block text-right">
                                        01553091959
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">مواعيد العمل</h3>
                                    <p className="text-gray-100">يومياً من 10 صباحاً حتى 11 مساءً</p>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-white/20">
                                <a
                                    href="https://wa.me/201553091959"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block text-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-colors duration-300 shadow-lg"
                                >
                                    تواصل معنا عبر واتساب
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[500px] w-full relative z-0">
                        <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    <div className="font-cairo text-center">
                                        <h3 className="font-bold text-primary-medium">المدينة ستور</h3>
                                        <p>اسوان، عباس فريد</p>
                                    </div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>

                {/* Google Maps Button */}
                <div className="container mx-auto px-6 mt-8">
                    <a
                        href={`https://www.google.com/maps?q=${position[0]},${position[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 bg-gradient-brand text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 max-w-md mx-auto"
                    >
                        <Navigation className="w-5 h-5" />
                        <span>افتح الموقع في خرائط جوجل</span>
                    </a>
                </div>
            </section>
        </div>
    );
}
