const chekString = (newstring, length) => {
  const result = newstring.length <= length;
  return result;
};
chekString('проверяемая 111строка', 20);

const getPalindrom = (str) =>{
  str = str.toLowerCase().replaceAll(' ', '');
  const lastindex = str.length - 1;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[lastindex - i]) {
      return false;
    }

  }
  return true;
};
getPalindrom('Лёша на полке клопа нашёл ');

const createNumber = (string) => {
  if (string && string.lenght === 0) {
    return NaN;
  }

  return parseInt (string.replace (/\D+/g, ''), 10);
};

createNumber ('агент 007');

