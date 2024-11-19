export const getRelativeTime = (createdAt: string) => {
    const postTime = new Date(createdAt).getTime(); // Convert to timestamp
    const now = Date.now(); // Current time in milliseconds
    const diffInSeconds = Math.floor((now - postTime) / 1000); // Difference in seconds
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days`;
  };
  