/* eslint-disable @typescript-eslint/no-explicit-any */

export const generateSlug = (title: string, addRandomNumber?: boolean) => {
  const wipTitle = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/  +/g, ' ')
    .replace(/ /g, '-');

  const randNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return addRandomNumber ? `${wipTitle}-${randNum}` : wipTitle;
};

export function convertStringToOrderObject(str?: string, direction?: 'ASC' | 'DESC'): Record<string, any> {
  // TODO:: Clean this function
  if (!str) return {};

  const properties = str.split('.');
  const result: Record<string, any> = {};

  let currentObj = result;
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    if (!currentObj.hasOwnProperty(property)) {
      currentObj[property] = {};
    }
    if (i === properties.length - 1) {
      currentObj[property] = direction;
    }
    currentObj = currentObj[property];
  }

  return result;
}
