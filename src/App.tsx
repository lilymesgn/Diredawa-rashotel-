import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Sparkles, X, Check, ArrowRight, ShieldAlert, ExternalLink, Lock } from "lucide-react";
import Navbar from "./Navbar";
import Hero from "./components/Hero";
import BookingWidget from "./components/BookingWidget";
import Services from "./components/Services";
import Rooms from "./components/Rooms";
import Gallery from "./components/Gallery";
import Offers from "./components/Offers";
import BookingHistory from "./components/BookingHistory";
import RoomDetailModal from "./components/RoomDetailModal";
import CheckoutModal from "./components/CheckoutModal";
import VideoModal from "./components/VideoModal";

// Modular Page components & Helpers
import AboutUsPage from "./components/AboutUsPage";
import Dining from "./components/Dining";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import SkeletonLoader from "./components/SkeletonLoader";
import { supabaseService } from "./services/supabaseService";
import { apiService } from "./services/apiService";

import { Room, Booking } from "./types";

export default function App() {
  const location = useLocation();

  // Render segregated page when on /404 route
  const is404Route = location.pathname === "/404";

  // Supabase settings and maintenance mode (Read-only)
  const [settings, setSettings] = useState<any>(null);
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Dynamic collections from Supabase
  const [services, setServices] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [contentBlocks, setContentBlocks] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await apiService.getSettings();
        if (data) {
          setSettings(data);
          if (data.site_name) {
            document.title = data.site_name;
          }
          if (data.maintenance_mode) {
            setIsMaintenance(true);
          }
        }
      } catch (err) {
        console.error("Error fetching admin settings from Supabase:", err);
      }

      try {
        const blocks = await apiService.getContentBlocks();
        if (blocks && blocks.length > 0) {
          const mapped: Record<string, any> = {};
          blocks.forEach((b) => {
            mapped[b.key] = b;
          });
          setContentBlocks(mapped);
        }
      } catch (err) {
        console.error("Error fetching content blocks:", err);
      }

      try {
        const svcs = await apiService.getServices();
        setServices(svcs);
      } catch (err) {
        console.error("Error fetching services:", err);
      }

      try {
        const promos = await apiService.getPromotions();
        setPromotions(promos);
      } catch (err) {
        console.error("Error fetching promotions:", err);
      }
    };
    fetchAllData();
  }, []);

  // Active Navigation Screen page state
  const [activePage, setActivePage] = useState("home");
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Booking database local sync state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem("diredawaras_bookings");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync booking local ledger on screen switches
  const syncBookLedger = () => {
    try {
      const saved = localStorage.getItem("diredawaras_bookings");
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Booking dynamic sync warning:", err);
    }
  };

  useEffect(() => {
    syncBookLedger();
  }, [activePage]);

  // Flow control states
  const [selectedRoomPreload, setSelectedRoomPreload] = useState<Room | null>(null);
  const [activeDetailRoom, setActiveDetailRoom] = useState<Room | null>(null);
  const [activeCheckoutRoom, setActiveCheckoutRoom] = useState<Room | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Buffer variables to carry selections from Booking widget to Checkout modal
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Success Notification banner configs
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Trigger skeleton loader animation whenever the page swings
  useEffect(() => {
    setIsPageLoading(true);
    const handler = setTimeout(() => {
      setIsPageLoading(false);
    }, 450);
    return () => clearTimeout(handler);
  }, [activePage]);

  // Serialize bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("diredawaras_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Handle smooth scroll to booking card section
  const handleScrollToBooking = () => {
    setActivePage("home");
    setTimeout(() => {
      const banner = document.getElementById("booking-anchor-section");
      if (banner) {
        banner.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  // Actions when room card triggers 'Book Room'
  const handleSelectRoomPreload = (room: Room) => {
    setSelectedRoomPreload(room);
    if (activePage !== "home" && activePage !== "rooms") {
      setActivePage("home");
      setTimeout(() => {
        handleScrollToBooking();
      }, 150);
    } else {
      handleScrollToBooking();
    }
  };

  // Actions when clicking Spec 'Expand' button on room card
  const handleOpenDetailModal = (room: Room) => {
    setActiveDetailRoom(room);
  };

  // Triggered when clicking 'Reserve Suite' from within Room details spec modal
  const handleBookFromSpecs = (room: Room) => {
    setActiveDetailRoom(null);
    setSelectedRoomPreload(room);
    handleScrollToBooking();
  };

  // Initiating full booking checkout form (from BookingWidget results grid)
  const handleInitiateBooking = (
    room: Room,
    checkIn: string,
    checkOut: string,
    adults: number,
    children: number
  ) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
    setAdultsCount(adults);
    setChildrenCount(children);
    setActiveCheckoutRoom(room);
  };

  // Final confirmation receipt callback
  const handleConfirmBooking = async (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveCheckoutRoom(null);
    setSuccessBooking(newBooking);

    try {
      await apiService.createBooking(newBooking);
    } catch (err) {
      console.warn("Could not save booking online, cached in local device ledger:", err);
    }

    // Auto dismiss checkouts
    setTimeout(() => {
      setSuccessBooking(null);
    }, 10000);

    // Scroll smoothly to reservation portal timeline
    setTimeout(() => {
      const historyView = document.getElementById("bookings-history");
      if (historyView) {
        historyView.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 800);
  };

  // Cancel reservation callback
  const handleCancelBooking = async (id: string) => {
    setBookings((prev) => prev.filter((bk) => bk.id !== id));
  };

  if (is404Route) {
    return (
      <div className="min-h-screen bg-[#FAF2E3] text-stone-800 font-sans flex flex-col justify-between py-12 px-6 relative overflow-hidden select-none">
        {/* Ambient Glowing Spot */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#9C2A2A]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        </div>

        {/* Header Branding */}
        <div className="max-w-4xl mx-auto w-full z-10 flex justify-between items-center border-b border-stone-200 pb-5">
          <div className="flex items-center space-x-3 text-left">
            <img 
              src="https://i.ibb.co/xS8gGjtb/Picsart-26-05-26-05-22-39-801.png" 
              alt="Official Dire Dawa Ras Hotel Logo" 
              className="h-10 w-auto object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-serif text-[11px] font-bold text-stone-500 tracking-wider uppercase">DIRE DAWA</span>
              <span className="block font-serif text-sm font-black text-[#9C2A2A] tracking-widest uppercase">RAS HOTEL</span>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="max-w-md w-full mx-auto my-auto z-10 bg-[#FFFDF9] border border-stone-200/60 rounded-[32px] p-8 md:p-12 shadow-xl text-center space-y-6">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl font-black text-[#9C2A2A] tracking-tight">
              Page Not Found
            </h2>
            <p className="text-stone-500 text-xs uppercase font-bold tracking-[0.2em] font-mono">
              Error Code 404
            </p>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed text-center">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="pt-2">
            <button 
              onClick={() => {
                window.location.href = "/";
              }}
              className="px-6 py-3 bg-[#9C2A2A] hover:bg-[#802222] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition shadow-lg cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Return Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="max-w-4xl mx-auto w-full z-10 text-center border-t border-stone-200/60 pt-6">
          <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest font-mono">
            © 2026 Dire Dawa Ras Hotel Group • All Rights Reserved
          </p>
        </div>
      </div>
    );
  }

  if (isMaintenance) {
    return (
      <div className="min-h-screen bg-[#FAF2E3] text-[#9C2A2A] font-sans flex flex-col justify-between py-12 px-6 relative overflow-hidden select-none">
        {/* Ambient Glowing Spot */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#9C2A2A]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        </div>

        {/* Header Branding */}
        <div className="max-w-4xl mx-auto w-full z-10 flex justify-between items-center border-b border-stone-200 pb-5">
          <div className="flex items-center space-x-3 text-left">
            <img 
              src="https://i.ibb.co/xS8gGjtb/Picsart-26-05-26-05-22-39-801.png" 
              alt="Brand Logo" 
              className="h-10 w-auto object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-serif text-[11px] font-bold text-stone-500 tracking-wider uppercase">
                {settings?.site_name || "DIRE DAWA RAS HOTEL"}
              </span>
              <span className="block font-serif text-sm font-black text-[#9C2A2A] tracking-widest uppercase">
                MAINTENANCE ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="max-w-md w-full mx-auto my-auto z-10 bg-[#FFFDF9] border border-stone-200/60 rounded-[32px] p-8 md:p-12 shadow-xl text-center space-y-6">
          <div className="space-y-3">
            <ShieldAlert className="w-12 h-12 mx-auto text-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-[#9C2A2A] tracking-tight">
              Under Maintenance
            </h2>
            <p className="text-stone-500 text-xs uppercase font-bold tracking-[0.2em] font-mono">
              Temporarily Offline
            </p>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed text-center">
            {settings?.banner_text || "The digital guest directory is undergoing scheduled routine performance updates to ensure lightning fast load speeds. Operations will restore immediately."}
          </p>

          {settings?.support_email && (
            <div className="pt-2 text-xs text-stone-500">
              Operations Support Terminal Email: <strong className="text-stone-700">{settings.support_email}</strong>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="max-w-4xl mx-auto w-full z-10 text-center border-t border-stone-200/60 pt-6">
          <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest font-mono">
            © 2026 {settings?.site_name || "Dire Dawa Ras Hotel Group"} • All Rights Reserved
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF2E3] selection:bg-[#D4AF37]/30 selection:text-[#9C2A2A] relative overflow-x-hidden" id="app-root-layout">
        {/* Absolute Ambient Glowing Light Spots */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[5%] left-[-10%] w-[50%] h-[35%] bg-[#9C2A2A]/12 rounded-full blur-[120px]" />
          <div className="absolute top-[35%] right-[-15%] w-[60%] h-[40%] bg-[#D4AF37]/10 rounded-full blur-[160px]" />
          <div className="absolute top-[65%] left-[-20%] w-[55%] h-[45%] bg-[#9C2A2A]/8 rounded-full blur-[150px]" />
          <div className="absolute bottom-[2%] right-[-10%] w-[50%] h-[30%] bg-[#9C2A2A]/10 rounded-full blur-[130px]" />
        </div>

        {/* Visual Success Booking Toast HUD Notification */}
        {successBooking && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
            <div className="bg-white rounded-xl p-5 text-left border border-white/10 flex items-start space-x-4">
            <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shrink-0">
              <Check className="w-5 h-5 shrink-0" />
            </div>
            
            <div className="flex-1 space-y-2.5 text-xs md:text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif font-extrabold text-base text-gray-800 leading-none">
                    Booking Finalized!
                  </h4>
                  <p className="text-[10px] text-[#9C2A2A] font-bold tracking-widest uppercase mt-1">
                    Voucher Code: {successBooking.confirmationCode}
                  </p>
                </div>
                <button
                  onClick={() => setSuccessBooking(null)}
                  className="p-1 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-gray-500 leading-relaxed text-xs">
                Congratulations, <strong>{successBooking.guestName}</strong>! Your stay for <strong>{successBooking.roomTitle}</strong> ({successBooking.totalNights} Nights) is successfully logged. Take a screenshot or show this voucher at reception upon arrival.
              </p>

              <button
                onClick={() => {
                  setSuccessBooking(null);
                  const h = document.getElementById("bookings-history");
                  if (h) h.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[#9C2A2A] hover:text-[#802222] font-bold inline-flex items-center space-x-1 hover:translate-x-0.5 transition-all text-xs"
              >
                <span>View Voucher Records</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Header Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} onBookClick={handleScrollToBooking} />

      {/* Main Page Swapper with Skeletons */}
      {isPageLoading ? (
        <SkeletonLoader type={activePage === "rooms" ? "rooms" : "page"} />
      ) : (
        <>
          {activePage === "home" && (
            <>
              {/* Hero Visual intro scroll pane */}
              <Hero
                onBookClick={handleScrollToBooking}
                onWatchVideo={() => setIsVideoOpen(true)}
                settings={settings}
                contentBlocks={contentBlocks}
              />

              {/* Availability check segment anchors */}
              <div id="booking-anchor-section" className="scroll-mt-24">
                <BookingWidget
                  onInitiateBooking={handleInitiateBooking}
                  selectedRoomPreload={selectedRoomPreload}
                  resetPreload={() => setSelectedRoomPreload(null)}
                />
              </div>

              {/* Signature general hospitality Services Grid */}
              <Services services={services} />

              {/* Dynamic rooms catalog */}
              <Rooms
                onSelectRoomPreload={handleSelectRoomPreload}
                onOpenDetailModal={handleOpenDetailModal}
              />

              {/* Visual Image masonry Grid */}
              <Gallery />

              {/* Booking Offers promotion card */}
              <Offers onGrabOfferClick={handleScrollToBooking} promotions={promotions} />

              {/* Member Interactive Local reservations log */}
              <BookingHistory
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onScrollToBooking={handleScrollToBooking}
              />
            </>
          )}

          {activePage === "rooms" && (
            <div className="pt-20">
              <Rooms
                onSelectRoomPreload={handleSelectRoomPreload}
                onOpenDetailModal={handleOpenDetailModal}
              />
              <div id="booking-anchor-section" className="scroll-mt-24">
                <BookingWidget
                  onInitiateBooking={handleInitiateBooking}
                  selectedRoomPreload={selectedRoomPreload}
                  resetPreload={() => setSelectedRoomPreload(null)}
                />
              </div>
              <BookingHistory
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
                onScrollToBooking={handleScrollToBooking}
              />
            </div>
          )}

          {activePage === "about" && (
            <div className="pt-20">
              <AboutUsPage />
            </div>
          )}

          {activePage === "dining" && (
            <div className="pt-20">
              <Dining />
            </div>
          )}

          {activePage === "services" && (
            <div className="pt-20">
              <Services services={services} />
            </div>
          )}

          {activePage === "gallery" && (
            <div className="pt-20">
              <Gallery />
            </div>
          )}

          {activePage === "contact" && (
            <div className="pt-20">
              <ContactPage />
            </div>
          )}
        </>
      )}

      {/* Corporate footer block serving all navigation page scopes */}
      <Footer onNavClick={setActivePage} settings={settings} contentBlocks={contentBlocks} />

      {/* ========================================= MODALS ========================================= */}

      {/* Immersive Room Details walkthrough modal */}
      <RoomDetailModal
        room={activeDetailRoom}
        isOpen={activeDetailRoom !== null}
        onClose={() => setActiveDetailRoom(null)}
        onBookDirect={handleBookFromSpecs}
      />

      {/* Interactive Guest checkout details form */}
      <CheckoutModal
        room={activeCheckoutRoom}
        checkIn={checkInDate}
        checkOut={checkOutDate}
        adults={adultsCount}
        children={childrenCount}
        onClose={() => setActiveCheckoutRoom(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Immersive play tour video modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
