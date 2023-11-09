//случайное целое
const getRandomNumber = (left, right) => Math.trunc(Math.random() * (right + 1 - left) + left);

//случайное неповторяющееся число в пределах 1000
const identificators = [];

const chooseAIdentificator = () => {
  let choice = getRandomNumber(1, 1000);

  while (identificators.includes(choice)) {
    choice = getRandomNumber(1, 1000);
  }

  identificators.push(choice);
  return choice;
};

export {getRandomNumber, chooseAIdentificator};
