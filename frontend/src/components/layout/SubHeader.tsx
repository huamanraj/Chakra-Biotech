import { Phone, Truck, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";

const announcements = [
  { icon: Truck, text: "Free Shipping on Orders Over ₹2000" },
  { icon: Shield, text: "100% Authentic Kashmiri Saffron" },
  { icon: Clock, text: "Same Day Dispatch on Orders Before 2 PM" },
  { icon: Phone, text: "24/7 WhatsApp Support" },
];

export function SubHeader() {
  return (
    <div className="bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-between py-2 text-xs sm:text-sm gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {announcements.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 whitespace-nowrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  delay: index * 0.5 
                }}
              >
                <item.icon className="w-3.5 h-3.5 text-primary" />
              </motion.div>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
