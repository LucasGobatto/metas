function isBetweenToday(dateString) {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  return new Date(dateString) > startOfToday && new Date(dateString) < endOfToday;
}

function countDaysUntilDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const timeDiff = Math.abs(now - date);

  return Math.round(timeDiff / (1000 * 60 * 60 * 24));
}
