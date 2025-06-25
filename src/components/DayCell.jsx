import React from 'react';
import dayjs from '../utils/dateUtils';

const DayCell = ({ date, events, isCurrentMonth, isToday, isSelected, onClick, onEventClick, isWeekView = false }) => {
    const handleClick = () => {
        onClick(date);
    };

    const handleEventClick = (e, event) => {
        e.stopPropagation();
        onEventClick(event);
    };

    return (
        <div
            onClick={handleClick}
            className={`min-h-[80px] p-1 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer
                ${isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'}
                ${isToday ? 'ring-2 ring-blue-500' : ''}
                ${isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/70'}`}
        >
            <div className="text-right p-1">
                <span className={`inline-flex items-center justify-center rounded-full w-6 h-6 text-sm
                    ${isToday ? 'bg-blue-600 text-white' : ''}
                    ${isSelected && !isToday ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>
                    {date.getDate()}
                </span>
            </div>
            <div className="mt-1 space-y-1 max-h-[60px] overflow-y-auto">
                {events.slice(0, isWeekView ? 2 : 3).map(event => (
                    <div
                        key={event.id}
                        onClick={(e) => handleEventClick(e, event)}
                        className="text-xs p-1 rounded truncate"
                        style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
                    >
                        <p className="truncate font-medium text-gray-800 dark:text-gray-100">{event.title}</p>
                        {isWeekView && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {dayjs.format(new Date(event.startTime), 'h:mm A')}
                            </p>
                        )}
                    </div>
                ))}
                {events.length > (isWeekView ? 2 : 3) && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">
                        +{events.length - (isWeekView ? 2 : 3)} more
                    </div>
                )}
            </div>
        </div>
    );
};

export default DayCell;