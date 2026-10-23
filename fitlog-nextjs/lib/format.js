export function formatName(value=''){return String(value).toLowerCase().replace(/(^|\s)\S/g,m=>m.toUpperCase())}
export function pick(obj,keys,fallback){for(const key of keys){const value=obj?.[key];if(value!==undefined&&value!==null&&value!=='')return value}return fallback}
