import findIndex from "lodash/findIndex";
export const findPage = (pages, pageName) => {
  const idx = findIndex(pages, page => page.pageName === pageName);
  if (idx > -1) {
    return pages[idx];
  }
  return {};
};
export const findSection = (sections, sectionName) => {
  const idx = findIndex(
    sections,
    section => section.sectionName === sectionName
  );
  if (idx > -1) {
    return sections[idx];
  }
  return {};
};
