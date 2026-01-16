"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Sprout,
  FlaskConical,
  Award,
  Clock,
  Users,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const programs = [
  {
    level: "Beginner",
    title: "Saffron Basics",
    duration: "2 weeks",
    price: "₹2,999",
    features: [
      "Introduction to saffron varieties",
      "Understanding grades & quality",
      "Basic storage techniques",
      "Culinary applications",
      "Certificate of completion",
    ],
    icon: Sprout,
    popular: false,
  },
  {
    level: "Intermediate",
    title: "Saffron Cultivation",
    duration: "4 weeks",
    price: "₹7,999",
    features: [
      "Complete cultivation guide",
      "Soil preparation & planting",
      "Irrigation & care techniques",
      "Pest management",
      "Harvesting best practices",
      "Hands-on virtual sessions",
    ],
    icon: GraduationCap,
    popular: true,
  },
  {
    level: "Advanced",
    title: "Quality Testing & Grading",
    duration: "6 weeks",
    price: "₹14,999",
    features: [
      "Laboratory testing methods",
      "ISO grading standards",
      "Adulteration detection",
      "Business certification prep",
      "One-on-one mentorship",
      "Industry networking",
    ],
    icon: FlaskConical,
    popular: false,
  },
  {
    level: "Professional",
    title: "Saffron Business Mastery",
    duration: "8 weeks",
    price: "₹29,999",
    features: [
      "Complete business setup guide",
      "Supply chain management",
      "Export documentation",
      "Marketing strategies",
      "Quality certifications",
      "Lifetime community access",
    ],
    icon: Award,
    popular: false,
  },
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "50+", label: "Workshops Conducted" },
  { value: "15+", label: "Expert Instructors" },
  { value: "98%", label: "Success Rate" },
];

export default function Training() {
  const whatsappNumber = "919876543210";

  const handleEnquiry = (program: typeof programs[0]) => {
    const message = `Hello! I'm interested in the ${program.title} training program (${program.price}).`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/saffron-field.jpg)` }}
        />
        <div className="absolute inset-0 bg-secondary/90" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto text-secondary-foreground"
          >
            <span className="text-primary font-medium">Saffron Training Academy</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2">
              Master the Art of Saffron
            </h1>
            <p className="text-secondary-foreground/80 mt-6 text-lg">
              From cultivation to quality testing, become an expert in the world's most precious
              spice with our comprehensive training programs.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-secondary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Training Programs
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Choose a program that matches your goals and expertise level
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow ${
                  program.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {program.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                    Most Popular
                  </div>
                )}
                <div className={`p-6 ${program.popular ? "pt-10" : ""}`}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <program.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-medium">{program.level}</span>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-1">
                    {program.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-foreground">{program.price}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleEnquiry(program)}
                    className="w-full mt-6"
                    variant={program.popular ? "default" : "outline"}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enquire Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop CTA */}
      <section className="py-16 bg-cream-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-secondary rounded-3xl p-8 md:p-12 text-center"
          >
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-secondary-foreground">
              Corporate & Group Training
            </h2>
            <p className="text-secondary-foreground/80 mt-4 max-w-xl mx-auto">
              Customized training programs for businesses, agricultural cooperatives, and educational
              institutions. Contact us for group discounts.
            </p>
            <Button
              size="lg"
              className="mt-6"
              onClick={() => {
                const message = "Hello! I'm interested in corporate/group training for saffron.";
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
                  "_blank"
                );
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact for Group Training
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
