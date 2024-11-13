export default function calculateReadTime(text) {
  // Average reading speed (words per minute)
  const wordsPerMinute = 200;

  // Remove extra spaces and split the text into words
  const words = text.trim().split(/\s+/).length;

  // Calculate reading time in minutes
  const readingTime = Math.ceil(words / wordsPerMinute);

  return readingTime;
}
