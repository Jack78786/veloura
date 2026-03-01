import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const AboutView = () => {
  return (
    <main className="pt-24">
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=1000"
              alt="Our Story"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/5] object-cover rounded-sm"
            />
            <div className="absolute -bottom-10 -right-10 hidden lg:block w-64 h-80 border-8 border-veloura-nude -z-10"></div>
          </motion.div>
          
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-veloura-gold font-bold mb-6 block">Our Legacy</span>
            <h1 className="text-5xl font-serif mb-8 leading-tight">Empowering Women Through Timeless Style</h1>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Founded in 2020, Veloura was born from a simple yet powerful vision: to create a fashion house that celebrates the multifaceted nature of the modern woman. We believe that elegance is not just an aesthetic, but a state of mind.
              </p>
              <p>
                Our journey began in a small studio with a focus on handcrafted leather bags. Today, we have expanded into a full lifestyle brand, yet our core values remain unchanged. Every piece in our collection is designed with intention, using premium materials that stand the test of time.
              </p>
              <p>
                At Veloura, we are more than just a fashion brand. We are a community dedicated to empowering women to feel confident, sophisticated, and authentically themselves. Our collections are inspired by the strength and grace of women who lead, create, and inspire every day.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-200 pt-12">
              <div>
                <p className="text-3xl font-serif text-veloura-gold mb-1">100%</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Premium Quality</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-veloura-gold mb-1">50k+</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-veloura-gold mb-1">Global</p>
                <p className="text-[10px] uppercase tracking-widest font-bold">Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const ContactView = () => {
  return (
    <main className="pt-24 bg-white">
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-veloura-gold font-bold mb-6 block">Get In Touch</span>
          <h1 className="text-5xl font-serif mb-4">We'd Love to Hear From You</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Whether you have a question about our collections, shipping, or just want to say hello, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 space-y-12">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-veloura-beige flex items-center justify-center rounded-full shrink-0">
                <Mail className="w-5 h-5 text-veloura-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Email Us</h4>
                <p className="text-gray-600 text-sm">concierge@veloura.com</p>
                <p className="text-gray-600 text-sm">press@veloura.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-veloura-beige flex items-center justify-center rounded-full shrink-0">
                <Phone className="w-5 h-5 text-veloura-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Call Us</h4>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-600 text-sm">Mon-Fri: 9am - 6pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-veloura-beige flex items-center justify-center rounded-full shrink-0">
                <MapPin className="w-5 h-5 text-veloura-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Visit Us</h4>
                <p className="text-gray-600 text-sm">742 Madison Avenue</p>
                <p className="text-gray-600 text-sm">New York, NY 10065</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-veloura-beige p-10 rounded-sm">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-veloura-gold outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-veloura-gold outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Subject</label>
                <select className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-veloura-gold outline-none">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Returns & Exchanges</option>
                  <option>Press & Media</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
                <textarea
                  rows={6}
                  placeholder="How can we help you?"
                  className="w-full bg-white border-none p-4 text-sm focus:ring-1 focus:ring-veloura-gold outline-none resize-none"
                ></textarea>
              </div>
              <button type="button" className="btn-luxury w-full flex items-center justify-center gap-3">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
