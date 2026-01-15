import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, Wrench, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';


const ChatInterface = ({ mode, endpoint, placeholder }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // useEffect(() => {
    //     if (messages.length > 0) {
    //         scrollToBottom();
    //     }
    // }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');

        // Add user message to chat
        const newUserMessage = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            const API_BASE = import.meta.env.VITE_API_URL
                ? (import.meta.env.VITE_API_URL.endsWith('/api') ? import.meta.env.VITE_API_URL : `${import.meta.env.VITE_API_URL}/api`)
                : '/api';
            const response = await fetch(`${API_BASE}/ai/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: messages,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    const limitMessage = {
                        role: 'assistant',
                        content: data.message || "خلصت سؤالك النهاردة يا بطل! تقدر تسأل تاني بكرة بإذن الله. 😉",
                    };
                    setMessages(prev => [...prev, limitMessage]);
                    return;
                }
                throw new Error(data.message || 'فشل في الحصول على الرد');
            }

            // Add AI response to chat
            const aiMessage = {
                role: 'assistant',
                content: data.message,
                retrievedProducts: data.retrievedProducts || null,
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWhatsAppClick = (productName) => {
        const message = `مرحباً، أنا مهتم بمنتج: ${productName}`;
        const url = `https://wa.me/201553091959?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-2xl overflow-hidden border border-slate-200/60 backdrop-blur-xl">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 md:space-y-6 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-6 animate-fadeIn">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                                <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                                    {mode === 'recommendation' ? (
                                        <Bot className="w-16 h-16 text-blue-600" />
                                    ) : (
                                        <Wrench className="w-16 h-16 text-emerald-600" />
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-slate-800">
                                    {mode === 'recommendation' ? 'مساعدك الذكي لاختيار اللابتوب' : 'خبير الصيانة والدعم الفني'}
                                </h3>
                                <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
                                    {mode === 'recommendation'
                                        ? 'أخبرني عن استخدامك وميزانيتك، وسأرشح لك أفضل الخيارات المتاحة في المتجر'
                                        : 'صف لي المشكلة التي تواجهها وسأساعدك في حلها خطوة بخطوة'}
                                </p>
                                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-sm mx-auto shadow-sm">
                                    <p className="text-amber-800 text-sm font-medium flex items-center justify-center gap-2">
                                        ⚠️ تنبيه: مسموح بسؤال واحد فقط يومياً بالذكاء الاصطناعي، فتأكد من كتابة كل ما تحتاجه بدقة.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                        <div className={`flex gap-2 md:gap-4 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                                : 'bg-white text-slate-700 border border-slate-100'
                                }`}>
                                {msg.role === 'user' ? <div className="font-bold text-xs md:text-sm">أنت</div> : <Bot className="w-5 h-5 md:w-6 md:h-6" />}
                            </div>

                            <div className="space-y-4 w-full">
                                {/* Message Bubble */}
                                <div
                                    className={`rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-sm text-base md:text-lg leading-relaxed ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
                                        : 'bg-white text-slate-800 border border-slate-200/60 rounded-tl-none'
                                        }`}
                                >
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>

                                {/* Retrieved Products Cards */}
                                {msg.retrievedProducts && msg.retrievedProducts.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        {msg.retrievedProducts.map((product, idx) => (
                                            <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                                                <div className="relative h-48 overflow-hidden bg-slate-100">
                                                    <img
                                                        src={getImageUrl(product.thumbnail || product.image || (product.images && product.images[0]))}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        onError={(e) => {
                                                            e.target.src = 'https://placehold.co/600x400/f3f4f6/374151?text=' + encodeURIComponent(product.name);
                                                            e.target.onerror = null;
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-4 space-y-3">
                                                    <h4 className="font-bold text-slate-800 line-clamp-1" title={product.name}>
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-blue-600 font-bold text-lg">
                                                        {product.price.toLocaleString()} جنيه
                                                    </p>
                                                    <div className="flex gap-2 pt-2">
                                                        <Link
                                                            to={`/${(product.category || 'laptops').toLowerCase()}/${product._id}`}
                                                            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            التفاصيل
                                                        </Link>
                                                        <button
                                                            onClick={() => handleWhatsAppClick(product.name)}
                                                            className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 py-2 rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            واتساب
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start animate-fadeIn">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-md">
                                <Bot className="w-6 h-6 text-slate-700" />
                            </div>
                            <div className="bg-white text-slate-800 rounded-2xl rounded-tl-none px-6 py-4 shadow-sm border border-slate-200/60">
                                <div className="flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                                    <span className="text-slate-500 text-sm font-medium">جاري التحليل والكتابة...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-6 bg-white/80 backdrop-blur-md border-t border-slate-200/60">
                <form onSubmit={sendMessage} className="flex gap-2 md:gap-4 relative">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={placeholder}
                        disabled={isLoading}
                        className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-all text-base md:text-lg shadow-sm disabled:bg-slate-50 disabled:cursor-not-allowed bg-slate-50/50 focus:bg-white"
                        dir="rtl"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputMessage.trim()}
                        className="px-4 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <span className="hidden xs:inline">إرسال</span>
                        <Send className="w-5 h-5 -rotate-90" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
