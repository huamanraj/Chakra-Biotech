"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  Heart,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";

// Mock blog data - in real app, this would come from API
const blogData = {
  "health-benefits-of-saffron": {
    id: 1,
    slug: "health-benefits-of-saffron",
    title: "10 Incredible Health Benefits of Saffron You Need to Know",
    excerpt: "Discover the powerful health benefits of saffron, from boosting mood to improving heart health. Learn how this golden spice can transform your wellbeing.",
    content: `
      <p>Saffron, often called "red gold," is one of the world's most precious spices. Beyond its culinary applications, saffron has been treasured for centuries for its remarkable health benefits. Modern science is now validating what ancient civilizations have long known about this golden treasure.</p>

      <h2>1. Powerful Antioxidant Properties</h2>
      <p>Saffron contains over 150 volatile compounds, including crocin, crocetin, and safranal, which give it potent antioxidant properties. These compounds help protect your cells from oxidative stress and free radical damage, potentially reducing the risk of chronic diseases.</p>

      <h2>2. Natural Mood Enhancer</h2>
      <p>Studies have shown that saffron can be as effective as some antidepressant medications in treating mild to moderate depression. The spice helps increase levels of serotonin and dopamine, neurotransmitters that regulate mood and emotional well-being.</p>

      <h2>3. Supports Heart Health</h2>
      <p>The antioxidants in saffron, particularly crocetin, may help reduce cholesterol levels and prevent the buildup of plaque in arteries. Regular consumption of saffron has been linked to improved cardiovascular health and reduced risk of heart disease.</p>

      <h2>4. Enhances Brain Function</h2>
      <p>Saffron's neuroprotective properties may help improve memory, learning, and overall cognitive function. Some studies suggest it could be beneficial in managing neurodegenerative conditions like Alzheimer's disease.</p>

      <h2>5. Promotes Eye Health</h2>
      <p>The carotenoids in saffron, including crocin and crocetin, may help protect the retina from damage and improve vision. Research indicates that saffron supplementation could slow the progression of age-related macular degeneration.</p>

      <h2>6. Natural Anti-Inflammatory</h2>
      <p>Saffron's anti-inflammatory compounds can help reduce inflammation throughout the body, potentially alleviating symptoms of inflammatory conditions and supporting overall health.</p>

      <h2>7. Supports Digestive Health</h2>
      <p>Traditional medicine has long used saffron to aid digestion. The spice can help stimulate appetite, reduce bloating, and support healthy digestive function.</p>

      <h2>8. May Help with Weight Management</h2>
      <p>Some studies suggest that saffron extract may help reduce appetite and prevent overeating, potentially supporting healthy weight management when combined with a balanced diet and exercise.</p>

      <h2>9. Skin Health Benefits</h2>
      <p>Saffron's antioxidant and anti-inflammatory properties make it beneficial for skin health. It may help improve skin texture, reduce signs of aging, and promote a healthy, radiant complexion.</p>

      <h2>10. Supports Women's Health</h2>
      <p>Saffron has been traditionally used to help alleviate symptoms of PMS and menstrual discomfort. Some research suggests it may help regulate mood swings and reduce physical symptoms associated with menstruation.</p>

      <h2>How to Incorporate Saffron into Your Diet</h2>
      <p>To reap these health benefits, you can incorporate saffron into your diet in various ways:</p>
      <ul>
        <li>Add a pinch to rice dishes, soups, and stews</li>
        <li>Brew saffron tea by steeping threads in hot water</li>
        <li>Use in desserts and sweet preparations</li>
        <li>Take as a supplement (consult with a healthcare provider first)</li>
      </ul>

      <h2>Important Considerations</h2>
      <p>While saffron is generally safe for most people when used in culinary amounts, it's important to source high-quality, authentic saffron. Always consult with a healthcare provider before using saffron supplements, especially if you're pregnant, nursing, or taking medications.</p>

      <p>The golden threads of saffron offer far more than just flavor and color to your dishes. With its impressive array of health benefits, this precious spice truly deserves its reputation as nature's golden medicine.</p>
    `,
    image: "/saffron-tea.jpg",
    category: "Health",
    author: "Dr. Priya Sharma",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    tags: ["health", "benefits", "antioxidants", "wellness"]
  }
};

const relatedPosts = [
  {
    id: 2,
    slug: "saffron-cultivation-guide",
    title: "Complete Guide to Growing Saffron at Home",
    image: "/saffron-field.jpg",
    category: "Cultivation",
    date: "Dec 25, 2025"
  },
  {
    id: 3,
    slug: "authentic-saffron-identification",
    title: "How to Identify Authentic Saffron",
    image: "/hero-saffron.jpg",
    category: "Quality",
    date: "Dec 22, 2025"
  }
];

export default function BlogDetails() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogData[slug as keyof typeof blogData];

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
          <Link href="/blog">
            <Button className="mt-4">Back to Blog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    const title = post.title;
    
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (navigator.share) {
      navigator.share({ title, url });
    } else {
      navigator.clipboard.writeText(url);
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
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Badge className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {post.excerpt}
              </p>
              
              {/* Author & Meta */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                  <Facebook className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
                  <Twitter className="w-4 h-4 mr-2" />
                  Tweet
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                  <Linkedin className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare()}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-video rounded-2xl overflow-hidden mb-12"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              <span className="text-sm font-medium text-foreground mr-2">Tags:</span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-2">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {relatedPost.date}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}