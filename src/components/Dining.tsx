import { Utensils, Star, Soup, Coffee, Flame, Heart } from "lucide-react";
import ScrollParallaxImage from "./ScrollParallaxImage";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "./ScrollReveal";

export default function Dining() {
  const menus = [
    {
      category: "Ethiopian Traditions",
      icon: Soup,
      tagline: "Authentic slow-cooked heirloom recipes",
      items: [
        {
          name: "Ras Grand Doro Wat",
          price: "ETB 450",
          desc: "A rich, slow-simmered chicken stew with hard-boiled eggs, spiced with traditional Berbere and premium Ethiopian herbal butter (Kibe).",
          spicy: true,
          popular: true,
          image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&auto=format"
        },
        {
          name: "Kezira Sizzling Tibs",
          price: "ETB 420",
          desc: "Tender beef chunks sautéed in seasoned butter, rosemary, garlic, and fresh green peppers, served sizzling hot with soft Injera.",
          spicy: false,
          popular: true,
          image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format"
        },
        {
          name: "Traditional Kitfo",
          price: "ETB 490",
          desc: "Finely minced extra-lean beef marinated in Mitmita spice blend and seasoned herbal butter, lightly warmed or served fresh with Ayibe cottage cheese.",
          spicy: true,
          popular: false,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format"
        }
      ]
    },
    {
      category: "International Delicacies",
      icon: Utensils,
      tagline: "Global favorites meticulously prepared by our master chefs",
      items: [
        {
          name: "Pan-Seared Nile Perch",
          price: "ETB 520",
          desc: "Fresh rift valley perch fillet prepared with lemon-herb garlic reduction, accompanied by glazed local vegetables and buttered mashed potatoes.",
          spicy: false,
          popular: false,
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format"
        },
        {
          name: "Classic Kezira Beef Tenderloin Steak",
          price: "ETB 580",
          desc: "A prime cut of dry-aged beef styled and grilled to perfection, drizzled with a decadent Madagascar green peppercorn reduction.",
          spicy: false,
          popular: true,
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format"
        }
      ]
    },
    {
      category: "Traditional Coffee & Spirits",
      icon: Coffee,
      tagline: "Experience the legendary birthplace of coffee",
      items: [
        {
          name: "Imperial Clay-Pot Coffee Ceremony",
          price: "ETB 150",
          desc: "Traditional slow-roasted arabica coffee brewed before your eyes in a classic clay Jebena, perfumed with burning frankincense. Served with fresh popcorn.",
          spicy: false,
          popular: true,
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format"
        },
        {
          name: "Tej Honey Wine",
          price: "ETB 200",
          desc: "A rich, sweet, and authentic honey wine fermented natively in-house using selected regional organic honey and Gesho hop leaves.",
          spicy: false,
          popular: false,
          image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&auto=format"
        }
      ]
    }
  ];

  return (
    <div className="py-24 bg-[#FAF2E3]/70 font-sans selection:bg-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Descriptive Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.25em] block">
            Gastronomic Excellence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#9C2A2A] leading-tight">
            Imperial Dining Rooms & Royal Jebena Lounge
          </h2>
          <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto my-4" />
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            Nourish your senses with the celebrated culinary heritage of Dire Dawa. From our authentic wood-fired Ethiopian stews and sizzling roasts to exquisite continental plates designed by master chefs. Enjoy it inside our vintage indoor columns or poolside in the tropical garden breeze.
          </p>
        </ScrollReveal>

        {/* Highlight Banner with scroll reveal and image parallax */}
        <ScrollReveal scaleStart={0.95} className="relative overflow-hidden bg-[#9C2A2A] rounded-[40px] p-8 md:p-12 text-white mb-20 shadow-2xl border border-[#D4AF37]/25">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4 text-left">
              <span className="text-[10px] tracking-[0.2em] font-mono text-[#D4AF37] font-semibold uppercase block">
                The Heritage Brew
              </span>
              <h3 className="font-serif text-3xl font-extrabold text-white">
                Traditional Ethiopian Coffee Ceremony
              </h3>
              <p className="text-stone-200 text-sm leading-relaxed">
                Coffee is the soul of our hospitality. Gather in our central courtyard daily for the grand jebena ceremony, where organic beans are freshly roasted over glowing charcoal, filling the warm air with rich cocoa scents.
              </p>
              <div className="flex items-center space-x-3 pt-2 text-stone-100">
                <div className="bg-[#D4AF37]/20 p-2 rounded-lg text-[#D4AF37]">
                  <Coffee className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-mono tracking-wide uppercase">Complimentary for All Lodging Guests</span>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden shadow-lg border border-white/5">
              <ScrollParallaxImage 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1000&auto=format" 
                alt="Premium Ethiopian Coffee roasting" 
                className="w-full h-full"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Menu Grid */}
        <div className="space-y-24">
          {menus.map((section, sIdx) => {
            const Icon = section.icon;
            return (
              <div key={sIdx} className="space-y-8">
                {/* Section Header */}
                <ScrollReveal className="flex items-center space-x-4 border-b border-stone-200 pb-3">
                  <div className="bg-[#9C2A2A] text-[#D4AF37] p-3 rounded-2xl shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-serif text-2xl font-bold text-[#9C2A2A]">{section.category}</h3>
                    <p className="text-stone-500 text-xs italic mt-0.5">{section.tagline}</p>
                  </div>
                </ScrollReveal>

                {/* Section Cards with staggered container reveal */}
                <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, itemIdx) => (
                    <ScrollRevealItem 
                      key={itemIdx} 
                      className="bg-white/95 backdrop-blur-md rounded-[32px] border border-stone-200/65 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col overflow-hidden text-left"
                    >
                      {/* Image Frame with parallax scroll past scale */}
                      <div className="relative h-48 overflow-hidden bg-stone-100">
                        <ScrollParallaxImage 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full"
                        />
                        {item.popular && (
                          <span className="absolute top-4 left-4 z-20 bg-[#D4AF37] text-[#1E1E1E] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1 shadow">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Signature Selection</span>
                          </span>
                        )}
                        {item.spicy && (
                          <span className="absolute top-4 right-4 z-20 bg-[#9C2A2A] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center space-x-1 shadow">
                            <Flame className="w-3 h-3 text-[#D4AF37]" />
                            <span>Spicy Cuisine</span>
                          </span>
                        )}
                      </div>

                      {/* Content panel */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#9C2A2A] transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[#9C2A2A] font-bold text-sm tracking-wide shrink-0">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-stone-500 text-xs leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {/* Order action */}
                        <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-stone-400">Available 11:30 AM - 10:30 PM</span>
                          <span className="text-[#9C2A2A] font-bold flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-[#D4AF37] fill-current" />
                            <span>Traditional Spiced</span>
                          </span>
                        </div>
                      </div>
                    </ScrollRevealItem>
                  ))}
                </ScrollRevealContainer>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
