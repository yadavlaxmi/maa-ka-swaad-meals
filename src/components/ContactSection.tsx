import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body font-semibold uppercase tracking-widest mb-2">Contact Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get Your <span className="text-primary">Tiffin</span> Today
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Call or WhatsApp us to start your subscription. We'll deliver right to your doorstep!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Phone, title: "Phone", info: "+91 98765 43210", link: "tel:+919876543210" },
            { icon: MessageCircle, title: "WhatsApp", info: "Chat with us", link: "https://wa.me/919876543210" },
            { icon: MapPin, title: "Location", info: "Your City, India", link: "#" },
            { icon: Clock, title: "Delivery Time", info: "12 PM & 8 PM", link: "#" },
          ].map((item, i) => (
            <motion.a
              key={item.title}
              href={item.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
              <p className="font-body text-muted-foreground">{item.info}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
