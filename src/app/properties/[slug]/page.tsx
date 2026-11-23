import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Wifi,
  WashingMachine,
  Zap,
  Droplets,
  Bus,
  ShieldCheck,
} from "lucide-react";
import {
  PROPERTIES,
  getPropertyBySlug,
  formatCurrency,
  buildGeneralWhatsAppUrl,
} from "@/data/properties";
import PropertyRoomsSection from "@/components/PropertyRoomsSection";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    return {
      title: "Property Not Found — Graceful Plans",
    };
  }
  return {
    title: `${property.address} — Graceful Plans Student Accommodation`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const whatsappUrl = buildGeneralWhatsAppUrl(
    `Hi Graceful Plans, I'm viewing ${property.address} on your website and would like to inquire about available rooms.`
  );

  return (
    <div className="bg-white text-neutral-950">
      {/* 1. Property Header */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Navigation & Property Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#properties"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All Properties
            </Link>

            <div className="flex flex-wrap items-center gap-1.5">
              {PROPERTIES.map((p) => {
                const isCurrent = p.slug === property.slug;
                return (
                  <Link
                    key={p.id}
                    href={`/properties/${p.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      isCurrent
                        ? "bg-neutral-950 text-white"
                        : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-950"
                    }`}
                  >
                    {p.shortName}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Clear NSFAS Accreditation Banner */}
          <div className="bg-neutral-950 text-white rounded-lg p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-semibold">
                NSFAS Accredited for CUT Students (10 rooms allocated at this house).
              </p>
              <p className="text-xs text-neutral-400">
                Available to both NSFAS-funded CUT students and private cash applicants.
              </p>
            </div>
            <a
              href="#property-apply-form"
              className="inline-flex items-center justify-center bg-white text-neutral-950 hover:bg-neutral-200 font-medium text-xs sm:text-sm px-4 py-2.5 rounded-md transition-colors shrink-0 min-h-10"
            >
              Apply for This Residence
            </a>
          </div>

          {/* Main Header Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-neutral-950 mb-2">
                  <img
                    src="/Graceful%20Plans%20New%20Season%20Properties.png"
                    alt="Graceful Plans New Season Properties Logo"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <span>Graceful Plans • {property.suburb}, Free State</span>
                </div>
                <h1 className="hero-headline font-bold text-neutral-950 mt-1">
                  {property.address}
                </h1>
              </div>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {property.longDescription}
              </p>

              {/* Room Summary & Direct WhatsApp */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {property.roomSummary.map((item) => (
                  <div
                    key={item.type}
                    className="bg-white border border-neutral-200 rounded-md px-4 py-2.5"
                  >
                    <span className="block text-sm font-bold text-neutral-950">
                      {item.count} × {item.type} Room{item.count > 1 ? "s" : ""}
                    </span>
                    <span className="text-xs text-neutral-500 tabular-nums">
                      {formatCurrency(item.price)} / month
                    </span>
                  </div>
                ))}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-5 py-3.5 rounded-md transition-colors min-h-12"
                >
                  WhatsApp Inquiry
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Exterior Showcase Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 aspect-16/10">
                <img
                  src={property.exteriorImage}
                  alt={property.exteriorImageAlt}
                  width={800}
                  height={500}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Services Provided Strip */}
        <section
          aria-label="Included services at this property"
          className="py-6 border-b border-neutral-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Services Provided
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md">
                <Wifi className="w-3.5 h-3.5" aria-hidden="true" />
                Uncapped Wi-Fi
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md">
                <WashingMachine className="w-3.5 h-3.5" aria-hidden="true" />
                Laundry Machine
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                Electricity Included
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md">
                <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
                Water Included
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-900 border border-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md">
                <Bus className="w-3.5 h-3.5" aria-hidden="true" />
                CUT Shuttle Services
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-950 text-white text-xs font-medium px-3 py-1.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                10 CUT NSFAS Rooms
              </span>
            </div>
          </div>
        </section>

        {/* 3. Shared Spaces Photo Gallery (Outside Yard, Kitchen, Toilet & Bathroom) */}
        <section
          aria-labelledby="shared-spaces-heading"
          className="py-12 border-b border-neutral-200"
        >
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
              Communal Areas
            </p>
            <h2
              id="shared-spaces-heading"
              className="section-headline font-bold text-neutral-950"
            >
              Shared Spaces Photo Gallery
            </h2>
            <p className="text-neutral-600 text-sm mt-1">
              Outside yard, communal kitchen, and bathroom facilities at{" "}
              {property.address}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {property.sharedSpaces.map((space, idx) => (
              <figure
                key={space.label}
                className="bg-white rounded-lg border border-neutral-200 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden border-b border-neutral-200">
                  <img
                    src={space.imageUrl}
                    alt={space.alt}
                    width={600}
                    height={375}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-neutral-950/90 text-white text-xs font-medium px-2.5 py-1 rounded-sm">
                      0{idx + 1} — {space.label}
                    </span>
                  </div>
                </div>
                <figcaption className="p-4 space-y-1 flex-1">
                  <h3 className="text-sm font-bold text-neutral-950">
                    {space.label}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {space.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 4. Available Rooms List + Room Detail Modal + Property Application Form */}
        <PropertyRoomsSection property={property} />

        {/* Other Residences Navigation */}
        <section
          aria-label="Explore our other residences"
          className="py-12 border-t border-neutral-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-neutral-950">
              Other Residences in Universitas
            </h2>
            <Link
              href="/#properties"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 underline underline-offset-4"
            >
              View all properties
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROPERTIES.filter((p) => p.slug !== property.slug).map((other) => (
              <Link
                key={other.id}
                href={`/properties/${other.slug}`}
                className="group flex items-center gap-4 p-4 rounded-lg border border-neutral-200 hover:border-neutral-950 transition-colors bg-white"
              >
                <img
                  src={other.exteriorImage}
                  alt={other.exteriorImageAlt}
                  width={120}
                  height={90}
                  loading="lazy"
                  className="w-24 h-20 rounded-md object-cover shrink-0 bg-neutral-100"
                />
                <div className="space-y-1">
                  <span className="inline-block text-[11px] font-medium text-neutral-600 border border-neutral-200 px-2 py-0.5 rounded-sm">
                    10 CUT NSFAS Rooms
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 group-hover:underline underline-offset-4">
                    {other.address}
                  </h3>
                  <p className="text-xs text-neutral-500 tabular-nums">
                    {other.rooms.length} Rooms • From{" "}
                    {formatCurrency(other.startingPrice)}/month
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
