"use client";

import { motion } from "framer-motion";
import { CheckCircle, Leaf, Globe, Heart, Shield, Award, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Grown without pesticides or chemicals in pristine Kashmir valleys",
  },
  {
    icon: Shield,
    title: "Lab Tested",
    description: "Every batch tested for purity, potency, and authenticity",
  },
  {
    icon: Award,
    title: "Grade A+ Quality",
    description: "Only the finest stigmas hand-selected for premium quality",
  },
  {
    icon: Globe,
    title: "Global Shipping",
    description: "Fast, secure delivery to 25+ countries worldwide",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Rich in antioxidants with proven wellness benefits",
  },
  {
    icon: Sparkles,
    title: "Fresh Harvest",
    description: "Direct from farm to your doorstep for maximum freshness",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/saffron-field.jpg"
              alt="Saffron Fields of Kashmir"
              className="rounded-3xl shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-lg hidden md:block">
              <div className="text-4xl font-bold font-serif">35+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-6">
              The <span className="text-gradient-saffron">Finest Saffron</span> From Kashmir Valley
            </h2>
            <p className="text-muted-foreground mb-8">
              We take pride in bringing you the purest, most aromatic saffron directly from the 
              heart of Kashmir. Our commitment to quality ensures you receive only the best.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
