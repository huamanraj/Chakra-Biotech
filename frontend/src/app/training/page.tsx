"use client";

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Sprout,
  FlaskConical,
  Award,
  Clock,
  Users,
  CheckCircle2,
  MessageCircle,
  Home,
  BookOpen,
  Trophy,
  Star,
  Quote,
  TrendingUp,
  Target,
  Lightbulb,
  Shield,
  Leaf,
  Droplets,
  Bug,
  Scissors,
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

const courseModules = [
  {
    title: "Protected Farming Methods",
    icon: Home,
    description:
      "Learn modern techniques for controlled environment agriculture",
    topics: [
      "Greenhouse setup",
      "Climate control",
      "Light management",
      "Ventilation systems",
    ],
  },
  {
    title: "Growing Medium Preparation",
    icon: Leaf,
    description: "Master the art of preparing optimal soil conditions",
    topics: [
      "Soil composition",
      "pH management",
      "Organic amendments",
      "Drainage systems",
    ],
  },
  {
    title: "Nutrient & Water Management",
    icon: Droplets,
    description: "Precise systems tailored specifically for saffron",
    topics: [
      "Fertilization schedules",
      "Irrigation techniques",
      "Water quality",
      "Nutrient monitoring",
    ],
  },
  {
    title: "Disease Prevention",
    icon: Bug,
    description: "Strategies to protect your saffron crop",
    topics: [
      "Common diseases",
      "Pest control",
      "Organic solutions",
      "Preventive measures",
    ],
  },
  {
    title: "Harvesting & Processing",
    icon: Scissors,
    description: "Maximize quality and profit with efficient techniques",
    topics: [
      "Optimal harvest timing",
      "Stigma separation",
      "Drying methods",
      "Quality preservation",
    ],
  },
  {
    title: "Commercial Farming",
    icon: TrendingUp,
    description: "Turn your knowledge into a profitable venture",
    topics: [
      "Market analysis",
      "Pricing strategies",
      "Scaling operations",
      "Export opportunities",
    ],
  },
];

const programBenefits = [
  {
    icon: Home,
    title: "In-Campus Stay",
    description:
      "Convenient access to classrooms, labs, and library. Save commute time and foster a deeper campus experience with full immersion in learning.",
  },
  {
    icon: BookOpen,
    title: "Practical Training",
    description:
      "Hands-on sessions demonstrating setup and maintenance of cultivation systems, nutrient solutions, and comprehensive plant care techniques.",
  },
  {
    icon: Trophy,
    title: "Certification",
    description:
      "Receive recognized credentials upon completion to validate your expertise and enhance your professional credibility in saffron cultivation.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Saffron Farmer, Kashmir",
    image: "/testimonial-1.jpg",
    rating: 5,
    text: "The training program transformed my farming approach. I've increased my yield by 40% and the quality has improved significantly. The practical sessions were invaluable!",
  },
  {
    name: "Priya Sharma",
    role: "Agricultural Entrepreneur",
    image: "/testimonial-2.jpg",
    rating: 5,
    text: "As someone new to saffron cultivation, this course gave me the confidence to start my own farm. The instructors are knowledgeable and the support is excellent.",
  },
  {
    name: "Dr. Amit Patel",
    role: "Horticulture Researcher",
    image: "/testimonial-3.jpg",
    rating: 5,
    text: "The scientific approach and modern techniques taught here are cutting-edge. This is the most comprehensive saffron cultivation program I've encountered.",
  },
];

const impactStats = [
  { value: "95%", label: "Student Success Rate", icon: Target },
  { value: "40%", label: "Average Yield Increase", icon: TrendingUp },
  { value: "500+", label: "Farmers Trained", icon: Users },
  { value: "15+", label: "Years of Expertise", icon: Award },
];

export default function Training() {
  const whatsappNumber = "919876543210";

  const handleEnquiry = (program: (typeof programs)[0]) => {
    const message = `Hello! I'm interested in the ${program.title} training program (${program.price}).`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const handleCultivationEnquiry = () => {
    const message =
      "Hello! I'm interested in the 3-Day Saffron Cultivation Course at the Institute of Horticulture Technology.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
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
            <span className="text-primary font-medium">
              Saffron Training Academy
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2">
              Master the Art of Saffron
            </h1>
            <p className="text-secondary-foreground/80 mt-6 text-lg">
              From cultivation to quality testing, become an expert in the
              world's most precious spice with our comprehensive training
              programs.
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
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-foreground/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Course - Saffron Cultivation */}
      <section className="py-20 bg-gradient-to-b from-background to-cream-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Featured Course</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              3-Day Saffron Cultivation Course
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Crack the code to successfully cultivating the world's most
              precious spice at the Institute of Horticulture Technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">
                      What You'll Gain
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      From This Three-Day Training
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Learn modern methods and techniques for protected farming
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Understand the best growing mediums and how to prepare
                      them
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Study precise nutrient and water management systems
                      tailored for saffron
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Master best practices for saffron growth and strategies
                      for disease prevention
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Gain valuable tips on efficient harvesting and processing
                      for maximum quality and profit
                    </span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="w-full mt-8"
                  onClick={handleCultivationEnquiry}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Register Now
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {programBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Course Stands Out */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-foreground">
                Why This Course Stands Out
              </h2>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Discover the science and success behind saffron cultivation
                through a program backed by our{" "}
                <span className="text-primary font-semibold">
                  breakthrough achievement
                </span>{" "}
                of successfully cultivating saffron at our state-of-the-art
                center near Shimla, where the crop has completed its full growth
                cycle and entered dormancy.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                This course offers practical insights rooted in{" "}
                <span className="text-primary font-semibold">
                  real-world results
                </span>
                . You'll gain proven techniques, a deeper understanding of
                saffron's lifecycle, and explore its potential for commercial
                farming, making this golden spice a viable venture.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background rounded-xl">
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">
                    Aspiring Entrepreneurs
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Eye the lucrative saffron market with confidence
                  </p>
                </div>
                <div className="text-center p-6 bg-background rounded-xl">
                  <Sprout className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">
                    Traditional Farmers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Expand and adopt modern cultivation methods
                  </p>
                </div>
                <div className="text-center p-6 bg-background rounded-xl">
                  <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">
                    Students & Researchers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Passionate about innovative agriculture
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Course Modules
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Comprehensive curriculum covering every aspect of saffron
              cultivation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courseModules.map((module, index) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <module.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {module.description}
                </p>
                <ul className="space-y-2">
                  {module.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-cream-light">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              All Training Programs
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
                  <span className="text-xs text-primary font-medium">
                    {program.level}
                  </span>
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
                    <span className="text-2xl font-bold text-foreground">
                      {program.price}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
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

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Student Reviews
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Hear from our successful graduates who transformed their saffron
              farming journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 bg-gradient-to-b from-cream-light to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Our Impact
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Transforming saffron farming across the region with proven results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
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
              Customized training programs for businesses, agricultural
              cooperatives, and educational institutions. Contact us for group
              discounts.
            </p>
            <Button
              size="lg"
              className="mt-6"
              onClick={() => {
                const message =
                  "Hello! I'm interested in corporate/group training for saffron.";
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    message
                  )}`,
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
