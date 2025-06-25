import React from 'react';
import dayjs from '../utils/dateUtils';

const EventCard = ({ event, onClick }) => (
    <div
        className="text-xs p-1 mb-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
        style={{ backgroundColor: `${event.color}20`, borderLeft: `3px solid ${event.color}` }}
        onClick={onClick}
        title={`${event.title} (${dayjs.format(new Date(event.startTime), 'HH:mm')} - ${dayjs.format(new Date(event.endTime), 'HH:mm')})`}
    >
        <div className="font-medium truncate" style={{ color: event.color }}>
            {event.title}
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-xs">
            {dayjs.format(new Date(event.startTime), 'HH:mm')}
        </div>
    </div>
);

export default EventCard;