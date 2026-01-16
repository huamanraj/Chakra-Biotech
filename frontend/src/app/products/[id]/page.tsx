"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QualityCertification } from "@/components/ui/quality-certification";
import { 
  ShoppingBag, 
  Star, 
  ArrowLeft, 
  Shield, 
  Truck, 
  Award,
  Heart,
  Share2,
  Minus,
  Plus
} from "lucide-react";

// Mock product data - in real app, this would come from API
const productData = {
  1: {
    id: 1,
    name: "Premium Kashmiri Saffron",
    grade: "Grade A+",
    origin: "Kashmir",
    price: 2499,
    originalPrice: 2999,
    weight: "1g",
    rating: 5,
    reviewCount: 127,
    images: ["/product-saffron-jar.jpg", "/saffron-field.jpg", "/saffron-tea.jpg"],
    badge: "Bestseller",
    inStock: true,
    description: "Our Premium Kashmiri Saffron is handpicked from the pristine valleys of Kashmir, known for producing the world's finest saffron. Each thread is carefully selected to ensure maximum potency, aroma, and color.",
    features: [
      "100% Pure Kashmiri Saffron",
      "Grade A+ Quality",
      "Lab Tested for Purity",
      "Vacuum Sealed Packaging",
      "Direct from Farmers"
    ],
    specifications: {
      "Origin": "Kashmir, India",
      "Grade": "Grade A+",
      "Moisture Content": "< 12%",
      "Crocin": "> 250",
      "Safranal": "> 20",
      "Picrocrocin": "> 70",
      "Shelf Life": "3 Years",
      "Storage": "Cool, Dry Place"
    },
    benefits: [
      "Rich in antioxidants",
      "Supports mood enhancement",
      "Promotes healthy skin",
      "Aids in digestion",
      "Natural anti-inflammatory"
    ]
  }
};

export default function ProductDetails() {
  const params = useParams();
  const id = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const product = productData[Number(id) as keyof typeof productData];
  const whatsappNumber = "919876543210";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/products">
            <Button className="mt-4">Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleOrder = () => {
    const message = `Hello! I want to order ${product.name} – ${product.weight} x${quantity} (₹${(product.price * quantity).toLocaleString()})`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div 
                className="aspect-square rounded-2xl overflow-hidden bg-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex gap-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.badge}</Badge>
                  <Badge variant="outline">{product.grade}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  {product.name}
                </h1>
                <p className="text-muted-foreground mt-2">Origin: {product.origin}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating ? 'text-gold fill-gold' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">/ {product.weight}</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Key Features:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleOrder} className="flex-1">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Order on WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-border">
                <QualityCertification 
                  variant="minimal"
                  showMetrics={false}
                  showCertifications={false}
                  className="flex items-center justify-center"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-border">
                    <span className="font-medium text-foreground">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-background rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Reviews coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}