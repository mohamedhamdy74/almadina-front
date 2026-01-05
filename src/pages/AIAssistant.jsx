import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { Bot, Wrench, Sparkles } from 'lucide-react';

const AIAssistant = () => {
    const [activeTab, setActiveTab] = useState('recommendation');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-32 md:pt-48 pb-12 px-4 overflow-x-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fadeIn">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
                        مساعد الذكاء الاصطناعي
                    </h1>
                    <p className="text-lg md:text-xl text-blue-200">
                        نظام ذكي لمساعدتك في اختيار الأجهزة وحل المشاكل التقنية
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-1.5 md:p-2 mb-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                        <button
                            onClick={() => setActiveTab('recommendation')}
                            className={`py-3 md:py-4 px-3 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'recommendation'
                                ? 'bg-white text-blue-600 shadow-xl transform scale-102 md:scale-105'
                                : 'text-white hover:bg-white/20'
                                }`}
                        >
                            <Bot className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="hidden xs:inline">ترشيح الأجهزة</span>
                            <span className="xs:hidden">ترشيح</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('troubleshoot')}
                            className={`py-3 md:py-4 px-3 md:px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'troubleshoot'
                                ? 'bg-white text-blue-600 shadow-xl transform scale-102 md:scale-105'
                                : 'text-white hover:bg-white/20'
                                }`}
                        >
                            <Wrench className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="hidden xs:inline">حل الأعطال</span>
                            <span className="xs:hidden">الأعطال</span>
                        </button>
                    </div>
                </div>

                {/* Chat Interface Container */}
                <div className="h-[500px] md:h-[600px] w-full">
                    {activeTab === 'recommendation' ? (
                        <ChatInterface
                            key="recommendation"
                            mode="recommendation"
                            endpoint="recommendation"
                            placeholder="مثال: أحتاج لابتوب للألعاب بميزانية 30000 جنيه"
                        />
                    ) : (
                        <ChatInterface
                            key="troubleshoot"
                            mode="troubleshoot"
                            endpoint="troubleshoot"
                            placeholder="مثال: جهازي لا يعمل عند الضغط على زر التشغيل"
                        />
                    )}
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 md:p-6 text-white border border-white/10 hover:bg-white/20 transition-colors">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                            <Bot className="w-6 h-6 text-blue-300" />
                            ترشيح الأجهزة
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                            يستخدم تقنية RAG المتقدمة للبحث في قاعدة البيانات وإيجاد أفضل الأجهزة التي تناسب احتياجاتك وميزانيتك
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 md:p-6 text-white border border-white/10 hover:bg-white/20 transition-colors">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                            <Wrench className="w-6 h-6 text-emerald-300" />
                            حل الأعطال
                        </h3>
                        <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                            مهندس دعم فني ذكي يساعدك في تشخيص المشاكل وحلها خطوة بخطوة بطريقة سهلة ومفهومة
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
