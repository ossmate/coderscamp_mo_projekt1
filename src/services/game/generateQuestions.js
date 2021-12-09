import { fetchNameFromAPI, fetchImgFromAPI } from '../swapi/swapi';

const getRandomNumber = (minInt, maxInt) => {
  return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
};

// zamienic te funkcje na pobieranie z api

const getRangeOfIds = (gameMode) => {
  const modeLC = gameMode.toLowerCase();
  if (modeLC === 'people') {
    const baseArr = Array(82 - 1 + 1)
      .fill()
      .map((_, idx) => 1 + idx);
    const arr = baseArr.filter((item) => item !== 17);
    return arr;
  }
  if (modeLC === 'vehicles') {
    // prettier-ignore
    const arr = [1, 4, 6, 7, 8, 14, 16, 18, 19, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38, 42, 43, 44, 45, 46, 50, 51, 53, 54, 55, 56, 57, 60, 62, 67, 69, 70, 71, 72, 73, 76];
    return arr;
  }
  if (modeLC === 'starships') {
    // prettier-ignore
    const arr = [2, 3 , 5, 9, 10, 11, 12, 13, 15, 17, 21, 22, 23, 27, 28, 29, 31, 32, 39, 40, 41, 43, 47, 48, 49, 52, 58, 59, 61, 63, 64, 65, 66, 68, 74, 75];
    return arr;
  } else return;
};

//

const generateAnswerNumbers = (arrOfNumbers) => {
  const minIndex = 0;
  const answerNumbers = [];
  for (let i = 0; answerNumbers.length < 4; i++) {
    const index = getRandomNumber(minIndex, arrOfNumbers.length - 1);
    const rand = arrOfNumbers[index];
    if (!answerNumbers.includes(rand)) {
      answerNumbers.push(rand);
    }
  }
  return answerNumbers;
};

const getCorrectAnswerIds = (answers) => {
  const rand = getRandomNumber(0, answers.length - 1);
  const correctAnswer = answers[rand];
  return correctAnswer;
};

const getAnswers = async (gameMode, arrWithNumbers) => {
  const answers = [];
  await arrWithNumbers.forEach(async (number) => {
    await fetchNameFromAPI(gameMode, number).then((resp) => {
      answers.push(resp);
      console.log(answers);
    });
  });
  return answers;
};

const generateQuestionForTheGameMode = async (gameMode) => {
  if (typeof gameMode !== 'string') {
    throw new Error('errrr');
  }
  const rangeOfIds = getRangeOfIds(gameMode);
  const answerNumbers = generateAnswerNumbers(rangeOfIds);

  const correctAnswerNumber = getCorrectAnswerIds(answerNumbers);

  const img = window.btoa(await fetchImgFromAPI(gameMode, correctAnswerNumber));

  return {
    image: img,
    answers: await getAnswers(gameMode, answerNumbers),
    rightAnswer: await fetchNameFromAPI(gameMode, correctAnswerNumber),
  };
};

export default generateQuestionForTheGameMode;