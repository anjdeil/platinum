export const getPostUrl = (slug: string, currentPath: string) => {
  if (currentPath.includes('blog') && currentPath !== '/blog') {
    return slug;
  }

  if (currentPath === '/') {
    return `blog/${slug}`;
  }

  if (currentPath === '/blog') {
    return `blog/${slug}`;
  }

  return `blog/${slug}`;
};
