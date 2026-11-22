"use client";

import React, { useState } from "react";
import {
  Property,
  Room,
  RoomType,
  formatCurrency,
} from "@/data/properties";
import RoomModal from "@/components/RoomModal";
import ApplicationForm from "@/components/ApplicationForm";

interface PropertyRoomsSectionProps {
  property: Property;
}

function getRoomBadgeStyles(type: RoomType): string {
  switch (type) {
    case "Bachelor":
      return "bg-neutral-950 text-white border-neutral-950";
    case "Single":
      return "bg-white text-neutral-950 border-neutral-300";
    case "Sharing":
      return "bg-neutral-100 text-neutral-800 border-neutral-300";
  }
}

export default function PropertyRoomsSection({
  property,
}: PropertyRoomsSectionProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [prefilledRoom, setPrefilledRoom] = useState<Room | null>(null);

  const handleApplyFromModal = (room: Room) => {
    setSelectedRoom(null);
    setPrefilledRoom(room);

    window.dispatchEvent(
      new CustomEvent("gp:prefill-application", {
        detail: {
          propertyAddress: property.address,
          roomType: room.type,
          roomName: room.name,
          price: room.price,
        },
      })
    );

    setTimeout(() => {
      const formEl = document.getElementById("property-apply-form");
      formEl?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* 4. Available Rooms List (Clean clickable cards, no filters) */}
      <section aria-labelledby="available-rooms-heading" className="py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">
              {property.rooms.length} Rooms Total
            </p>
            <h2
              id="available-rooms-heading"
              className="section-headline font-bold text-neutral-950"
            >
              Available Rooms
            </h2>
            <p className="text-neutral-600 text-sm mt-1">
              Select any room card to inspect its 3 interior photographs, specifications,
              and inquiry options.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {property.roomSummary.map((summary) => (
              <span
                key={summary.type}
                className="inline-flex items-center gap-1.5 bg-neutral-50 text-neutral-800 text-xs font-medium px-3 py-1.5 rounded-md border border-neutral-200 tabular-nums"
              >
                <span>
                  {summary.count} {summary.type}
                  {summary.count > 1 ? "s" : ""}
                </span>
                <span className="text-neutral-400">•</span>
                <span className="font-semibold text-neutral-950">
                  {formatCurrency(summary.price)}/mo
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {property.rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => setSelectedRoom(room)}
              aria-label={`Inspect ${room.name}, ${room.type} room at ${formatCurrency(
                room.price
              )} per month`}
              className="group text-left bg-white rounded-lg border border-neutral-200 hover:border-neutral-950 transition-colors overflow-hidden flex flex-col focus-visible:outline-2 focus-visible:outline-neutral-950 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-16/11 w-full bg-neutral-100 overflow-hidden border-b border-neutral-200">
                <img
                  src={room.thumbnail}
                  alt={`${room.name} (${room.type}) at ${property.address}`}
                  width={500}
                  height={344}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-sm text-xs font-medium border ${getRoomBadgeStyles(
                      room.type
                    )}`}
                  >
                    {room.type}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-neutral-950/85 text-white text-[11px] font-medium px-2 py-0.5 rounded-sm">
                  3 Photos
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-950">
                    {room.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-2">
                  <div className="tabular-nums">
                    <span className="text-base font-bold text-neutral-950">
                      {formatCurrency(room.price)}
                    </span>
                    <span className="text-xs text-neutral-500"> / month</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-950 group-hover:underline underline-offset-4">
                    Inspect →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Room Detail Modal */}
      <RoomModal
        room={selectedRoom}
        propertyAddress={property.address}
        onClose={() => setSelectedRoom(null)}
        onApplyRoom={handleApplyFromModal}
      />

      {/* Property-Specific Application Form Section */}
      <section
        id="property-apply-form"
        aria-label="Apply for a room at this property"
        className="py-12 border-t border-neutral-200"
      >
        <div className="max-w-3xl mx-auto">
          <ApplicationForm
            initialProperty={property.address}
            initialRoomType={prefilledRoom?.type || property.roomSummary[0].type}
            initialRoomName={prefilledRoom?.name}
            heading={`Apply for ${property.shortName}`}
            subheading={`Submit an inquiry or application for ${property.address}. 10 rooms at this house are allocated for CUT NSFAS students.`}
          />
        </div>
      </section>
    </>
  );
}
