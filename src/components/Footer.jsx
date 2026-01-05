// Footer.jsx
import React from "react";
import { Phone, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-brand text-bg-white font-cairo ">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start" dir="rtl">
          {/* اللوغو/نبذة */}
          <div className="space-y-3">
                      <h3 className="text-2xl font-bold">المدينة ستور</h3>
            <p className="text-bg-light max-w-sm">
              أفضل مكان لشراء لابتوبات وإكسسواراتها — منتجات موثوقة، خدمة سريعة،
              وتجربة شراء سهلة. لو احتجت أي مساعدة تواصل معانا بأي وقت.
            </p>

            <div className="flex gap-3 mt-3">
              <a
                href="https://wa.me/201553091959"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-bg-white/10 px-3 py-2 text-sm transition hover:scale-105"
                aria-label="phone"
              >
                <Phone className="w-4 h-4" />
                واتساب
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-bg-white/10 px-3 py-2 text-sm transition hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
                فيسبوك
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-bg-white/10 px-3 py-2 text-sm transition hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
                انستاجرام
              </a>
            </div>
          </div>

          {/* العنوان وبيانات التواصل */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">تواصل معنا</h4>

            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-accent-pink" />
              <div>
                <p className="font-medium">العنوان</p>
                <p className="text-bg-light text-sm">
                  اسوان / عباس فريد / دخلة السوق بجوار مسجد منصور حمادة
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-success" />
              <div>
                <p className="font-medium">رقم التليفون</p>
                <a
                  href="tel:+201553091959"
                  className="block text-bg-light text-sm hover:underline"
                >
                  01553091959
                </a>
              </div>
            </div>
          </div>

          {/* روابط سريعة / سياسات */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold">روابط مفيدة</h4>
            <ul className="space-y-2 text-sm text-bg-white/90">
              <li>
                <a href="#" className="block hover:underline">
                  سياسة الاسترجاع
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  الشحن والتوصيل
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  الأسئلة الشائعة
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  تواصل مع البائع
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <span className="text-xs text-bg-white/60">
                © {new Date().getFullYear()} المدينة ستور — كل الحقوق محفوظة
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
