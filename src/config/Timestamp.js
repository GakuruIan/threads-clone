export const ShowTime = (timestamp)=>{
   
    const now = new Date();
    const date = new Date(timestamp);
  
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 5) {
      const options = { day: 'numeric', month: 'short' };
      return date.toLocaleDateString('en-US', options);
    } else if (hours >= 24) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (minutes >= 60) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (seconds >= 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
}
  