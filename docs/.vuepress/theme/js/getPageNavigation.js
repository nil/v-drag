/**
 * Converts the two-level array into
 * a new array of only one level.
 *
 * @param {array} items - The collection of the sidebar links.
 *
 * @returns {array} A one-level array.
 */

function listOfLinks(items) {
  const list = [];

  items.map((item) => {
    if (item.link) {
      list.push({ type: 'link', link: item.link, text: item.text });
    }

    if (item.type === 'group') {
      item.children.map((child) => {
        if (child.type === 'link') {
          list.push(child);
        }

        return null;
      });
    } else {
      list.push(item);
    }

    return null;
  });

  return list;
}

/**
 * Returns the index of the first
 * element that has `path` as a value.
 *
 * @param {string} path - The value to find.
 * @param {array} list - The array of items.
 *
 * @returns {int} The index of the value.
 */

function getPageIndex(path, list) {
  return list.findIndex(item => item.link === path);
}

export default function (page, items) {
  const currentPath = page.regularPath;
  const links = listOfLinks(items);
  const index = getPageIndex(currentPath, links);

  return {
    prev: links[index - 1],
    next: links[index + 1]
  };
}
