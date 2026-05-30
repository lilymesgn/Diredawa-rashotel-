import React from "react";
import { Bed, Utensils, Wifi, Calendar, ConciergeBell } from "lucide-react";
import { SERVICES as STATIC_SERVICES } from "../data";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "./ScrollReveal";
import { Service } from "../types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Bed,
  Utensils,
  Wifi,
  Calendar,
  ConciergeBell
};

interface ServicesProps {
  services?: Service[];
}

export default function Services({ services }: ServicesProps) {
  const activeServices = services && services.length > 0 ? services : STATIC_SERVICES;

  return (
    <section id="services" className="py-20 md:py-28 bg-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3 font-sans">
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#9C2A2A] uppercase tracking-[0.3em]">
            <span className="w-8 h-[1px] bg-[#9C2A2A]/30" />
            <span>Ras Hospitality Amenities</span>
            <span className="w-8 h-[1px] bg-[#9C2A2A]/30" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-[#9C2A2A] leading-tight">
            Our Signature Services
          </h2>
          
          <p className="text-gray-650 text-sm md:text-base font-normal max-w-2xl mx-auto">
            From premier fine dining to high-speed connections and round-the-clock porter services, we cater every detail to make your stay effortless and luxurious.
          </p>
        </ScrollReveal>

        {/* Services Bento Grid with staggered reveal effects */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {activeServices.map((service) => {
            const IconComp = ICON_MAP[service.iconName] || ConciergeBell;
            return (
              <ScrollRevealItem
                key={service.id}
                className="group border border-[#D4AF37]/20 bg-white/45 backdrop-blur-md hover:bg-white/90 hover:shadow-xl hover:border-[#D4AF37]/50 p-6 sm:p-8 rounded-[32px] transition-all duration-300 text-center flex flex-col items-center justify-items-center"
              >
                {/* Icon Container with elegant hover ripples */}
                <div className="bg-white group-hover:bg-[#9C2A2A] w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-[#9C2A2A]/25 text-[#9C2A2A] group-hover:text-white transition-all duration-300 mb-6 border border-[#D4AF37]/25 group-hover:scale-105">
                  <IconComp className="w-8 h-8 transition-transform duration-300 group-hover:rotate-6" />
                </div>

                <h3 className="font-serif text-lg font-bold text-[#9C2A2A] mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>
              </ScrollRevealItem>
            );
          })}
        </ScrollRevealContainer>

      </div>
    </section>
  );
}
