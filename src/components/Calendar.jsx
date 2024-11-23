import React, { useState } from "react";

const Calendar = () => {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDates, setSelectedDates] = useState([]);

    const birinchiKun = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const oxirgiKun = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const oyKunlari = [];
    for (let i = 1; i <= oxirgiKun.getDate(); i++) {
        oyKunlari.push(i);
    }

    const leadingEmptyDays = new Array(birinchiKun.getDay()).fill(null);

    const handleMonthChange = (direction) => {
        setCurrentDate((prevDate) => {
            const newMonth = prevDate.getMonth() + direction;
            return new Date(prevDate.getFullYear(), newMonth, 1);
        });
    };

    const toggleDateSelection = (day) => {
        const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isSelected = selectedDates.some(
            (date) => date.getTime() === fullDate.getTime()
        );

        if (isSelected) {
            setSelectedDates(selectedDates.filter((date) => date.getTime() !== fullDate.getTime()));
        } else {
            setSelectedDates([...selectedDates, fullDate]);
        }
    };

    return (
        <div className="w-full max-w-4xl mt-40 mx-auto p-6 border border-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4 text-white">
                <button
                    onClick={() => handleMonthChange(-1)}
                    className="px-3 py-1 text-2xl bg-gray-700 rounded hover:bg-gray-600"
                >
                    &#8249;
                </button>
                <h2 className="text-xl font-bold capitalize">
                    {currentDate.toLocaleString("eng", { month: "long" })} {currentDate.getFullYear()}
                </h2>
                <button
                    onClick={() => handleMonthChange(1)}
                    className="px-3 py-1 text-2xl bg-gray-700 rounded hover:bg-gray-600"
                >
                    &#8250;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-4 text-center text-xl font-medium text-gray-400">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-4 mt-2">
                {leadingEmptyDays.map((_, index) => (
                    <div key={index} className=""></div>
                ))}
                {oyKunlari.map((day) => {
                    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isToday =
                        today.getDate() === day &&
                        today.getMonth() === currentDate.getMonth() &&
                        today.getFullYear() === currentDate.getFullYear();
                    const isSelected = selectedDates.some(
                        (date) => date.getTime() === fullDate.getTime()
                    );

                    return (
                        <div
                            key={day}
                            onClick={() => toggleDateSelection(day)}
                            className={`h-16 flex items-center text-2xl justify-center rounded-lg cursor-pointer border ${isToday
                                    ? "bg-blue-500 text-white border-blue-700"
                                    : isSelected
                                        ? "bg-green-500 text-white border-green-700"
                                        : "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-600"
                                }`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {selectedDates.length > 0 && (
                <div className="mt-16 text-white">
                    <h3 className="text-xl font-bold">Tanlangan kunlar:</h3>
                    <ul>
                        {selectedDates.map((date, index) => (
                            <li key={index} className="text-xl">
                                {date.toLocaleDateString("eng", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Calendar;
