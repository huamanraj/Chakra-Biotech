"use client";

import { motion } from "framer-motion";
import { Leaf, Droplets, Sun, Flower, Award } from "lucide-react";

const steps = [
  {
    icon: Leaf,
    title: "Planting Seeds",
    description: "We put the seed in the soil",
  },
  {
    icon: Droplets,
    title: "Plant Irrigation",
    description: "Water is one of the requirements of the plant",
  },
  {
    icon: Sun,
    title: "Plant Light Sun",
    description: "Is one of the needs of the plant",
  },
  {
    icon: Flower,
    title: "Saffron Harvest",
    description: "Saffron plant is ready to be harvested",
  },
  {
    icon: Award,
    title: "Quality Testing",
    description: "Rigorous testing ensures premium quality",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
            How to Plant a Saffron Plant
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center bg-card group-hover:border-primary transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -translate-y-1/2" />
                )}
              </div>
              <h3 className="font-serif font-semibold text-foreground mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
