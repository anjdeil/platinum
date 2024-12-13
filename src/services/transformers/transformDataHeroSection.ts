interface ParsedData {
  subtitle: string;
  listItems: string[];
}

export const parseData = (data: string): ParsedData => {
  // Extract the subtitle
  const subtitleMatch = data.match(/<h3>(.*?)<\/h3>/);
  const subtitle = subtitleMatch ? subtitleMatch[1] : "";

  // Extract the list items
  const listItemsMatch = data.match(/<ul>(.*?)<\/ul>/);
  const listItems = listItemsMatch
    ? listItemsMatch[1].match(/<li>(.*?)<\/li>/g)
    : [];
  const parsedListItems = listItems
    ? listItems.map((item) => item.replace(/<\/?li>/g, ""))
    : [];

  return {
    subtitle,
    listItems: parsedListItems,
  };
};
