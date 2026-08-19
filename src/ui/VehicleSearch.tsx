"use client";

import { generateDropOffTimes, generatePickupTimes } from "@/lib/date-utils";
import { DateRange, DayPicker } from "@daypicker/react";
import "@daypicker/react/style.css";
import "@/app/styles-daypicker.css";
import { useLockBodyScroll } from "@/lib/custom-hooks";
import { useEffect, useState } from "react";

export default function VehicleSearch() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // tab content
  const [selected, setSelected] = useState<DateRange>(); // default is undefined
  const [pickupTimes, setPickupTimes] = useState<{ label: string; value: string; }[]>([]);

  useLockBodyScroll(isDetailsModalOpen);

  // an effect is kind of like a function that only runs on rerender when the dependencies change
  useEffect(() => {
    // ?. is called optional chaining and saves us from an error that occurs if selected is undefined or null because you cannot access properties of undefined or null, or you will get a program-breaking error
    if (!selected?.from) return;

    let cancelled = false;

    const fetchPickupTimes = async () => {
      try {
        const nextPickupTimes = await generatePickupTimes(selected.from!);

        if (!cancelled) {
          setPickupTimes(nextPickupTimes);
        }
      } catch (error) {
        console.error("Failed to load pickup times", error);
        if (!cancelled) {
          setPickupTimes([]);
        }
      }
    };

    fetchPickupTimes();

    return () => {
      cancelled = true;
    };
  }, [selected?.from]);

  const dropOffTimes = selected ? generateDropOffTimes(selected.to!) : [];

  return (
    // Main Form & Submit Button
    <form className="md:bg-white md:text-text rounded-b-xl md:p-8">
      <div className="flex flex-col gap-2 bg-white text-text p-3 md:p-0 rounded-b-xl">
        {/*
          1. Add Tailwind for font-size, font-weight based on the text on the Hertz site
          2. Make it so that this heading only shows on Medium screens and bigger
        */}
        <h2 className="text-[2.7cqi] font-bold hidden md:block">
          Book your Rydio car rental
        </h2>
        <button
          type="button"
          className="py-4 px-3 border-2 border-gray-300 rounded-lg text-brand-green-base font-medium text-start cursor-pointer"
          onClick={() => alert("Choose your pickup & drop-off location")}
        >
          Choose pickup & drop-off location
        </button>
        <button
          type="button" // We were missing this
          className="py-4 px-3 border-2 border-gray-300 rounded-lg text-brand-green-base font-medium text-start cursor-pointer"
          onClick={() => setIsDetailsModalOpen(true)}
        >
          Choose pickup & drop-off details
        </button>

        {/* Pickup & drop-off details modal */}
        <input
          type="hidden"
          name="pickupDate"
          value={selected?.from?.toISOString() ?? ""}
        />
        <input
          type="hidden"
          name="dropoffDate"
          value={selected?.to?.toISOString() ?? ""}
        />
        {isDetailsModalOpen && ( // conditional rendering of the details modal
          <dialog
            open
            className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/50"
            onClick={() => setIsDetailsModalOpen(false)}
          >
            <div
              className="bg-white p-3 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="close"
                className="bg-brand-green-base size-6 text-white rounded-full cursor-pointer"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                &times;
              </button>
              <DayPicker
                animate
                fixedWeeks
                numberOfMonths={2}
                mode="range"
                disabled={{
                  before: new Date(),
                  after: new Date(Date.now() + 31536000000),
                }}
                selected={selected}
                onSelect={setSelected}
                footer={
                  selected
                    ? `Selected: 
                          ${selected.from?.toLocaleDateString()}
                          to ${selected.to?.toLocaleDateString()}`
                    : "Pick a day."
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  name="pickupTime"
                  disabled={!selected}
                  className={!selected ? "cursor-not-allowed" : ""}
                >
                  <option>Select a Pickup Time</option>
                  {/* Loop that:
                            1. Checks date of the pickup time
                            2. If the date is today, it starts at the top of the next 30-minute interval
                            3. Lists out all times until 11:30 PM */}
                  {pickupTimes.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
                <select>
                  <option>Select a Drop-off Time</option>
                  {dropOffTimes.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </dialog>
        )}

        <button
          type="submit"
          className="bg-(image:--yellow-button-gradient) rounded-full py-3 px-6 font-semibold mt-2.5 mb-1 cursor-pointer"
        >
          View vehicles
        </button>
      </div>

      {/* Discount & Driver's Age */}
      <div className="flex justify-between mt-2">
        <button type="button">
          Discount: <b className="cursor-pointer">+ Add</b>
        </button>
        <button type="button">
          Driver's Age: <b className="cursor-pointer">25+</b>
        </button>
      </div>
    </form>
  );
}
