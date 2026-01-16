"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { QualityCertification } from "@/components/ui/quality-certification";
import Link from "next/link";
import { Award, Leaf, Users, Globe, ArrowRight, ShieldCheck, Heart } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description: "100% genuine saffron with certificates of authenticity for every batch.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Eco-friendly farming practices that preserve the land for future generations.",
  },
  {
    icon: Heart,
    title: "Quality",
    description: "Rigorous quality control ensures only the finest saffron reaches you.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Supporting local farmers and communities in Kashmir and beyond.",
  },
];

const timeline = [
  { year: "1985", title: "Our Beginning", description: "Started as a small family farm in Kashmir" },
  { year: "1995", title: "First Export", description: "Expanded to international markets" },
  { year: "2008", title: "Organic Certified", description: "Received organic certification" },
  { year: "2015", title: "Training Academy", description: "Launched saffron training programs" },
  { year: "2024", title: "Digital Presence", description: "Bringing premium saffron online" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/saffron-field.jpg)` }}
        />
        <div className="absolute inset-0 bg-secondary/85" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium">Our Story</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary-foreground mt-2">
              From Kashmir's Heart to Your Home
            </h1>
            <p className="text-secondary-foreground/80 mt-6 text-lg leading-relaxed">
              For over three decades, we've been cultivating the world's finest saffron in the
              pristine valleys of Kashmir. Our commitment to quality and authenticity has made us a
              trusted name in premium saffron worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/hero-saffron.jpg"
                alt="Premium Saffron"
                className="rounded-3xl shadow-elevated"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground">Our Mission</h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  To bring the authentic taste and health benefits of premium Kashmiri saffron to
                  every kitchen worldwide, while supporting sustainable farming practices and
                  empowering local communities.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-serif font-bold text-foreground">Our Vision</h2>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  To become the world's most trusted source of premium saffron, setting the gold
                  standard for quality, authenticity, and customer experience in the spice industry.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <Award className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-2xl font-bold text-foreground mt-2">35+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-2xl font-bold text-foreground mt-2">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-primary mx-auto" />
                  <div className="text-2xl font-bold text-foreground mt-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl text-center shadow-card"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Our Journey
            </h2>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block flex-1" />
                <div className="relative z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                </div>
                <div className="flex-1 bg-card p-6 rounded-xl shadow-card">
                  <span className="text-primary font-bold">{item.year}</span>
                  <h3 className="font-serif text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Certification */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <QualityCertification 
            variant="full"
            showMetrics={true}
            showCertifications={true}
            animated={true}
            className="max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary-foreground">
              Experience the SaffronGold Difference
            </h2>
            <p className="text-secondary-foreground/80 mt-4 max-w-xl mx-auto">
              Browse our collection of premium saffron products and taste the difference quality
              makes.
            </p>
            <Button size="lg" asChild className="mt-6">
              <Link href="/products">
                Explore Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
