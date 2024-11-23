import React, { useState } from "react";

type CalendarProps = {};

type SelectedDate = Date;

type Event = {
    date: Date;
    title: string;
};

const Calendar: React.FC<CalendarProps> = () => {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState<Date>(today);
    const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalDate, setModalDate] = useState<Date | null>(null);
    const [eventTitle, setEventTitle] = useState<string>("");

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth: number[] = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        daysInMonth.push(i);
    }

    const leadingEmptyDays: null[] = new Array(firstDayOfMonth.getDay()).fill(null);

    const handleMonthChange = (direction: number) => {
        setCurrentDate((prevDate) => {
            const newMonth = prevDate.getMonth() + direction;
            return new Date(prevDate.getFullYear(), newMonth, 1);
        });
    };

    const toggleDateSelection = (day: number) => {
        const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setModalDate(fullDate);
        setIsModalOpen(true);
    };

    const handleAddEvent = () => {
        if (modalDate && eventTitle.trim()) {
            setEvents([...events, { date: modalDate, title: eventTitle.trim() }]);
            setEventTitle("");
            setIsModalOpen(false);
        }
    };

    return (
        <div className="w-full max-w-4xl my-40 border border-white mx-auto p-6 bg-black rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4 text-white">
                <button
                    onClick={() => handleMonthChange(-1)}
                    className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                    &#8249;
                </button>
                <h2 className="text-3xl font-bold capitalize">
                    {currentDate.toLocaleString("eng", { month: "long" })} {currentDate.getFullYear()}
                </h2>
                <button
                    onClick={() => handleMonthChange(1)}
                    className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                    &#8250;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-4 text-center text-2xl font-medium text-gray-400">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className=" hover:text-white transition-all cursor-pointer">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-4 mt-6">
                {leadingEmptyDays.map((_, index) => (
                    <div key={index} className="div"></div>
                ))}
                {daysInMonth.map((day) => {
                    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const isToday =
                        today.getDate() === day &&
                        today.getMonth() === currentDate.getMonth() &&
                        today.getFullYear() === currentDate.getFullYear();
                    const hasEvent = events.some((event) => event.date.getTime() === fullDate.getTime());

                    return (
                        <div
                            key={day}
                            onClick={() => toggleDateSelection(day)}
                            className={`h-14 flex items-center justify-center rounded-lg cursor-pointer border ${isToday
                                    ? "bg-blue-500 text-white border-blue-700"
                                    : hasEvent
                                        ? "bg-yellow-500 text-white border-yellow-700"
                                        : "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-600"
                                }`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-transparent border border-white text-white p-6 rounded shadow-lg max-w-xl shadow-white w-full">
                        <h3 className="text-lg font-bold mb-4">Add New Event</h3>
                        <label className="block mb-2">
                            Title
                            <input
                                type="text"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                                className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-md focus:ring focus:ring-opacity-50"
                            />
                        </label>
                        <div className="mb-4 text-xl">
                            <strong>Date:</strong> {modalDate?.toLocaleDateString("uz-UZ")}
                        </div>
                        <button
                            onClick={handleAddEvent}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Event
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {events.length > 0 && (
                <div className="mt-4 text-2xl text-white">
                    <h3 className="font-bold">Events:</h3>
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>
                                <strong>{event.title}</strong> - {event.date.toLocaleDateString("uz-UZ")}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Calendar;
