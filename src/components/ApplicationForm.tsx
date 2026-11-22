"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import {
  Check,
  AlertCircle,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import {
  PROPERTIES,
  RoomType,
  WHATSAPP_NUMBER,
} from "@/data/properties";

export interface ApplicationFormProps {
  initialProperty?: string;
  initialRoomType?: RoomType | "";
  initialRoomName?: string;
  heading?: string;
  subheading?: string;
}

export default function ApplicationForm({
  initialProperty = "",
  initialRoomType = "",
  initialRoomName = "",
  heading = "Accommodation Application & Inquiry",
  subheading = "Complete the form below to apply for a room or request availability confirmation.",
}: ApplicationFormProps) {
  const formHeadingId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("CUT (Central University of Technology)");
  const [fundingType, setFundingType] = useState("NSFAS (CUT Accredited)");
  const [preferredProperty, setPreferredProperty] = useState(
    initialProperty || PROPERTIES[0].address
  );
  const [preferredRoomType, setPreferredRoomType] = useState<RoomType>(
    (initialRoomType as RoomType) || "Single"
  );
  const [message, setMessage] = useState(
    initialRoomName
      ? `I would like to apply for ${initialRoomName} (${initialRoomType || "Room"}) at ${
          initialProperty || PROPERTIES[0].address
        }.`
      : ""
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialProperty) {
      setPreferredProperty(initialProperty);
    }
    if (initialRoomType) {
      setPreferredRoomType(initialRoomType as RoomType);
    }
    if (initialRoomName) {
      setMessage(
        `I would like to apply for ${initialRoomName} (${
          initialRoomType || "Room"
        }) at ${initialProperty || preferredProperty}.`
      );
    }
  }, [initialProperty, initialRoomType, initialRoomName]);

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{
        propertyAddress: string;
        roomType: RoomType;
        roomName: string;
        price: number;
      }>;
      if (!customEvent.detail) return;
      const { propertyAddress, roomType, roomName, price } = customEvent.detail;
      setPreferredProperty(propertyAddress);
      setPreferredRoomType(roomType);
      setMessage(
        `Hi Graceful Plans, I'm applying for ${roomName} (${roomType} - R${price.toLocaleString(
          "en-ZA"
        )}/month) at ${propertyAddress}.`
      );
      setIsSubmitted(false);
    };

    window.addEventListener("gp:prefill-application", handlePrefill);
    return () => window.removeEventListener("gp:prefill-application", handlePrefill);
  }, []);

  // Modern Web Guidance: Sync aria-invalid with :user-invalid, manage dynamic aria-describedby
  // error links, and provide fallback for browsers without selector(:user-invalid)
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("selector(:user-invalid)");

    const dirtyState = new WeakMap<
      Element,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();
    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();
    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: Element | null = null;

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
      else el.removeAttribute("aria-describedby");
    };

    const spokenText = (node: Node): string => {
      const copy = node.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      copy
        .querySelectorAll('[role="img"][aria-label]')
        .forEach((n) => n.replaceWith(`${n.getAttribute("aria-label")}: `));
      return (copy.textContent || "").replace(/\s+/g, " ").trim();
    };

    const announceError = (
      el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    ) => {
      const errorId = el.dataset.error;
      if (!errorId || !announcerRef.current) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;
      const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : "";
      clearTimeout(announceTimer);
      announcerRef.current.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = label + spokenText(errorEl);
        }
      }, 500);
    };

    const syncField = (target: EventTarget | null, announce = false) => {
      if (
        !(target instanceof HTMLElement) ||
        !target.matches("input, select, textarea")
      ) {
        return;
      }
      const field = target as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement;

      let isInvalid = false;
      if (supportsUserInvalid) {
        isInvalid = field.matches(":user-invalid");
      } else {
        const state = dirtyState.get(field);
        if (state?.hasInteracted && state?.hasBlurred) {
          isInvalid = !field.validity.valid;
          field.classList.toggle("user-invalid-fallback", isInvalid);
          field.classList.toggle("user-valid-fallback", !isInvalid);
        }
      }

      if (isInvalid) {
        if (announce && !announced.has(field)) {
          announceError(field);
          announced.add(field);
        }
        field.setAttribute("aria-invalid", "true");
        linkError(field, true);
        flagged.add(field);
      } else if (
        flagged.has(field) ||
        field.getAttribute("aria-invalid") !== "true"
      ) {
        field.setAttribute("aria-invalid", "false");
        linkError(field, false);
        flagged.delete(field);
        announced.delete(field);
        if (announcedField === field && announcerRef.current) {
          clearTimeout(announceTimer);
          announcerRef.current.textContent = "";
        }
      }
    };

    form
      .querySelectorAll("input, select, textarea")
      .forEach((el) => syncField(el, false));

    const onBlur = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches("input, select, textarea")) {
        const state = dirtyState.get(t) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasBlurred = true;
        dirtyState.set(t, state);
        syncField(t, true);
      }
    };

    const onInput = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches("input, select, textarea")) {
        const state = dirtyState.get(t) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(t, state);
        if (t.hasAttribute("aria-invalid")) {
          syncField(t, false);
        }
      }
    };

    const onChange = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches("input, select, textarea")) {
        const state = dirtyState.get(t) || {
          hasInteracted: true,
          hasBlurred: true,
        };
        state.hasInteracted = true;
        dirtyState.set(t, state);
        syncField(t, true);
      }
    };

    const onInvalid = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches("input, select, textarea")) {
        dirtyState.set(t, { hasInteracted: true, hasBlurred: true });
        announced.add(t);
        syncField(t, false);
      }
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
    };
  }, [isSubmitted]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(":invalid");
      firstInvalid?.focus();
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  const whatsappFollowupUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Graceful Plans, my name is ${fullName}. I just submitted an online application for a ${preferredRoomType} room at ${preferredProperty} (${fundingType} - ${institution}).`
  )}`;

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 sm:p-10">
      {/* Polite live region for accessible error announcements */}
      <div
        ref={announcerRef}
        aria-live="polite"
        className="visually-hidden"
      />

      <div className="mb-8 border-b border-neutral-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1.5">
          Admissions
        </p>
        <h2
          id={formHeadingId}
          className="section-headline font-bold text-neutral-950"
        >
          {heading}
        </h2>
        <p className="mt-2 text-neutral-600 text-sm">{subheading}</p>
      </div>

      {isSubmitted ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-neutral-950 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-950">
                Application Recorded
              </h3>
              <p className="text-xs text-neutral-500">
                Reference logged for {fullName}
              </p>
            </div>
          </div>

          <p className="text-neutral-700 text-sm leading-relaxed">
            Thank you, <strong>{fullName}</strong>. Your inquiry for a{" "}
            <strong>{preferredRoomType} Room</strong> at{" "}
            <strong>{preferredProperty}</strong> ({fundingType}) has been received.
          </p>

          <div className="bg-white rounded-md border border-neutral-200 p-4 text-xs text-neutral-700 space-y-1.5">
            <p>
              <strong>Applicant:</strong> {fullName} ({institution})
            </p>
            <p>
              <strong>Contact:</strong> {phone} • {email}
            </p>
            <p>
              <strong>Preference:</strong> {preferredRoomType} Room — {preferredProperty}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappFollowupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-6 py-3 rounded-md transition-colors min-h-11"
            >
              Confirm via WhatsApp
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-medium text-sm px-5 py-3 rounded-md transition-colors min-h-11 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              New Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          aria-labelledby={formHeadingId}
          action="/#apply"
          method="POST"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 1. Full Name */}
            <div className="flex flex-col">
              <label
                htmlFor="gp-full-name"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
              >
                Full Name <span aria-hidden="true">*</span>
              </label>
              <span id="gp-name-hint" className="text-xs text-neutral-500 mb-1.5">
                First and last name as on your student card
              </span>
              <input
                type="text"
                id="gp-full-name"
                name="fullName"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                enterKeyHint="next"
                aria-describedby="gp-name-hint"
                data-error="gp-name-error"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Thabo Mokoena"
                className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 placeholder:text-neutral-400 transition-colors"
              />
              <div id="gp-name-error" className="gp-error-msg">
                <span role="img" aria-label="Error">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                </span>
                <span>Please enter your full name (at least 2 characters).</span>
              </div>
            </div>

            {/* 2. Phone Number / WhatsApp */}
            <div className="flex flex-col">
              <label
                htmlFor="gp-phone"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
              >
                Phone / WhatsApp <span aria-hidden="true">*</span>
              </label>
              <span id="gp-phone-hint" className="text-xs text-neutral-500 mb-1.5">
                Format: 071 234 5678 or +27 71 234 5678
              </span>
              <input
                type="tel"
                id="gp-phone"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                pattern="[\d\+\-\s\(\)]{9,16}"
                enterKeyHint="next"
                aria-describedby="gp-phone-hint"
                data-error="gp-phone-error"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="071 234 5678"
                className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 placeholder:text-neutral-400 transition-colors"
              />
              <div id="gp-phone-error" className="gp-error-msg">
                <span role="img" aria-label="Error">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                </span>
                <span>
                  Enter a valid phone or WhatsApp number (e.g. 071 234 5678).
                </span>
              </div>
            </div>

            {/* 3. Email Address */}
            <div className="flex flex-col">
              <label
                htmlFor="gp-email"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
              >
                Email Address <span aria-hidden="true">*</span>
              </label>
              <span id="gp-email-hint" className="text-xs text-neutral-500 mb-1.5">
                Format: student@example.com
              </span>
              <input
                type="email"
                id="gp-email"
                name="email"
                required
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                aria-describedby="gp-email-hint"
                data-error="gp-email-error"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="thabo@stud.cut.ac.za"
                className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 placeholder:text-neutral-400 transition-colors"
              />
              <div id="gp-email-error" className="gp-error-msg">
                <span role="img" aria-label="Error">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                </span>
                <span>Enter an email address in the format you@example.com.</span>
              </div>
            </div>

            {/* 4. Student Institution */}
            <div className="flex flex-col">
              <label
                htmlFor="gp-institution"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
              >
                Student Institution <span aria-hidden="true">*</span>
              </label>
              <span id="gp-institution-hint" className="text-xs text-neutral-500 mb-1.5">
                NSFAS accreditation applies to CUT students
              </span>
              <select
                id="gp-institution"
                name="institution"
                required
                aria-describedby="gp-institution-hint"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 transition-colors"
              >
                <option value="CUT (Central University of Technology)">
                  CUT (Central University of Technology)
                </option>
                <option value="UFS (University of the Free State)">
                  UFS (University of the Free State)
                </option>
                <option value="Motheo TVET / Other Institution">
                  Motheo TVET / Other Institution
                </option>
              </select>
            </div>

            {/* 5. Funding Type */}
            <div className="flex flex-col">
              <label
                htmlFor="gp-funding"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
              >
                Funding Type <span aria-hidden="true">*</span>
              </label>
              <span id="gp-funding-hint" className="text-xs text-neutral-500 mb-1.5">
                10 CUT NSFAS rooms allocated per house
              </span>
              <select
                id="gp-funding"
                name="fundingType"
                required
                aria-describedby="gp-funding-hint"
                value={fundingType}
                onChange={(e) => setFundingType(e.target.value)}
                className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 transition-colors"
              >
                <option value="NSFAS (CUT Accredited)">NSFAS (CUT Accredited)</option>
                <option value="Cash / Private Sponsor">Cash / Private Sponsor</option>
                <option value="External Bursary">External Bursary</option>
              </select>
            </div>

            {/* 6. Preferred Property */}
            <div className="flex flex-col">
              <label
                htmlFor="gp-property"
                className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
              >
                Preferred Property <span aria-hidden="true">*</span>
              </label>
              <span id="gp-property-hint" className="text-xs text-neutral-500 mb-1.5">
                Select one of our three Universitas addresses
              </span>
              <select
                id="gp-property"
                name="preferredProperty"
                required
                aria-describedby="gp-property-hint"
                value={preferredProperty}
                onChange={(e) => setPreferredProperty(e.target.value)}
                className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 transition-colors"
              >
                {PROPERTIES.map((prop) => (
                  <option key={prop.id} value={prop.address}>
                    {prop.address}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 7. Preferred Room Type */}
          <div className="flex flex-col">
            <label
              htmlFor="gp-room-type"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
            >
              Preferred Room Type <span aria-hidden="true">*</span>
            </label>
            <span id="gp-room-type-hint" className="text-xs text-neutral-500 mb-1.5">
              Bachelor (R5,000/mo) • Single (R4,600/mo) • Sharing (R3,500/mo at 43 Boersma St)
            </span>
            <select
              id="gp-room-type"
              name="preferredRoomType"
              required
              aria-describedby="gp-room-type-hint"
              value={preferredRoomType}
              onChange={(e) => setPreferredRoomType(e.target.value as RoomType)}
              className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 transition-colors"
            >
              <option value="Single">Single Room — R4,600 / month</option>
              <option value="Bachelor">Bachelor Room — R5,000 / month</option>
              <option value="Sharing">
                Sharing Room — R3,500 / month (43 Boersma Street)
              </option>
            </select>
          </div>

          {/* 8. Message */}
          <div className="flex flex-col">
            <label
              htmlFor="gp-message"
              className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-1"
            >
              Message / Specific Room Number (Optional)
            </label>
            <span id="gp-message-hint" className="text-xs text-neutral-500 mb-1.5">
              Specify a room number (e.g. Bachelor 1 or Single Room 4) or move-in date
            </span>
            <textarea
              id="gp-message"
              name="message"
              rows={3}
              maxLength={500}
              aria-describedby="gp-message-hint"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="State your preferred room number or move-in date..."
              className="gp-input w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-950 placeholder:text-neutral-400 transition-colors"
            />
          </div>

          <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-neutral-500">
              No application fee. Responses are sent via WhatsApp or email.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-800 disabled:opacity-60 text-white font-medium text-sm px-7 py-3.5 rounded-md transition-colors min-h-12 cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
