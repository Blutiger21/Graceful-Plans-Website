import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PROPERTIES,
  CONTACT_DETAILS,
  buildGeneralWhatsAppUrl,
} from "@/data/properties";

export default function Footer() {
  const whatsappUrl = buildGeneralWhatsAppUrl();

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Col 1: Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="block text-base font-bold tracking-tight uppercase text-white">
                {CONTACT_DETAILS.brandName}
              </span>
              <span className="block text-xs uppercase tracking-widest text-neutral-400 mt-0.5">
                Universitas • Bloemfontein
              </span>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Private and NSFAS-accredited student residences in Universitas,
              Bloemfontein. Uncapped Wi-Fi, water, electricity, laundry facilities,
              and daily CUT shuttle transport included.
            </p>

            <div className="pt-1">
              <span className="inline-block border border-neutral-800 bg-neutral-900 text-neutral-200 text-xs font-medium px-3 py-1.5 rounded-md">
                NSFAS Accredited for CUT Students — 10 rooms per house
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links to 3 Properties */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Residences
            </h2>
            <ul className="space-y-3">
              {PROPERTIES.map((property) => (
                <li key={property.id}>
                  <Link
                    href={`/properties/${property.slug}`}
                    className="group block text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    <span className="font-medium group-hover:underline underline-offset-4">
                      {property.address}
                    </span>
                    <span className="block text-xs text-neutral-500 tabular-nums mt-0.5">
                      {property.rooms.length} rooms • From R
                      {property.startingPrice.toLocaleString("en-ZA")}/mo
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact & WhatsApp */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Contact
            </h2>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>Universitas, Bloemfontein</li>
              <li className="tabular-nums">{CONTACT_DETAILS.phoneDisplay}</li>
              <li>{CONTACT_DETAILS.email}</li>
            </ul>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-neutral-950 font-medium text-sm px-4 py-2.5 rounded-md transition-colors min-h-11"
              >
                WhatsApp Direct
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                href="/#apply"
                className="inline-flex items-center justify-center border border-neutral-800 hover:border-neutral-600 text-neutral-200 hover:text-white font-medium text-sm px-4 py-2.5 rounded-md transition-colors min-h-11"
              >
                Application Form
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Graceful Plans. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Overview
            </Link>
            <Link href="/#properties" className="hover:text-white transition-colors">
              Properties
            </Link>
            <Link href="/#amenities" className="hover:text-white transition-colors">
              Amenities
            </Link>
            <Link href="/#apply" className="hover:text-white transition-colors">
              Apply
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
