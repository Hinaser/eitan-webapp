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
    result: 0|1; // 0: failure, 1: passed
  }>;
};

export function getWordWithKanaTrimmed(el: HTMLElement){
  const cloneEl = el.cloneNode(true) as HTMLElement;
  const kanaEls = Array.from(cloneEl.querySelectorAll("span.kana"));
  kanaEls.forEach(kanaEl => {
    cloneEl.removeChild(kanaEl);
  });
  return cloneEl.innerText;
}

export function generateWordList(){
  const allRows = document.querySelectorAll("#wordlist > tbody > tr:not(:first-child)");
  
  const WordList: TWord[] = [];
  
  const rowCount = allRows.length;
  for(let i=0;i<rowCount;i+=2){
    const wordRow = allRows[i];
    const meansRow = allRows[i+1];
    
    const wordEl = wordRow.querySelector("td:nth-child(2)") as HTMLElement;
    const word = wordEl ? wordEl.innerText : "???";
    const wordClassesContainer = meansRow.querySelector("td:nth-child(2) > div > div");
    const wordClassEl: HTMLElement[] = wordClassesContainer ?
      Array.from(wordClassesContainer.querySelectorAll(".wordclass")) : [];
    
    const wordMeans = (()=>{
      if(wordClassEl.length > 0){
        return wordClassEl.map(el => {
          const wordClass = el.innerText.replace(/[【】]/g, "");
          const meansArray = el.nextSibling ? Array.from((el.nextSibling as HTMLElement).querySelectorAll("li")) : [];
          let means;
          if(meansArray.length > 0){
            means = meansArray.map(meanEl => {
              return getWordWithKanaTrimmed(meanEl);
            });
          }
          else{
            means = el.nextSibling ? [getWordWithKanaTrimmed(el.nextSibling as HTMLElement)] : [];
          }
          return means.map(m => {
            return {
              wordClass,
              mean: m,
            };
          });
        }).flat();
      }
      
      // When not single word
      if(/[ ]/.test(word) && wordClassesContainer && wordClassesContainer.querySelectorAll("ol").length < 1){
        return [{
          wordClass: "熟語",
          mean: getWordWithKanaTrimmed(wordClassesContainer as HTMLElement),
        }];
      }
      
      console.warn("Unrecognizable word", word);
      return [];
    })();
    
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

export function summarizeStats(wordList: TWord[], examResults: TExamResult[], qaTrend: TQATrend){
  const D = new Date();
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === D.getMonth();
  };
  
  const isCurrentWeek = (date: Date) => {
    const Day = D.getDay();
    const Sunday = new Date(D.getFullYear(), D.getMonth(), D.getDate() - Day);
    const Saturday = new Date(Sunday.getFullYear(), Sunday.getMonth(), Sunday.getDate() + 6);
    const time = date.getTime();
    return Sunday.getTime() <= time && time <= Saturday.getTime();
  };
  
  // Total count of words answered in all period
  let totalCountOfWordsAnsweredInAllPeriod: number = 0;
  
  // Total count of words answered in a month
  let totalCountOfWordsAnsweredInAMonth: number = 0;
  
  // Total count of words answered in a week
  let totalCountOfWordsAnsweredInAWeek: number = 0;
  
  // Total count of words not answered correctly in a month
  let totalCountOfMissedWordsInAMonth: number = 0;
  
  // Total count of words not answered correctly in a week
  let totalCountOfMissedWordsInAWeek: number = 0;
  
  // Troubling words which user couldn't give correct answers more than 2 times in a month.
  const troublingWords: Array<TWord & {missCount: number, allCount: number}> = [];
  
  const words = Object.keys(qaTrend);
  for(let i=0;i<words.length;i++){
    const word = words[i];
    const trends = qaTrend[word];
    
    let allCount = 0;
    let missCount = 0;
    
    for(let j=0;j<trends.length;j++){
      const trend = trends[j];
      const d = new Date(trend.date);
      totalCountOfWordsAnsweredInAllPeriod++;
      
      if(isCurrentMonth(d)){
        totalCountOfWordsAnsweredInAMonth++;
        allCount++;
        if(trend.result === 0){
          totalCountOfMissedWordsInAMonth++;
          missCount++;
        }
      }
      
      if(isCurrentWeek(d)){
        totalCountOfWordsAnsweredInAWeek++;
        if(trend.result === 0){
          totalCountOfMissedWordsInAWeek++;
        }
      }
    }
    
    if(missCount >= 1){
      const troublingWord = wordList.find(w => w.word === word);
      if(troublingWord){
        troublingWords.push({...troublingWord, missCount, allCount});
      }
    }
  }
  
  // Troubling words count (Words which user couldn't give correct answer more than 2 times consecutive in a month)
  const troublingWordsCount = troublingWords.length;
  
  // Top 10 troubling words
  const top10TroublingWords = troublingWords
    .sort((a, b) => (b.missCount/b.allCount) - (a.missCount/a.allCount))
    .slice(0, 10);
  
  return {
    totalCountOfWordsAnsweredInAllPeriod,
    totalCountOfWordsAnsweredInAMonth,
    totalCountOfWordsAnsweredInAWeek,
    totalCountOfMissedWordsInAMonth,
    totalCountOfMissedWordsInAWeek,
    troublingWords,
    troublingWordsCount,
    top10TroublingWords,
  };
}
