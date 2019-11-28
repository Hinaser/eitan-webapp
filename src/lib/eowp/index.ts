export type TWordMean = {
  wordClass: string;
  mean: string;
};

export type TWord = {
  word: string;
  wordMeans: TWordMean[];
  pronounce: string;
};

export type TQuestion = TWord & {
  choices: TWordMean[];
};

export type TAnswer = {
  answer: number[]|null;
};

export type TExam = Array<TQuestion & TAnswer>;

export type TExamResult = {
  maxScore: number;
  score: number;
  date: number;
  ymd: number;
  exam: TExam;
};

export type TQATrend = {
  [word: string]: Array<{
    ymd: number;
    date: number;
    result: number; // 0: failure, 1: passed
  }>;
};

export function generateWordList(){
  const allRows = document.querySelectorAll("#wordlist > tbody > tr:not(:first-child)");
  
  const WordList: TWord[] = [];
  
  const wordCount = allRows.length / 2;
  for(let i=0;i<wordCount;i+=2){
    const wordRow = allRows[i];
    const meansRow = allRows[i+1];
    
    const wordEl = wordRow.querySelector("td:nth-child(2)") as HTMLElement;
    const word = wordEl ? wordEl.innerText : "???";
    const wordClassesContainer = meansRow.querySelector("td:nth-child(2) > div > div");
    const wordClassEl: HTMLElement[] = wordClassesContainer ?
      Array.from(wordClassesContainer.querySelectorAll(".wordclass")) : [];
    
    const wordMeans = wordClassEl.map(el => {
      const wordClass = el.innerText.replace(/[【】]/g, "");
      const meansArray = el.nextSibling ? Array.from((el.nextSibling as HTMLElement).querySelectorAll("li")) : [];
      let means;
      if(meansArray.length > 0){
        means = meansArray.map(meanEl => {
          return meanEl.innerText;
        });
      }
      else{
        means = el.nextSibling ? [(el.nextSibling as HTMLElement).innerText] : [];
      }
      return means.map(m => {
        return {
          wordClass,
          mean: m,
        };
      });
    }).flat();
    
    const pronounceEl = meansRow.querySelector<HTMLElement>("span.attr > span.pron");
    const pronounce = pronounceEl ? pronounceEl.innerText.replace(/、$/, "") : "";
  
    const Word = {
      word,
      wordMeans,
      pronounce,
    };
  
    WordList.push(Word);
  }
  
  return WordList;
}

export function gatherAllWordMeans(WordList: TWord[]){
  return WordList.map(wl => {
    return wl.wordMeans;
  }).flat();
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray<T>(array: T[]): T[] {
  let workingArray = [...array];
  for (let i = workingArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
  }
  return workingArray;
}

export function generateQuestionList(wordList: TWord[], nChoices: number, nQuestions: number): TQuestion[] {
  const randomizedWordList = shuffleArray(wordList);
  let allAnswers = gatherAllWordMeans(randomizedWordList);
  
  return randomizedWordList.slice(0, nQuestions).map(wl => {
    allAnswers = shuffleArray(allAnswers);
    
    let i = 0;
    const choices: TWordMean[] = [];
    while(choices.length < nChoices-1 && i < allAnswers.length){
      const answerCandidate = allAnswers[i];
      if(!wl.wordMeans.some(m => m.mean === answerCandidate.mean)){
        choices.push(answerCandidate);
      }
      i++;
    }
    const correctAnswer = wl.wordMeans[Math.floor(Math.random()*wl.wordMeans.length)];
    choices.push(correctAnswer);
    return {
      ...wl,
      choices: shuffleArray(choices),
    };
  });
}

export function gatherAndStoreWordList(){
  let wl = generateWordList();
  
  const savedWlStr = localStorage.getItem("wordList");
  if(savedWlStr){
    const savedWl = JSON.parse(savedWlStr) as TWord[];
    wl = savedWl.concat(wl).filter((w, i, arr) => i === arr.findIndex(w2 => w2.word === w.word));
  }
  
  const wlStr = JSON.stringify(wl);
  localStorage.setItem("wordList", wlStr);
  return wl;
}

export async function loadEowpDataFromLocalStorage(){
  const wordList = (()=>{
    try{
      return JSON.parse(localStorage.getItem("wordList") as string) || [] as TWord[];
    }
    catch(e){
      return undefined;
    }
  })();
  
  const resultHistory = (()=>{
    try{
      return JSON.parse(localStorage.getItem("resultHistory") as string) || [] as TExamResult[];
    }
    catch(e){
      return undefined;
    }
  })();
  
  const qaTrend = (()=>{
    try{
      return JSON.parse(localStorage.getItem("qaTrend") as string) || [] as TQATrend[];
    }
    catch(e){
      return undefined;
    }
  })();
  
  const nChoices = (()=>{
    try{
      const rt = JSON.parse(localStorage.getItem("nChoices") as string);
      return typeof rt === "number" ? rt : undefined;
    }
    catch(e){
      return undefined;
    }
  })();
  
  const nQuestionsInExam = (()=>{
    try{
      const rt = JSON.parse(localStorage.getItem("nQuestionsInExam") as string);
      return typeof rt === "number" ? rt : undefined;
    }
    catch(e){
      return undefined;
    }
  })();
  
  return {
    version: 0,
    loading: false,
    wordList,
    resultHistory,
    qaTrend,
    nChoices,
    nQuestionsInExam,
  };
}
