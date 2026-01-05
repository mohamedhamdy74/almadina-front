import React from "react";
import { Link } from "react-router-dom";
import { Laptop, Headphones } from "lucide-react";

const categories = [
  {
    title: "اللابتوبات",
    desc: "أفضل أجهزة لابتوب استيراد بحالة ممتازة.",
    to: "/laptops",
    Icon: Laptop,
  },
  {
    title: "الإكسسوارات",
    desc: "سماعات، ماوس، كيبورد وإكسسوارات أصلية.",
    to: "/accessories",
    Icon: Headphones,
  },
];

export default function Categories() {
  return (
    <section className="bg-bg-light py-12">
      <div className="container mx-auto px-6" dir="rtl">
        <h2 className="text-3xl md:text-4xl font-bold text-text-dark text-center mb-8">
          تسوق حسب القسم
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(({ title, desc, to, Icon }, idx) => (
            <Link
              key={title}
              to={to}
              className="group relative overflow-hidden rounded-2xl bg-gradient-brand text-bg-white p-6 min-h-[180px] shadow-sm hover:shadow-lg transition-transform duration-300 will-change-transform animate-in fade-in slide-in-from-bottom-6"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              {/* زينة خفيفة بخلفية شفافة */}
              <span className="pointer-events-none absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
              <span className="pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-black/10 blur-2xl" />

              <div className="relative z-10 flex items-center gap-4">
                <span className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-xl bg-bg-white/15 backdrop-blur-sm border border-white/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-9 h-9 md:w-12 md:h-12" />
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
                  <p className="text-bg-white/90 text-sm mt-1">{desc}</p>
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  تصفح الآن
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}