"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const monthNames = [
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai"
];

const weekDays = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
const yearOptions = Array.from({ length: 101 }, (_, index) => 1950 + index);

type DatePickerFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name?: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  size?: "sm" | "md";
  labelClassName?: string;
  inputClassName?: string;
};

function parseDate(value: string): Date | null {
  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]) - 1;
  const year = Number(match[3]);
  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

function getMonthDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1))
  ];
}

export default function DatePickerField({
  id,
  value,
  onChange,
  label,
  name,
  required,
  hint,
  placeholder = "dd/mm/yyyy",
  size = "md",
  labelClassName,
  inputClassName
}: DatePickerFieldProps) {
  const generatedInputId = useId();
  const inputId = id ?? name ?? generatedInputId;
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseDate(value);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"year" | "month" | null>(null);
  const [viewDate, setViewDate] = useState(selectedDate ?? new Date(2004, 0, 1));
  const selectedYearRef = useRef<HTMLButtonElement>(null);
  const days = useMemo(() => getMonthDays(viewDate), [viewDate]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (openMenu === "year") {
      selectedYearRef.current?.scrollIntoView({ block: "center" });
    }
  }, [openMenu]);

  function moveMonth(offset: number) {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  const inputHeight = size === "sm" ? "h-8" : "h-12";
  const textSize = size === "sm" ? "text-[0.86rem]" : "text-[0.95rem]";
  const radius = size === "sm" ? "rounded-[0.55rem]" : "rounded-[0.9rem]";
  const defaultLabelClass =
    size === "sm"
      ? "mb-1 block text-[0.72rem] font-medium text-[#313743]"
      : "mb-2 block text-[0.95rem] font-medium text-[#343741]";

  return (
    <div ref={rootRef} className="relative">
      {label ? (
        <label htmlFor={inputId} className={labelClassName ?? defaultLabelClass}>
          {label}
          {required ? <span className="text-[#ff6a42]"> *</span> : null}
        </label>
      ) : null}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          required={required}
          aria-required={required || undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={
            inputClassName ??
            `${inputHeight} w-full ${radius} border border-[#edf1f5] bg-[#eef3f8] px-4 pr-11 ${textSize} text-[#1f2430] outline-none transition placeholder:text-[#a4adb9] focus:border-[#f47c20] focus:bg-white`
          }
        />
        <button
          type="button"
          aria-label="Chọn ngày"
          onClick={() => {
            if (selectedDate) {
              setViewDate(selectedDate);
            }
            setIsOpen((current) => !current);
            setOpenMenu(null);
          }}
          className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-[#4b5563] transition hover:bg-white hover:text-[#ff6b22]"
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      {hint ? (
        <p className={`${size === "sm" ? "mt-1.5 text-[0.66rem]" : "mt-2 text-[0.82rem]"} text-[#8b929a]`}>
          {hint}
        </p>
      ) : null}

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+0.45rem)] z-[70] w-[17.2rem] rounded-[0.75rem] border border-[#edf1f5] bg-white p-3 shadow-[0_16px_45px_rgba(31,41,55,0.18)]">
          <div className="relative mb-3 flex items-center justify-between text-[0.8rem] font-bold text-[#242936]">
            <button
              type="button"
              onClick={() => setOpenMenu((current) => (current === "year" ? null : "year"))}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-[#f4f7fb]"
            >
              {viewDate.getFullYear()}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setOpenMenu((current) => (current === "month" ? null : "month"))}
              className="inline-flex min-w-[7.5rem] items-center justify-center gap-1 rounded-md px-1.5 py-1 whitespace-nowrap hover:bg-[#f4f7fb]"
            >
              {monthNames[viewDate.getMonth()]}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Tháng trước"
                onClick={() => {
                  setOpenMenu(null);
                  moveMonth(-1);
                }}
                className="grid h-6 w-6 place-items-center rounded-md text-[#9aa3af] hover:bg-[#f4f7fb] hover:text-[#242936]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Tháng sau"
                onClick={() => {
                  setOpenMenu(null);
                  moveMonth(1);
                }}
                className="grid h-6 w-6 place-items-center rounded-md text-[#9aa3af] hover:bg-[#f4f7fb] hover:text-[#242936]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {openMenu === "year" ? (
              <div className="absolute left-0 top-[1.85rem] z-10 max-h-[11.5rem] w-[3.85rem] overflow-y-auto rounded-md border border-[#d9e0ea] bg-white py-1 text-[0.74rem] font-medium text-[#3d4654] shadow-[0_12px_32px_rgba(31,41,55,0.16)]">
                {yearOptions.map((year) => {
                  const isActive = viewDate.getFullYear() === year;
                  return (
                    <button
                      key={year}
                      ref={isActive ? selectedYearRef : undefined}
                      type="button"
                      onClick={() => {
                        setViewDate((current) => new Date(year, current.getMonth(), 1));
                        setOpenMenu(null);
                      }}
                      className={`block w-full px-1.5 py-0.5 text-left hover:bg-[#fff1e9] hover:text-[#ff6b22] ${
                        isActive ? "bg-[#fff1e9] font-bold text-[#ff6b22]" : ""
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {openMenu === "month" ? (
              <div className="absolute left-[4.45rem] top-[1.85rem] z-10 max-h-[10.5rem] w-[6.8rem] overflow-y-auto rounded-md border border-[#d9e0ea] bg-white py-1 text-[0.72rem] font-medium text-[#3d4654] shadow-[0_12px_32px_rgba(31,41,55,0.16)]">
                {monthNames.map((month, index) => {
                  const isActive = viewDate.getMonth() === index;
                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() => {
                        setViewDate((current) => new Date(current.getFullYear(), index, 1));
                        setOpenMenu(null);
                      }}
                      className={`block w-full px-2 py-1 text-left hover:bg-[#fff1e9] hover:text-[#ff6b22] ${
                        isActive ? "bg-[#fff1e9] font-bold text-[#ff6b22]" : ""
                      }`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center text-[0.58rem] font-medium text-[#4b5563]">
            {weekDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-[0.78rem] text-[#5c6675]">
            {days.map((date, index) => {
              if (!date) {
                return <span key={`empty-${index}`} className="h-7" />;
              }

              const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth() &&
                selectedDate.getDate() === date.getDate();

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => {
                    onChange(formatDate(date));
                    setIsOpen(false);
                  }}
                  className={`mx-auto grid h-7 w-7 place-items-center rounded-md transition ${
                    isSelected
                      ? "bg-[#ff6b22] font-bold text-white"
                      : "hover:bg-[#fff1e9] hover:text-[#ff6b22]"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
