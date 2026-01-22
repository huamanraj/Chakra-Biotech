"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { companyApi } from "@/lib/api/company";

export function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState("919876543210");

  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const response = await companyApi.get();
        if (response.success && response.data.whatsappNumber) {
          // Remove any spaces or special characters
          const cleanNumber = response.data.whatsappNumber.replace(/\s+/g, "");
          setWhatsappNumber(cleanNumber);
        }
      } catch (error) {
        console.error("Failed to fetch WhatsApp number:", error);
        // Keep default number on error
      }
    };

    fetchWhatsAppNumber();
  }, []);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your saffron products.`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </motion.a>
  );
}
