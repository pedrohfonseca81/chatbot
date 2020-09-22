module.exports = (string) => {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[@,\.;:?!@'´`~<>^\[\]{}()0-9]/gi, "")
    .toLowerCase()
    .trim();
};
