'use strict';

export function FilterKeys (obj, allowedKeys) {
  const result = {};
  const forbiddenTypes = [
    'VIRTUAL',
  ];
  for (const [ key, value ] of Object.entries(obj)) {
    if (!forbiddenTypes.includes(value?.type?.key)) {
      result[key] = value;
    }
  }
  return result;
}