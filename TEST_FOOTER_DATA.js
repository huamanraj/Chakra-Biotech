/**
 * Test Footer Settings
 * 
 * Sample data for testing the footer settings functionality
 * You can use this data to test the admin panel footer settings
 */

export const sampleFooterSettings = {
    // Minimal setup
    minimal: {
        description: "Leading provider of aeroponic saffron cultivation solutions.",
        offerings: [
            "Aeroponic Systems",
            "Consulting Services",
            "Training Programs"
        ],
        quickLinks: [
            { name: "Products", href: "/products" },
            { name: "About Us", href: "/about" },
            { name: "Contact", href: "/contact" }
        ],
        copyrightText: "Chakra Biotech. All rights reserved."
    },

    // Complete setup (recommended)
    complete: {
        description: "An Agri-Tech leader specializing in precision-controlled aeroponic saffron cultivation. We are democratizing \"Red Gold\" through sustainable technology and innovation.",
        offerings: [
            "Aeroponic Saffron Cultivation",
            "Indoor Farming Solutions",
            "CEA Consulting Services",
            "Biotech Innovation Labs",
            "Sustainable Agriculture Training",
            "Custom System Design"
        ],
        quickLinks: [
            { name: "Our Products", href: "/products" },
            { name: "Training Programs", href: "/training" },
            { name: "Research & Blog", href: "/blog" },
            { name: "About Company", href: "/about" },
            { name: "Gallery", href: "/gallery" },
            { name: "Contact Us", href: "/contact" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" }
        ],
        copyrightText: "Chakra Biotech LLP. All rights reserved."
    },

    // Modern tech company style
    techStyle: {
        description: "Revolutionizing agriculture with cutting-edge aeroponic technology and sustainable farming practices for a greener tomorrow.",
        offerings: [
            "Smart Agriculture",
            "IoT Integration",
            "Data Analytics",
            "Automation Solutions"
        ],
        quickLinks: [
            { name: "Solutions", href: "/products" },
            { name: "Technology", href: "/technology" },
            { name: "Partners", href: "/partners" },
            { name: "Careers", href: "/careers" }
        ],
        copyrightText: "Chakra Biotech. Innovating Agriculture."
    }
};

/**
 * Full Company Details Sample
 * Include this in the PUT request for complete initialization
 */
export const fullCompanyDetails = {
    companyName: "Chakra Biotech",
    email: "info@chakrabiotech.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 98765 43211",
    whatsappNumber: "919876543210",

    address: {
        street: "Innovation Hub, Tech Park",
        city: "Jaipur",
        state: "Rajasthan",
        country: "India",
        zipCode: "302021"
    },

    socialMedia: {
        facebook: "https://facebook.com/chakrabiotech",
        instagram: "https://instagram.com/chakrabiotech",
        twitter: "https://twitter.com/chakrabiotech",
        linkedin: "https://linkedin.com/company/chakrabiotech",
        youtube: "https://youtube.com/@chakrabiotech"
    },

    businessHours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Closed"
    },

    footer: sampleFooterSettings.complete,

    aboutUs: "Chakra Biotech is pioneering the future of agriculture through innovative aeroponic technology. We specialize in precision-controlled saffron cultivation systems that maximize yield while minimizing environmental impact.",

    mission: "To democratize premium saffron cultivation and make it accessible to farmers worldwide through sustainable, technology-driven solutions.",

    vision: "A world where sustainable agriculture meets cutting-edge technology, creating food security and economic opportunity for all.",

    metaTitle: "Chakra Biotech - Aeroponic Saffron Cultivation Solutions",
    metaDescription: "Leading provider of precision-controlled aeroponic saffron cultivation systems. Sustainable agriculture technology for premium saffron production.",
    metaKeywords: [
        "aeroponic saffron",
        "saffron cultivation",
        "indoor farming",
        "controlled environment agriculture",
        "biotech",
        "sustainable farming"
    ]
};

/**
 * API Test Examples
 */
export const apiTestExamples = {
    // Update only footer
    updateFooterOnly: {
        url: "http://localhost:5000/api/admin/company-details",
        method: "PUT",
        body: {
            footer: sampleFooterSettings.complete
        }
    },

    // Update complete company details
    updateComplete: {
        url: "http://localhost:5000/api/admin/company-details",
        method: "PUT",
        body: fullCompanyDetails
    },

    // Fetch current settings
    fetch: {
        url: "http://localhost:5000/api/company-details",
        method: "GET"
    }
};

// Console test example
console.log("Sample Footer Settings:", JSON.stringify(sampleFooterSettings.complete, null, 2));
console.log("\nAPI Test URL:", apiTestExamples.updateFooterOnly.url);
console.log("Body:", JSON.stringify(apiTestExamples.updateFooterOnly.body, null, 2));
