import React from "react";
import { ShieldCheck, Lock, RotateCcw } from "lucide-react";

function TrustSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-primary-dark" />,
      title: "ضمان الجودة",
      desc: "منتجات أصلية 100% مع ضمان ضد عيوب الصناعة.",
    },
    {
      icon: <Lock className="w-10 h-10 text-accent-pink" />,
      title: "الثقة",
      desc: "ثقة عملائنا هي أكبر شهادة على التزامنا بالمصداقية.",
    },
    {
      icon: <RotateCcw className="w-10 h-10 text-primary-medium" />,
      title: "استرجاع سهل",
      desc: "استرجاع أو استبدال خلال 14 يوم بدون تعقيد.",
    },
  ];

  return (
    <section className="py-16 bg-bg-light font-cairo">
      {/* العنوان */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-dark animate-fade-up">
          تسوق وانت مطمّن 
        </h2>
        <p className="mt-2 text-text-medium">
          بنقدملك أفضل تجربة شراء بكل راحة وأمان
        </p>
      </div>

      {/* الكروت */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group bg-bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 
                       transition-all duration-500 hover:scale-105 hover:shadow-lg animate-fade-up"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-text-dark mb-2">
              {feature.title}
            </h3>
            <p className="text-text-medium text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustSection;
