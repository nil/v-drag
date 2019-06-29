const monthNameList = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviember', 'diciembre']
};

/**
 * Get a formatted date.
 *
 * @param {string} timestamp - A 13-bit timestmp or valid date to format.
 * @param {string} lang      - A language code.
 *
 * @returns {string} A formatted date.
 */
export default function (timestamp, lang) {
  const date = new Date(timestamp);
  const shortLang = lang.replace(/-.*/, '');

  const d = date.getDate();
  const m = monthNameList[shortLang][date.getMonth() + 1];
  const y = date.getFullYear();

  if (shortLang === 'es') {
    return `${d} ${m}, ${y}`;
  }

  return `${m} ${d}, ${y}`;
}
