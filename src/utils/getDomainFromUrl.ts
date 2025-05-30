function getDomainFromUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname; // returns the domain part of the URL
  } catch (e) {
    console.error('Invalid URL:', e);
    return null;
  }
}

export default getDomainFromUrl;
