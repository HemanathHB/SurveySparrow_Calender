import React from 'react';
import DayCell from './DayCell';
import dayjs from '../utils/dateUtils';

const CalendarGrid = ({ currentDate, events, selectedDate, onDateClick, onEventClick, viewMode, setViewMode }) => {
    const today = new Date();

    const getEventsForDay = (date) => {
        return events.filter(event => dayjs.isSame(new Date(event.startTime), date, 'day'));
    };

    const renderWeekDaysHeader = () => (
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-50 dark:bg-gray-800 p-2 text-center font-medium text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                {day}
            </div>
        ))
    );

    const renderMonthView = () => {
        const startDate = dayjs.startOf(currentDate, 'month');
        const endDate = dayjs.endOf(currentDate, 'month');
        const startCalendar = dayjs.startOf(startDate, 'week');
        const days = [];
        let day = startCalendar;

        while (day <= dayjs.add(endDate, 6, 'day')) {
            days.push(new Date(day));
            day = dayjs.add(day, 1, 'day');
        }

        return (
            <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {renderWeekDaysHeader()}
                {days.map(date => (
                    <DayCell
                        key={date.toISOString()}
                        date={date}
                        events={getEventsForDay(date)}
                        isCurrentMonth={dayjs.isSame(date, currentDate, 'month')}
                        isToday={dayjs.isSame(date, today, 'day')}
                        isSelected={selectedDate && dayjs.isSame(date, selectedDate, 'day')}
                        onClick={onDateClick}
                        onEventClick={onEventClick}
                    />
                ))}
            </div>
        );
    };

    const renderWeekView = () => {
        const weekStart = selectedDate ? dayjs.startOf(selectedDate, 'week') : dayjs.startOf(today, 'week');
        const weekDays = Array.from({ length: 7 }, (_, i) => dayjs.add(weekStart, i, 'day'));

        return (
            <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {renderWeekDaysHeader()}
                {weekDays.map(date => (
                    <DayCell
                        key={date.toISOString()}
                        date={date}
                        events={getEventsForDay(date)}
                        isCurrentMonth={true}
                        isToday={dayjs.isSame(date, today, 'day')}
                        isSelected={selectedDate && dayjs.isSame(date, selectedDate, 'day')}
                        onClick={onDateClick}
                        onEventClick={onEventClick}
                        isWeekView={true}
                    />
                ))}
            </div>
        );
    };

    const renderDayView = () => {
        const dayToShow = selectedDate || today;
        const dayEvents = getEventsForDay(dayToShow).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        return (
            <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
                    {dayjs.format(dayToShow, 'dddd, MMMM D, YYYY')}
                </h2>
                <div className="space-y-4">
                    {dayEvents.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p>No events scheduled for this day</p>
                        </div>
                    ) : (
                        dayEvents.map(event => (
                            <div
                                key={event.id}
                                className="border-l-4 pl-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-r transition-all duration-200 ease-in-out"
                                style={{ borderColor: event.color }}
                                onClick={() => onEventClick(event)}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{event.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            {dayjs.format(new Date(event.startTime), 'h:mm A')} - {dayjs.format(new Date(event.endTime), 'h:mm A')}
                                        </p>
                                    </div>
                                    {event.location && (
                                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                            {event.location}
                                        </span>
                                    )}
                                </div>
                                {event.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                                        {event.description}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full overflow-auto">
            {viewMode === 'month' && renderMonthView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'day' && renderDayView()}
        </div>
    );
};

export default CalendarGrid;