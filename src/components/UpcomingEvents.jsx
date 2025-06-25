import React from 'react';
import dayjs from '../utils/dateUtils';

const UpcomingEvents = ({ events, onEventClick }) => {
    const upcomingEvents = events
        .filter(event => new Date(event.startTime) >= new Date())
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        .slice(0, 5);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
                {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 py-2">No upcoming events</p>
                ) : (
                    upcomingEvents.map(event => (
                        <div
                            key={event.id}
                            onClick={() => onEventClick(event)}
                            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                        >
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                            {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                             */}
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">

                                {dayjs.format(new Date(event.startTime), 'MMM D, h:mm A')}
                            </p>
                            {event.location && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.location}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UpcomingEvents;