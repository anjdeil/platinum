import he from 'he';

export const getCleanText = (html: string) => {
  if (!html) return '';
  const decoded = he.decode(html);
  const noComments = decoded.replace(/<!--[\s\S]*?-->/g, '');
  const noTags = noComments.replace(/<\/?[^>]+(>|$)/g, '');
  const trimmed = noTags.trim().replace(/\s+/g, ' ');
  return trimmed;
};
