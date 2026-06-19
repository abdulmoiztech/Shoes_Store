import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Plus, Minus, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQS = [
  {
    question: 'Are all your sneakers 100% genuine and original?',
    answer: 'Absolutely. We source all our footwear catalog directly from verified brand manufacturers (Nike, Adidas, etc.) or certified retail partners. Every order ships in authentic designer boxes with serial holographic tracking intact. Zero replicas are allowed.'
  },
  {
    question: 'How long does Express delivery take?',
    answer: 'Orders cleared on business days are dispatched from our tracking centers within 24 hours. Transit to major cities typically takes 2 to 4 business days. You will receive an email tracking link once your cargo departs.'
  },
  {
    question: 'What is your refund or exchange policy?',
    answer: 'We offer an expansive 30-day return policy. If you ordered the wrong size or changed your mind, ship the shoe back inside its raw brand packaging (unworn outdoors) to claim a full refund or direct item exchange.'
  },
  {
    question: 'How do I choose my ultimate shoe size?',
    answer: 'All sneakers are labeled in standard US Mens or Womens sizing guidelines. If you represent narrow arches, we recommend purchasing true to size. For ultra-wide athletes or runners, we recommend sizing up by a half size.'
  }
];

export default function AboutContactView() {
  // Contact state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formBody, setFormBody] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ state index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formName && formEmail && formBody) {
      setIsSent(true);
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormBody('');
      setTimeout(() => setIsSent(false), 5000);
    }
  };

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div id="about-contact-view" className="space-y-16 sm:space-y-24 text-neutral-800 text-left">
      {/* Brand philosophy statement */}
      <section id="brand-heritage" className="relative bg-neutral-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-wider font-sans">
            <Sparkles className="w-3 text-orange-400 shrink-0" />
            <span>Since 2018</span>
          </div>
          <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-white">
            WE ARCHIVE THE <br />
            <span className="text-orange-500 font-extrabold">ULTIMATE STRIDES.</span>
          </h1>
          <p className="font-sans text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
             SoleArcade was born out of a simple obsession: providing a pristine, high-performance footwear destination without the markup of high street brokers. We focus purely on material accuracy, certified brand integrity, and lightning fast dispatch velocities so you can stay fast and sleek, everywhere.
          </p>
        </div>
      </section>

      {/* Two columns: Interactive Contact form vs Contact coordinates */}
      <section id="contact-split-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact info side */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <span className="text-xs text-orange-500 font-bold tracking-wider uppercase font-sans">Let's coordinate</span>
            <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-neutral-900">
              VISIT OUR HEAVYQUARTERS
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              Want to try our running fits or check out rare sneakers in person? Pop into our Miami storefront, or coordinate directly with our 24/7 client happiness team below.
            </p>
          </div>

          {/* Icon lists */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 border border-neutral-100 rounded-2xl bg-neutral-50/50">
              <div className="p-3 bg-white rounded-xl shadow-sm text-orange-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider leading-none">Flagship Store Location</h4>
                <p className="text-xs text-neutral-600 font-light">129 Ocean Drive, Suite 400, Miami, Florida, US</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-neutral-100 rounded-2xl bg-neutral-50/50">
              <div className="p-3 bg-white rounded-xl shadow-sm text-orange-500 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider leading-none">Electronic Support Inbox</h4>
                <p className="text-xs text-neutral-600 font-light">support@solearcade.com (avg response: 2h)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-neutral-100 rounded-2xl bg-neutral-50/50">
              <div className="p-3 bg-white rounded-xl shadow-sm text-orange-500 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider leading-none">Voice Hotline Coordinates</h4>
                <p className="text-xs text-neutral-600 font-light">+1 (800) 555-SOLE (Mon-Fri, 9am - 6pm EST)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 border border-neutral-100 rounded-2xl bg-neutral-50/50">
              <div className="p-3 bg-white rounded-xl shadow-sm text-orange-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider leading-none">Flagship Store Hours</h4>
                <p className="text-xs text-neutral-600 font-light">10:00 AM - 9:00 PM EST (Every single day)</p>
              </div>
            </div>
          </div>

          {/* Micro Map Mock */}
          <div id="miami-map-mockup" className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-105 shadow-inner flex flex-col items-center justify-center p-6 text-center">
            {/* styled vector grids */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500 flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-orange-500 animate-bounce">
                <MapPin className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-[10px] font-bold text-neutral-800 bg-white px-2.5 py-1 rounded-full border border-neutral-200 mt-2 shadow-sm font-sans tracking-wide uppercase">
                SoleArcade Flagship
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 absolute bottom-3 left-3">
              Miami shoreline grid view map 4.0
            </div>
          </div>
        </div>

        {/* Form panel side */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-neutral-100 rounded-3xl shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-display font-medium text-xl text-neutral-900 leading-tight">
              SEND SECURED MESSAGE
            </h3>
            <p className="text-xs text-neutral-500">
              Drop us your queries and sizes below. Our service division responds almost instantly.
            </p>
          </div>

          {/* Success toast inside form area */}
          <AnimatePresence>
            {isSent && (
              <motion.div
                id="contact-success-toast"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center space-x-2.5 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-green-605 shrink-0" />
                <span>Message authorized successfully! We'll reach out within 2 hours.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                  Your Full Name *
                </label>
                <input
                  id="contact-form-name"
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Peter Parker"
                  className="w-full px-4 py-2.5 bg-neutral-0 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                  Email Coordinates *
                </label>
                <input
                  id="contact-form-email"
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g., address@domain.com"
                  className="w-full px-4 py-2.5 bg-neutral-0 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                Topic / Subject (Optional)
              </label>
              <input
                id="contact-form-subject"
                type="text"
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
                placeholder="e.g., Sizing details on Air Max Edge"
                className="w-full px-4 py-2.5 bg-neutral-0 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-600 mb-1.5 uppercase font-sans">
                Your Message Body *
              </label>
              <textarea
                id="contact-form-body"
                required
                rows={4}
                value={formBody}
                onChange={(e) => setFormBody(e.target.value)}
                placeholder="Write your footwear inquiries or stock questions here..."
                className="w-full px-4 py-2.5 bg-neutral-0 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              id="contact-submit-btn"
              type="submit"
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-97 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmit Message</span>
            </button>
          </form>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq-accordions" className="bg-neutral-50 rounded-2xl p-8 sm:p-12 space-y-10">
        <div className="max-w-2xl text-left space-y-1">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-neutral-200/60 rounded-full text-[10px] font-bold text-neutral-550 uppercase">
            <HelpCircle className="w-3.5 h-3.5 mr-0.5 text-neutral-500" />
            <span>CUSTOMER HELPMATE DESK</span>
          </div>
          <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-neutral-900">
            COMMON INQUIRIES
          </h2>
          <p className="text-xs text-neutral-500 font-light">
            Quickly browse sizing standards, shipment transits, authentic items benchmarks, and returning policies.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-medium text-sm sm:text-base text-neutral-800 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <Minus className="w-4.5 h-4.5 text-neutral-400 shrink-0 ml-4" />
                  ) : (
                    <Plus className="w-4.5 h-4.5 text-neutral-400 shrink-0 ml-4" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-neutral-50 bg-neutral-50/50 overflow-hidden"
                    >
                      <p className="p-5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
