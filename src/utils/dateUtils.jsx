const dayjs = {
  format: (date, format) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (format === 'MMMM YYYY') {
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    if (format === 'YYYY-MM-DD') {
      return date.toISOString().split('T')[0];
    }
    if (format === 'MMM DD') {
      return `${months[date.getMonth()]} ${date.getDate()}`;
    }
    if (format === 'HH:mm') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return date.toString();
  },

  startOf: (date, unit) => {
    const newDate = new Date(date);
    if (unit === 'month') {
      newDate.setDate(1);
      newDate.setHours(0, 0, 0, 0);
    }
    if (unit === 'week') {
      const day = newDate.getDay();
      newDate.setDate(newDate.getDate() - day);
      newDate.setHours(0, 0, 0, 0);
    }
    return newDate;
  },

  endOf: (date, unit) => {
    const newDate = new Date(date);
    if (unit === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
      newDate.setDate(0);
      newDate.setHours(23, 59, 59, 999);
    }
    return newDate;
  },

  add: (date, amount, unit) => {
    const newDate = new Date(date);
    if (unit === 'month') {
      newDate.setMonth(newDate.getMonth() + amount);
    }
    if (unit === 'day') {
      newDate.setDate(newDate.getDate() + amount);
    }
    return newDate;
  },

  isSame: (date1, date2, unit) => {
    if (unit === 'day') {
      return date1.toDateString() === date2.toDateString();
    }
    if (unit === 'month') {
      return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }
    return false;
  },

  isAfter: (date1, date2) => {
    return date1 > date2;
  },

  isBefore: (date1, date2) => {
    return date1 < date2;
  }
};

export default dayjs;