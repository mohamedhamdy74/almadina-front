import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { Bot, Wrench, Sparkles } from 'lucide-react';

const AIAssistant = () => {
    const [activeTab, setActiveTab] = useState('recommendation');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-48 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-fadeIn">
                    <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
                        <Sparkles className="w-10 h-10 text-yellow-400" />
                        مساعد الذكاء الاصطناعي
                    </h1>
                    <p className="text-xl text-blue-200">
                        نظام ذكي لمساعدتك في اختيار الأجهزة وحل المشاكل التقنية
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 mb-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setActiveTab('recommendation')}
                            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'recommendation'
                                ? 'bg-white text-blue-600 shadow-xl transform scale-105'
                                : 'text-white hover:bg-white/20'
                                }`}
                        >
                            <Bot className="w-6 h-6" />
                            ترشيح الأجهزة
                        </button>
                        <button
                            onClick={() => setActiveTab('troubleshoot')}
                            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'troubleshoot'
                                ? 'bg-white text-blue-600 shadow-xl transform scale-105'
                                : 'text-white hover:bg-white/20'
                                }`}
                        >
                            <Wrench className="w-6 h-6" />
                            حل الأعطال
                        </button>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="h-[600px]">
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
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-colors">
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                            <Bot className="w-6 h-6 text-blue-300" />
                            ترشيح الأجهزة
                        </h3>
                        <p className="text-blue-100 leading-relaxed">
                            يستخدم تقنية RAG المتقدمة للبحث في قاعدة البيانات وإيجاد أفضل الأجهزة التي تناسب احتياجاتك وميزانيتك
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/10 hover:bg-white/20 transition-colors">
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                            <Wrench className="w-6 h-6 text-emerald-300" />
                            حل الأعطال
                        </h3>
                        <p className="text-blue-100 leading-relaxed">
                            مهندس دعم فني ذكي يساعدك في تشخيص المشاكل وحلها خطوة بخطوة بطريقة سهلة ومفهومة
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
