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
    return `${diffInDays}  ${diffInDays>1?'days':'day'}`;
  };
  
  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isVideo = (url: string) => /\.(mp4|mov|webm|mkv)$/i.test(url);
  
export const getMediaType = (resourceType: string | null, url: string) => {
      if (resourceType === "image") return "image";
      if (resourceType === "video") return "video";
      if (isImage(url)) return "image";
      if (isVideo(url)) return "video";
      return null; // Unknown type or no media
  };
  