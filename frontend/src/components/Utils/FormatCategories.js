export const formatCategory = (res) => {
  const cap = res.replace(/\b\w/g, char => char.toUpperCase());
  const final = cap.replace('_', ' ');
  return final;
}
