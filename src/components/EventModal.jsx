import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EventModal = ({ event, isOpen, onClose, onSave }) => {
    const [editedEvent, setEditedEvent] = useState(event || { title: '', startTime: '', endTime: '', color: '#3B82F6' });

    useEffect(() => {
        if (event) {
            setEditedEvent({
                ...event,
                startTime: event.startTime ? new Date(event.startTime).toISOString().slice(0, 16) : '',
                endTime: event.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : ''
            });
        } else {
            setEditedEvent({ title: '', startTime: '', endTime: '', color: '#3B82F6' });
        }
    }, [event, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const eventToSave = {
            ...editedEvent,
            startTime: editedEvent.startTime ? new Date(editedEvent.startTime).toISOString() : '',
            endTime: editedEvent.endTime ? new Date(editedEvent.endTime).toISOString() : ''
        };
        onSave(eventToSave);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-[90vw]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {event ? 'Edit Event' : 'New Event'}
                    </h2>
                    {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"> */}
                       <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            value={editedEvent.title}
                            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="Event title"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Time</label>
                            <input
                                type="datetime-local"
                                value={editedEvent.startTime}
                                onChange={(e) => setEditedEvent({ ...editedEvent, startTime: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Time</label>
                            <input
                                type="datetime-local"
                                value={editedEvent.endTime}
                                onChange={(e) => setEditedEvent({ ...editedEvent, endTime: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                        <div className="flex space-x-2">
                            {['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#84CC16'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setEditedEvent({ ...editedEvent, color })}
                                    className={`w-8 h-8 rounded-full border-2 ${editedEvent.color === color ? 'border-gray-600' : 'border-gray-300'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventModal;