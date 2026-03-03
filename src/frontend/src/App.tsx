import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Loader2,
  Map as MapIcon,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

// ─── Constants ───────────────────────────────────────────────────────────────
const PHONE = "09989362643";
const PHONE_TEL = "tel:09989362643";
const WHATSAPP_BASE = "https://wa.me/919989362643";
const MAPS_URL = "https://maps.google.com/?q=Focus+Opticals+Vijayawada";
const ADDRESS =
  "9-76-3, Vinnakota Vari St, near S.K.P.V. Hindu High School Line, Chowk, Vijayawada, Andhra Pradesh – 520001";

const PRODUCTS = [
  {
    name: "Summer Cooling Goggles",
    description: "Stylish UV-protective goggles for hot summer days.",
    id: 1,
  },
  {
    name: "General Frames",
    description: "Durable and elegant frames for everyday use.",
    id: 2,
  },
  {
    name: "Cooling Goggles",
    description: "Comfortable cooling goggles for all-day wear.",
    id: 3,
  },
  {
    name: "Summer Glasses",
    description: "Lightweight summer glasses with full UV protection.",
    id: 4,
  },
] as const;

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Timings", href: "#timings" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── StarRating ───────────────────────────────────────────────────────────────
const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

function StarRating({ rating, total = 5 }: { rating: number; total?: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of ${total} stars`}
    >
      {STAR_POSITIONS.slice(0, total).map((pos) => (
        <Star
          key={pos}
          className={`h-4 w-4 ${pos <= rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
}) {
  const waLink = `${WHATSAPP_BASE}?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`;
  const ocidItem = `products.item.${index}` as const;

  return (
    <article
      data-ocid={ocidItem}
      className="group bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-blue-light to-secondary flex items-center justify-center overflow-hidden">
        <div className="text-center p-4">
          <Eye className="h-10 w-10 text-brand-blue mx-auto mb-2 opacity-40" />
          <p className="text-sm text-muted-foreground font-sans font-medium">
            Image Coming Soon
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-display font-bold text-lg text-foreground leading-tight group-hover:text-brand-blue-mid transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Inquiry Buttons */}
        <div className="flex gap-2 pt-1">
          <a
            href={PHONE_TEL}
            className="flex-1"
            aria-label={`Call to inquire about ${product.name}`}
          >
            <Button
              variant="default"
              size="sm"
              className="w-full bg-primary hover:bg-brand-navy font-sans font-semibold gap-1.5 text-xs"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            aria-label={`WhatsApp to inquire about ${product.name}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800 font-sans font-semibold gap-1.5 text-xs"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── WhatsApp SVG Icon ────────────────────────────────────────────────────────
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-blue">
              <Eye className="h-4.5 w-4.5 text-white h-[18px] w-[18px]" />
            </div>
            <span className="font-display font-extrabold text-lg text-foreground tracking-tight">
              Focus <span className="text-brand-blue-mid">Opticals</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className="px-3 py-2 text-sm font-sans font-medium text-muted-foreground hover:text-brand-blue transition-colors rounded-lg hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
            <a href={PHONE_TEL} className="ml-2">
              <Button
                size="sm"
                className="font-sans font-semibold gap-1.5 shadow-blue"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </Button>
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white shadow-lg animate-fade-in">
          <nav
            className="container mx-auto px-4 py-3 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                onClick={handleNavClick}
                className="px-4 py-3 text-sm font-sans font-medium text-foreground hover:text-brand-blue hover:bg-secondary rounded-lg transition-colors flex items-center justify-between"
              >
                {link.label}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </a>
            ))}
            <a href={PHONE_TEL} onClick={handleNavClick} className="mt-1">
              <Button className="w-full font-sans font-semibold gap-2">
                <Phone className="h-4 w-4" />
                Call Now – {PHONE}
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Store image placeholder banner */}
      <div className="relative flex-1 min-h-[480px] md:min-h-[600px] bg-gradient-to-br from-brand-navy via-primary to-brand-blue-mid flex items-center justify-center overflow-hidden">
        {/* Decorative mesh circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-blue-vivid opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent opacity-15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/8" />
        </div>

        <div className="relative z-10 text-center px-6 py-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white/90 text-xs font-sans font-medium mb-6 backdrop-blur-sm">
            <Eye className="h-3.5 w-3.5" />
            Trusted Optical Store in Vijayawada
          </div>

          {/* Store image placeholder */}
          <div className="w-full max-w-md mx-auto mb-8 aspect-video rounded-2xl border-2 border-dashed border-white/30 bg-white/8 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <Eye className="h-10 w-10 text-white/40 mx-auto mb-2" />
              <p className="text-white/60 text-sm font-sans">
                Store Image Coming Soon
              </p>
            </div>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-3 tracking-tight">
            Focus Opticals
          </h1>
          <p className="font-sans font-medium text-lg sm:text-xl text-white/80 mb-8 italic">
            Clear Vision. Better Style.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_TEL}>
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="w-full sm:w-auto bg-white text-brand-navy hover:bg-white/90 font-display font-bold text-base gap-2 shadow-blue-lg px-6"
              >
                <Phone className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                Call Now
              </Button>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/40 text-white hover:bg-white/15 hover:text-white hover:border-white/60 font-display font-bold text-base gap-2 backdrop-blur-sm px-6"
              >
                <Navigation className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                Get Directions
              </Button>
            </a>
          </div>

          {/* Quick info pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-sans backdrop-blur-sm border border-white/15">
              <Clock className="h-3 w-3" />
              Open Daily 10 AM – 9 PM
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-sans backdrop-blur-sm border border-white/15">
              <MapPin className="h-3 w-3" />
              Chowk, Vijayawada
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/20 rounded-full text-amber-100 text-xs font-sans backdrop-blur-sm border border-amber-400/30">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              4.0 Rated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
            <Eye className="h-7 w-7 text-brand-blue" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-4 tracking-tight">
            About Us
          </h2>

          <div className="flex items-center justify-center gap-3 mb-8">
            <Separator className="w-12 bg-border" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <Separator className="w-12 bg-border" />
          </div>

          <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            Focus Opticals is a trusted optical store in Vijayawada offering
            quality frames, cooling goggles, and summer glasses. We focus on{" "}
            <strong className="text-foreground font-semibold">
              comfort, durability, and style
            </strong>{" "}
            to give customers the best vision experience.
          </p>

          {/* Feature pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              {
                icon: "🎯",
                title: "Precision Fit",
                desc: "Expert fitting for maximum comfort",
              },
              {
                icon: "✨",
                title: "Quality Frames",
                desc: "Premium brands & styles in stock",
              },
              {
                icon: "💙",
                title: "Trusted Service",
                desc: "Years of serving Vijayawada",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-secondary/60 rounded-2xl p-5 border border-border hover:border-primary/30 hover:bg-secondary transition-all"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-display font-bold text-base text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────
function ProductsSection() {
  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-b from-secondary/40 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 font-sans font-semibold text-brand-blue-mid bg-primary/10 border-0 text-xs uppercase tracking-wider px-3 py-1"
          >
            Our Products
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight mb-4">
            Find Your Perfect Pair
          </h2>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto">
            From UV-protective goggles to everyday frames — we have eyewear for
            every need and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 1} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href={PHONE_TEL}>
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-semibold gap-2 border-primary/40 text-brand-blue hover:bg-primary/5"
            >
              <Phone className="h-4 w-4" />
              Inquire About Products – {PHONE}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Timings Section ──────────────────────────────────────────────────────────
function TimingsSection() {
  return (
    <section id="timings" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10">
          <Badge
            variant="secondary"
            className="mb-4 font-sans font-semibold text-brand-blue-mid bg-primary/10 border-0 text-xs uppercase tracking-wider px-3 py-1"
          >
            Store Timings
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            When to Visit Us
          </h2>
        </div>

        {/* Main timings card */}
        <div className="bg-gradient-to-br from-primary via-brand-blue-mid to-accent rounded-3xl p-8 sm:p-12 text-white shadow-blue-lg relative overflow-hidden">
          {/* Decorative rings */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Clock */}
            <div className="w-20 h-20 rounded-full bg-white/15 border-4 border-white/30 flex items-center justify-center mb-6 shadow-lg">
              <Clock className="h-9 w-9 text-white" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white/90 text-xs font-sans font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open Daily
            </div>

            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-2 tracking-tight">
              10:00 AM – 9:00 PM
            </div>
            <p className="font-sans text-white/70 mb-6 text-sm">
              Monday through Sunday
            </p>

            <Separator className="bg-white/20 w-32 mb-6" />

            {/* Best time badge */}
            <div className="bg-amber-400/20 border border-amber-400/40 rounded-2xl px-6 py-3 inline-flex items-center gap-3">
              <Star className="h-5 w-5 fill-amber-300 text-amber-300 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-white/70 font-sans font-medium uppercase tracking-wide mb-0.5">
                  Best Time to Visit
                </p>
                <p className="font-display font-bold text-white text-lg">
                  Around 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Address quick info */}
        <div className="mt-6 bg-secondary/60 rounded-2xl p-5 border border-border flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="h-4.5 w-4.5 h-[18px] w-[18px] text-brand-blue" />
          </div>
          <div>
            <p className="font-sans font-semibold text-foreground text-sm mb-0.5">
              Store Location
            </p>
            <p className="font-sans text-muted-foreground text-sm leading-relaxed">
              {ADDRESS}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const submitMutation = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    submitMutation.mutate(
      { name: name.trim(), phone: phone.trim(), message: message.trim() },
      {
        onSuccess: () => {
          toast.success("Inquiry sent! We'll get back to you soon.");
          setName("");
          setPhone("");
          setMessage("");
        },
        onError: () => {
          toast.error(
            "Failed to send inquiry. Please try calling us directly.",
          );
        },
      },
    );
  };

  const isSuccess = submitMutation.isSuccess;
  const isLoading = submitMutation.isPending;
  const isError = submitMutation.isError;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <Label
          htmlFor="contact-name"
          className="font-sans font-medium text-sm text-foreground mb-1.5 block"
        >
          Your Name
        </Label>
        <Input
          id="contact-name"
          data-ocid="contact.input"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="name"
          className="font-sans"
        />
      </div>

      <div>
        <Label
          htmlFor="contact-phone"
          className="font-sans font-medium text-sm text-foreground mb-1.5 block"
        >
          Phone Number
        </Label>
        <Input
          id="contact-phone"
          data-ocid="contact.phone_input"
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          required
          autoComplete="tel"
          className="font-sans"
        />
      </div>

      <div>
        <Label
          htmlFor="contact-message"
          className="font-sans font-medium text-sm text-foreground mb-1.5 block"
        >
          Message
        </Label>
        <Textarea
          id="contact-message"
          data-ocid="contact.textarea"
          placeholder="Tell us what you're looking for..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          required
          rows={4}
          className="font-sans resize-none"
        />
      </div>

      {/* States */}
      {isLoading && (
        <div
          data-ocid="contact.loading_state"
          className="flex items-center gap-2 text-sm text-muted-foreground font-sans py-2"
        >
          <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
          Sending your inquiry...
        </div>
      )}

      {isSuccess && !isLoading && (
        <div
          data-ocid="contact.success_state"
          className="flex items-center gap-2.5 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3 font-sans"
        >
          <CheckCircle2 className="h-4.5 w-4.5 h-[18px] w-[18px] flex-shrink-0" />
          Inquiry sent successfully! We'll contact you soon.
        </div>
      )}

      {isError && !isLoading && (
        <div
          data-ocid="contact.error_state"
          className="flex items-center gap-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 font-sans"
        >
          <AlertCircle className="h-4.5 w-4.5 h-[18px] w-[18px] flex-shrink-0" />
          Failed to send. Please call us at {PHONE}.
        </div>
      )}

      <Button
        type="submit"
        data-ocid="contact.submit_button"
        disabled={isLoading}
        className="w-full font-display font-bold text-base gap-2 shadow-blue"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Inquiry
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-secondary/30 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 font-sans font-semibold text-brand-blue-mid bg-primary/10 border-0 text-xs uppercase tracking-wider px-3 py-1"
          >
            Contact Us
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Have questions about our products? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact info column */}
          <div className="space-y-5">
            {/* Phone */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5.5 w-5.5 h-[22px] w-[22px] text-brand-blue" />
              </div>
              <div>
                <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                  Phone
                </p>
                <a
                  href={PHONE_TEL}
                  className="font-display font-bold text-xl text-foreground hover:text-brand-blue transition-colors"
                >
                  {PHONE}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="h-5.5 w-5.5 h-[22px] w-[22px] text-brand-blue" />
              </div>
              <div>
                <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                  Address
                </p>
                <p className="font-sans text-sm text-foreground leading-relaxed">
                  {ADDRESS}
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-sans font-semibold text-brand-blue hover:underline"
                >
                  <Navigation className="h-3 w-3" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white rounded-2xl border border-border shadow-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5.5 w-5.5 h-[22px] w-[22px] text-brand-blue" />
              </div>
              <div>
                <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                  Hours
                </p>
                <p className="font-display font-bold text-foreground">
                  Open Daily
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  10:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            {/* WhatsApp quick contact */}
            <a
              href={`${WHATSAPP_BASE}?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20your%20products`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-green-500 text-green-700 hover:bg-green-50 font-display font-bold gap-2"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>

            {/* Map placeholder */}
            <div
              data-ocid="contact.map_marker"
              className="bg-gradient-to-br from-secondary to-brand-blue-light rounded-2xl border border-border h-40 flex items-center justify-center gap-3 text-muted-foreground"
            >
              <MapIcon className="h-8 w-8 text-brand-blue opacity-50" />
              <div>
                <p className="font-sans font-semibold text-sm text-foreground">
                  Map will be embedded here
                </p>
                <p className="text-xs font-sans mt-0.5">
                  Google Maps integration
                </p>
              </div>
            </div>
          </div>

          {/* Contact form column */}
          <div className="bg-white rounded-2xl border border-border shadow-card p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl text-foreground mb-6">
              Send Us an Inquiry
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-10">
          <Badge
            variant="secondary"
            className="mb-4 font-sans font-semibold text-brand-blue-mid bg-primary/10 border-0 text-xs uppercase tracking-wider px-3 py-1"
          >
            Customer Reviews
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight mb-4">
            What Our Customers Say
          </h2>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-3 mt-2">
            <div className="font-display font-extrabold text-4xl text-amber-600">
              4.0
            </div>
            <div>
              <StarRating rating={4} />
              <p className="text-xs text-amber-700 font-sans mt-0.5">
                Based on 1 review
              </p>
            </div>
          </div>
        </div>

        {/* Review card */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 hover:shadow-card-hover transition-shadow">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0">
              R
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div>
                  <p className="font-display font-bold text-foreground">
                    Ravi Kumar
                  </p>
                  <p className="text-xs text-muted-foreground font-sans">
                    Verified Customer
                  </p>
                </div>
                <StarRating rating={4} />
              </div>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                "Good collection of frames and goggles. Helpful staff and
                reasonable prices."
              </p>
            </div>
          </div>
        </div>

        {/* CTA to leave review */}
        <p className="text-center text-sm text-muted-foreground font-sans mt-6">
          Happy with our service?{" "}
          <a
            href={`${WHATSAPP_BASE}?text=Hi%2C%20I%20wanted%20to%20share%20my%20experience%20at%20Focus%20Opticals`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue font-semibold hover:underline"
          >
            Share your experience
          </a>
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const currentYear = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Eye className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                Focus Opticals
              </span>
            </div>
            <p className="font-sans text-white/60 text-sm leading-relaxed italic mb-4">
              Clear Vision. Better Style.
            </p>
            <a
              href={`${WHATSAPP_BASE}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Focus%20Opticals`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="border-white/25 text-white hover:bg-white/10 hover:text-white font-sans gap-1.5 text-xs"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp Us
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white/80 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm text-white/80 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={PHONE_TEL}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors font-sans"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                {PHONE}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60 font-sans">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60 font-sans">
                <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                Open Daily: 10 AM – 9 PM
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/15 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 font-sans">
          <p>© {currentYear} Focus Opticals. All rights reserved.</p>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Float Button ────────────────────────────────────────────────────
function WhatsAppFloatButton() {
  return (
    <a
      href={`${WHATSAPP_BASE}?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20your%20products`}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid="whatsapp.button"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
    </a>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TimingsSection />
        <ContactSection />
        <ReviewsSection />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}
