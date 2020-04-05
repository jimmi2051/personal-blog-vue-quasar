import findIndex from "lodash/findIndex";
export const findPage = (pages, pageName) => {
  const idx = findIndex(pages, (page) => page.pageName === pageName);
  if (idx > -1) {
    return pages[idx];
  }
  return {};
};
