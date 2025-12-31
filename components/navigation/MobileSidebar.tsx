"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Info } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { CrownToggle } from "@/app/page";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

interface SinglesSidebarProps {
  currentSection: number;
  scrollToSection: (index: number) => void;
  sections?: string[];
}

export default function SinglesSidebar({
  currentSection,
  scrollToSection: snapScrollToSection,
  sections = ["hero", "second-section", "produk", "resep"],
}: SinglesSidebarProps) {
  const currentSectionName = sections[currentSection] || "";

  const getActiveSection = () => {
    if (currentSectionName === "produk") return "produk";
    if (currentSectionName === "resep") return "resep";
    return "";
  };

  const activeSection = getActiveSection();

  const scrollToSection = (sectionName: string) => {
    const sectionIndex = sections.findIndex((s) => s === sectionName);
    if (sectionIndex !== -1) snapScrollToSection(sectionIndex);
  };

  const menuItems = [
    {
      icon: Package,
      label: "Produk",
      targetId: "produk",
      isActive: activeSection === "produk",
    },
    {
      icon: Info,
      label: "Resep",
      targetId: "resep",
      isActive: activeSection === "resep",
    },
  ];

  return (
    <motion.div className="fixed left-0 top-0 h-full w-16 z-[9999999] overflow-hidden">
      <div className="mt-2 ml-1 p-2 h-full flex flex-col items-center gap-2">
        {/* Logo */}
        <div className="flex justify-center w-full h-8 scale-50 origin-top mb-1">
          <Link href="/">
            <CrownToggle
              targetIds={["why-kanzler", "resep"]}
              style={{ width: "100%", height: "100%" }}
            />
          </Link>
        </div>

        {/* Menu */}
        <AnimatePresence>
          {activeSection !== "" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-1 mt-1"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.targetId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(item.targetId)}
                    className={`flex items-center justify-center px-2 py-0.5 rounded-full transition-all duration-300 w-full ${
                      item.isActive
                        ? "bg-[#AA7B32] text-white shadow scale-105"
                        : "bg-transparent text-[#AA7B32] hover:bg-yellow-400/20"
                    }`}
                  >
                    <p className={`${poppins.className} text-xs font-semibold`}>
                      {item.label}
                    </p>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
