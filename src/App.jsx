import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Calendar, Plus } from 'lucide-react';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import UpcomingEvents from './components/UpcomingEvents';
import ThemeToggle from './components/ThemeToggle';
import SAMPLE_EVENTS from './data/events.json';
import dayjs from './utils/dateUtils';

export default function CalendarApp() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState(SAMPLE_EVENTS);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });
    const [viewMode, setViewMode] = useState('month');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Theme management
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const filteredEvents = useMemo(() => {
        if (!searchTerm) return events;
        return events.filter(event =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [events, searchTerm]);

    const navigateMonth = (direction) => {
        setCurrentDate(dayjs.add(currentDate, direction, 'month'));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setViewMode('day');
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleEventSave = (updatedEvent) => {
        if (updatedEvent.id) {
            setEvents(events.map(e => (e.id === updatedEvent.id ? updatedEvent : e)));
        } else {
            const newEvent = { ...updatedEvent, id: Date.now() };
            setEvents([...events, newEvent]);
        }
    };

    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDate(today);
        setViewMode('month');
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg shadow-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                            <Calendar className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                Survey SparrowCalendar
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {dayjs.format(new Date(), 'dddd, MMMM D, YYYY')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="text-gray-400" size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={goToToday} 
                                className="px-4 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                            >
                                Today
                            </button>
                            <ThemeToggle 
                                isDarkMode={isDarkMode}
                                setIsDarkMode={setIsDarkMode}
                            />
                        </div>
                    </div>
                </header>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => navigateMonth(-1)} 
                            className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 min-w-[200px] text-center">
                            {dayjs.format(currentDate, 'MMMM YYYY')}
                        </h2>
                        <button 
                            onClick={() => navigateMonth(1)} 
                            className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                            {['month', 'week', 'day'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                                        viewMode === mode
                                            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                                    }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => { setSelectedEvent(null); setIsModalOpen(true); }} 
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Add Event</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                            <CalendarGrid
                                currentDate={currentDate}
                                events={filteredEvents}
                                selectedDate={selectedDate}
                                onDateClick={handleDateClick}
                                onEventClick={handleEventClick}
                                viewMode={viewMode}
                                setViewMode={setViewMode}
                            />
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <UpcomingEvents events={filteredEvents} onEventClick={handleEventClick} />
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                                <Calendar size={18} />
                                Calendar Stats
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Events</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{filteredEvents.length}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <Calendar className="text-blue-600 dark:text-blue-400" size={16} />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {filteredEvents.filter(event => dayjs.isSame(new Date(event.startTime), currentDate, 'month')).length}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                        <Calendar className="text-green-600 dark:text-green-400" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>

                <EventModal
                    event={selectedEvent}
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setSelectedEvent(null); }}
                    onSave={handleEventSave}
                />
            </div>
        </div>
    );
}