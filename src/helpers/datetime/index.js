export function getLocalDatetimeString(ISODateTimeString) {
  const datetime = new Date(ISODateTimeString);
  return datetime.toLocaleString('en-GB')
}
