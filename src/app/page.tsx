import React from "react";
import Link from "next/link";
import {
  Wifi,
  WashingMachine,
  Zap,
  Droplets,
  Bus,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  PROPERTIES,
  INCLUDED_SERVICES,
  formatCurrency,
  buildGeneralWhatsAppUrl,
} from "@/data/properties";
import ApplicationForm from "@/components/ApplicationForm";

function ServiceIcon({ name }: { name: (typeof INCLUDED_SERVICES)[number]["iconName"] }) {
  const iconProps = { className: "w-5 h-5 text-neutral-950", "aria-hidden": true as const };
  switch (name) {
    case "Wifi":
      return <Wifi {...iconProps} />;
    case "WashingMachine":
      return <WashingMachine {...iconProps} />;
    case "Zap":
      return <Zap {...iconProps} />;
    case "Droplets":
      return <Droplets {...iconProps} />;
    case "Bus":
      return <Bus {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
  }
}

export default function HomePage() {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <div className="bg-white text-neutral-950">
      {/* 1. Hero Section */}
      <section className="border-b border-neutral-200 py-14 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-neutral-950 bg-neutral-950 text-white text-xs font-medium tracking-wide px-3.5 py-1.5 rounded-md">
                <span>NSFAS Accredited for CUT Students — 10 NSFAS rooms per house</span>
              </div>

              <h1 className="hero-headline font-bold text-neutral-950">
                Student accommodation in Universitas, Bloemfontein.
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
                Graceful Plans operates three private student residences in Universitas.
                Every room includes uncapped Wi-Fi, water, electricity, laundry
                facilities, and daily shuttle transport to Central University of
                Technology (CUT).
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#properties"
                  className="inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-7 py-4 rounded-md transition-colors min-h-12"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-300 font-medium text-sm px-7 py-4 rounded-md transition-colors min-h-12"
                >
                  Submit an Application
                </a>
              </div>

              {/* Clean Architectural Key Metrics */}
              <div className="pt-6 border-t border-neutral-200 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <span className="block text-2xl font-bold text-neutral-950 tabular-nums">
                    3
                  </span>
                  <span className="text-xs text-neutral-500">
                    Universitas Houses
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-neutral-950 tabular-nums">
                    10 / house
                  </span>
                  <span className="text-xs text-neutral-500">
                    CUT NSFAS Rooms
                  </span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-neutral-950 tabular-nums">
                    R3,500+
                  </span>
                  <span className="text-xs text-neutral-500">
                    Monthly All-Inclusive
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Primary Photograph (LCP image) */}
            <div className="lg:col-span-5">
              <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-100">
                <div className="aspect-4/3 w-full">
                  <img
                    src={PROPERTIES[0].exteriorImage}
                    alt="Graceful Plans student residence exterior in Universitas, Bloemfontein"
                    width={800}
                    height={600}
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white border-t border-neutral-200 flex items-center justify-between gap-4 text-xs">
                  <span className="font-semibold text-neutral-950">
                    107 Paul Kruger Ave • 43 Boersma St • 6 Benedictus Kok St
                  </span>
                  <span className="text-neutral-500 shrink-0">Universitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Included Services & Amenities Strip */}
      <section
        id="amenities"
        aria-labelledby="amenities-heading"
        className="py-16 sm:py-20 bg-neutral-50 border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
              Standard Inclusions
            </p>
            <h2
              id="amenities-heading"
              className="section-headline font-bold text-neutral-950"
            >
              Included Services &amp; Amenities
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base">
              All monthly rates cover core utilities, connectivity, laundry access, and
              scheduled campus transport.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-200 bg-white">
            {INCLUDED_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 sm:p-8 border-r border-b border-neutral-200 flex flex-col justify-between space-y-4"
              >
                <div className="w-10 h-10 rounded-md border border-neutral-200 bg-neutral-50 flex items-center justify-center">
                  <ServiceIcon name={service.iconName} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-950">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Properties Section */}
      <section
        id="properties"
        aria-labelledby="properties-heading"
        className="py-16 sm:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-2">
                Residences
              </p>
              <h2
                id="properties-heading"
                className="section-headline font-bold text-neutral-950"
              >
                Our Properties in Universitas
              </h2>
              <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-xl">
                Select a residence to inspect shared spaces, room availability, and
                individual room photographs.
              </p>
            </div>

            <div className="text-xs font-medium text-neutral-700 border border-neutral-300 px-3.5 py-2 rounded-md self-start md:self-auto">
              10 CUT NSFAS Rooms Allocated Per Residence
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((property) => (
              <article
                key={property.id}
                className="group bg-white rounded-lg border border-neutral-200 hover:border-neutral-950 transition-colors overflow-hidden flex flex-col"
              >
                {/* Exterior Stock Photo */}
                <div className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden border-b border-neutral-200">
                  <img
                    src={property.exteriorImage}
                    alt={property.exteriorImageAlt}
                    width={600}
                    height={375}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-neutral-950 text-white text-xs font-medium px-3 py-1 rounded-sm">
                      10 CUT NSFAS Rooms
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        {property.suburb}
                      </p>
                      <h3 className="text-xl font-bold text-neutral-950 mt-0.5">
                        {property.address}
                      </h3>
                    </div>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {property.description}
                    </p>

                    {/* Room Breakdown Table */}
                    <div className="border-t border-b border-neutral-200 py-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        <span>Configuration</span>
                        <span>Monthly Rate</span>
                      </div>
                      <ul className="space-y-1.5 text-sm">
                        {property.roomSummary.map((item) => (
                          <li
                            key={item.type}
                            className="flex items-center justify-between text-neutral-800"
                          >
                            <span>
                              {item.count} × {item.type} Room{item.count > 1 ? "s" : ""}
                            </span>
                            <span className="font-semibold text-neutral-950 tabular-nums">
                              {formatCurrency(item.price)} / mo
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price & Link */}
                  <div className="space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-neutral-500">Starting from</span>
                      <span className="text-xl font-bold text-neutral-950 tabular-nums">
                        {formatCurrency(property.startingPrice)}{" "}
                        <span className="text-xs font-normal text-neutral-500">
                          / month
                        </span>
                      </span>
                    </div>

                    <Link
                      href={`/properties/${property.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-5 py-3.5 rounded-md transition-colors min-h-11"
                    >
                      View Property &amp; Rooms
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Application / Inquiry Form Section */}
      <section
        id="apply"
        aria-label="Student Accommodation Application Form"
        className="py-16 sm:py-20 bg-neutral-50 border-t border-neutral-200"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationForm />

          {/* Clean Direct WhatsApp Strip */}
          <div className="mt-8 bg-neutral-950 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-sm font-semibold">Direct Admissions Inquiry</p>
              <p className="text-xs text-neutral-400">
                Contact our Universitas management team directly on WhatsApp for viewing
                appointments.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white hover:bg-neutral-200 text-neutral-950 font-medium text-sm px-5 py-3 rounded-md transition-colors shrink-0 min-h-11"
            >
              WhatsApp Admissions
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
