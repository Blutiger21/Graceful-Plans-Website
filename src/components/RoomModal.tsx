"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import {
  Room,
  RoomType,
  buildRoomWhatsAppUrl,
  formatCurrency,
} from "@/data/properties";

interface RoomModalProps {
  room: Room | null;
  propertyAddress: string;
  onClose: () => void;
  onApplyRoom: (room: Room) => void;
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

export default function RoomModal({
  room,
  propertyAddress,
  onClose,
  onApplyRoom,
}: RoomModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Open/close native <dialog> using showModal() per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (room) {
      setActivePhotoIndex(0);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [room]);

  // Mandatory light-dismiss fallback for browsers without native dialog `closedby` support
  // plus returnValue cleanup on close per modern-web-guidance
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    let cleanupFallback: (() => void) | undefined;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
      cleanupFallback = () =>
        dialog.removeEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupFallback?.();
    };
  }, [onClose]);

  const photos = room?.images ?? [];

  const handlePrevPhoto = () => {
    setActivePhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const whatsappUrl = room
    ? buildRoomWhatsAppUrl(room.name, room.type, room.price, propertyAddress)
    : "#";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      className="m-auto w-[calc(100%-1.5rem)] max-w-2xl rounded-lg bg-white p-0 text-neutral-950 shadow-2xl border border-neutral-200 open:flex open:flex-col max-h-[92dvh]"
    >
      {room && (
        <div className="flex flex-col overflow-y-auto">
          {/* Modal Top Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-block px-2.5 py-0.5 rounded-sm text-xs font-medium border ${getRoomBadgeStyles(
                  room.type
                )}`}
              >
                {room.type} Room
              </span>
              <span className="text-xs text-neutral-500">
                {propertyAddress}
              </span>
            </div>

            <form method="dialog">
              <button
                type="submit"
                autoFocus
                {...({ autofocus: "" } as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                aria-label="Close room details modal"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* 3-Photo Interactive Gallery */}
          <div className="p-5 pb-3 space-y-3">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-neutral-100 border border-neutral-200">
              {photos.map((photoUrl, idx) => (
                <img
                  key={`${room.id}-photo-${idx}`}
                  src={photoUrl}
                  alt={`${room.name} (${room.type}) at ${propertyAddress} - Photo ${
                    idx + 1
                  } of ${photos.length}`}
                  width={900}
                  height={560}
                  {...(idx > 0
                    ? { fetchPriority: "low", loading: "lazy" }
                    : {})}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    idx === activePhotoIndex
                      ? "opacity-100 relative"
                      : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                />
              ))}

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                aria-label="Previous room photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-white/95 hover:bg-white text-neutral-950 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                aria-label="Next room photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-white/95 hover:bg-white text-neutral-950 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Photo Counter */}
              <div className="absolute bottom-3 right-3 bg-neutral-950/85 text-white text-xs font-medium px-2.5 py-1 rounded-sm tabular-nums">
                {activePhotoIndex + 1} / {photos.length}
              </div>
            </div>

            {/* 3 Thumbnail Switcher Buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              {photos.map((thumbUrl, index) => {
                const isSelected = index === activePhotoIndex;
                return (
                  <button
                    key={`${room.id}-thumb-${index}`}
                    type="button"
                    onClick={() => setActivePhotoIndex(index)}
                    aria-label={`View photo ${index + 1} of ${room.name}`}
                    aria-current={isSelected ? "true" : undefined}
                    className={`relative aspect-16/10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-neutral-950 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={thumbUrl}
                      alt={`${room.name} thumbnail ${index + 1}`}
                      width={300}
                      height={188}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Room Details & Features */}
          <div className="px-5 sm:px-6 py-4 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <h2
                  id={titleId}
                  className="text-2xl font-bold text-neutral-950 tracking-tight"
                >
                  {room.name}
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {propertyAddress}
                </p>
              </div>
              <div className="text-left sm:text-right tabular-nums">
                <span className="block text-2xl font-bold text-neutral-950">
                  {formatCurrency(room.price)}
                </span>
                <span className="block text-xs text-neutral-500">
                  per month (utilities included)
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {room.description}
            </p>

            {/* Specifications List */}
            <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200 space-y-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                Room Specifications &amp; Inclusions
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-800">
                {room.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check
                      className="w-3.5 h-3.5 text-neutral-950 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <Check
                    className="w-3.5 h-3.5 text-neutral-950 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Daily CUT Shuttle Service &amp; Laundry Access</span>
                </li>
              </ul>
            </div>

            {/* Dual Action Buttons */}
            <div className="pt-1 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-5 py-3.5 rounded-md transition-colors min-h-12"
              >
                Inquire via WhatsApp
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              {/* 2. Apply / Inquire Online Button */}
              <button
                type="button"
                onClick={() => onApplyRoom(room)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-950 font-medium text-sm px-5 py-3.5 rounded-md transition-colors min-h-12 cursor-pointer"
              >
                Apply / Inquire Online
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
