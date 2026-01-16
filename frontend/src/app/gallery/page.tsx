"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { BackgroundWrapper, backgroundPresets } from "@/components/ui/background-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Grid3X3, 
  Grid2X2, 
  List, 
  Search, 
  Filter, 
  X, 
  ZoomIn,
  Download,
  Share2,
  Heart,
  Eye,
  Calendar,
  MapPin,
  Camera
} from "lucide-react";

// Gallery data with different categories
const galleryData = [
  {
    id: 1,
    title: "Saffron Harvest Season",
    category: "harvest",
    image: "/saffron-field.jpg",
    description: "Beautiful saffron fields during harvest season in Kashmir",
    location: "Pampore, Kashmir",
    date: "October 2024",
    photographer: "Rajesh Kumar",
    views: 1250,
    likes: 89,
    tags: ["harvest", "field", "kashmir", "autumn"]
  },
  {
    id: 2,
    title: "Premium Saffron Threads",
    category: "product",
    image: "/hero-saffron.jpg",
    description: "Close-up view of premium Grade A+ saffron threads",
    location: "Studio",
    date: "November 2024",
    photographer: "Studio Team",
    views: 2100,
    likes: 156,
    tags: ["product", "threads", "premium", "quality"]
  },
  {
    id: 3,
    title: "Traditional Saffron Tea",
    category: "culinary",
    image: "/saffron-tea.jpg",
    description: "Traditional saffron tea preparation with authentic ingredients",
    location: "Kashmir Kitchen",
    date: "December 2024",
    photographer: "Chef Maria",
    views: 890,
    likes: 67,
    tags: ["tea", "traditional", "culinary", "beverage"]
  },
  {
    id: 4,
    title: "Saffron Product Collection",
    category: "product",
    image: "/product-saffron-jar.jpg",
    description: "Our premium saffron product collection in elegant packaging",
    location: "Product Studio",
    date: "December 2024",
    photographer: "Product Team",
    views: 1580,
    likes: 112,
    tags: ["product", "packaging", "collection", "premium"]
  },
  {
    id: 5,
    title: "Saffron Cultivation Process",
    category: "process",
    image: "/saffron-field.jpg",
    description: "Step-by-step saffron cultivation and farming techniques",
    location: "Kashmir Valley",
    date: "September 2024",
    photographer: "Agricultural Team",
    views: 950,
    likes: 78,
    tags: ["cultivation", "farming", "process", "agriculture"]
  },
  {
    id: 6,
    title: "Saffron Quality Testing",
    category: "process",
    image: "/hero-saffron.jpg",
    description: "Quality control and testing of saffron for authenticity",
    location: "Quality Lab",
    date: "November 2024",
    photographer: "Quality Team",
    views: 720,
    likes: 45,
    tags: ["quality", "testing", "lab", "authenticity"]
  },
  {
    id: 7,
    title: "Saffron Recipe Creation",
    category: "culinary",
    image: "/saffron-tea.jpg",
    description: "Creating delicious recipes with premium saffron",
    location: "Culinary Studio",
    date: "December 2024",
    photographer: "Chef Team",
    views: 1100,
    likes: 92,
    tags: ["recipe", "cooking", "culinary", "chef"]
  },
  {
    id: 8,
    title: "Saffron Packaging Design",
    category: "product",
    image: "/product-saffron-jar.jpg",
    description: "Elegant and sustainable packaging design for saffron products",
    location: "Design Studio",
    date: "October 2024",
    photographer: "Design Team",
    views: 680,
    likes: 54,
    tags: ["packaging", "design", "sustainable", "elegant"]
  }
];

const categories = [
  { id: "all", name: "All Photos", count: galleryData.length },
  { id: "harvest", name: "Harvest", count: galleryData.filter(item => item.category === "harvest").length },
  { id: "product", name: "Products", count: galleryData.filter(item => item.category === "product").length },
  { id: "culinary", name: "Culinary", count: galleryData.filter(item => item.category === "culinary").length },
  { id: "process", name: "Process", count: galleryData.filter(item => item.category === "process").length }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "masonry" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const filteredImages = galleryData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (imageId: number) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleShare = (image: typeof galleryData[0]) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <BackgroundWrapper 
      backgroundImage={backgroundPresets.hero.image}
      overlayOpacity={0.95}
      blurAmount="md"
      animationType="fade"
    >
      <Layout>
        {/* Header */}
        <section className="py-16 bg-gradient-hero pattern-saffron">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Camera className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                Saffron <span className="text-gradient-saffron">Gallery</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-4 max-w-xl mx-auto"
            >
              Explore our stunning collection of saffron photography, from harvest to table
            </motion.p>
          </div>
        </section>

        {/* Controls */}
        <section className="py-8 bg-card/80 backdrop-blur-sm border-b border-border sticky top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.name}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "masonry" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("masonry")}
                >
                  <Grid2X2 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`
                  ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : ""}
                  ${viewMode === "masonry" ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6" : ""}
                  ${viewMode === "list" ? "space-y-6" : ""}
                `}
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`
                      group cursor-pointer
                      ${viewMode === "list" ? "flex gap-6 bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated" : ""}
                      ${viewMode !== "list" ? "bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated" : ""}
                    `}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className={`
                      relative overflow-hidden
                      ${viewMode === "list" ? "w-64 h-48 flex-shrink-0" : "aspect-square"}
                    `}>
                      <img
                        src={image.image}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">{image.views}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLike(image.id);
                                }}
                                className="text-white hover:text-red-500"
                              >
                                <Heart className={`w-4 h-4 ${likedImages.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShare(image);
                                }}
                                className="text-white hover:text-primary"
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white hover:text-primary"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <Badge className="absolute top-4 left-4 capitalize">
                        {image.category}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {image.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {image.description}
                      </p>
                      
                      <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{image.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{image.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera className="w-3 h-3" />
                          <span>{image.photographer}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-4">
                        {image.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {image.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {image.likes + (likedImages.includes(image.id) ? 1 : 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No photos found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-card rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-black/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                <div className="grid lg:grid-cols-2">
                  <div className="relative">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-8">
                    <Badge className="mb-4 capitalize">{selectedImage.category}</Badge>
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                      {selectedImage.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {selectedImage.description}
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{selectedImage.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{selectedImage.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Camera className="w-4 h-4 text-primary" />
                        <span>{selectedImage.photographer}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedImage.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {selectedImage.views} views
                        </span>
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          {selectedImage.likes + (likedImages.includes(selectedImage.id) ? 1 : 0)} likes
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleLike(selectedImage.id)}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${likedImages.includes(selectedImage.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          Like
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(selectedImage)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </BackgroundWrapper>
  );
}