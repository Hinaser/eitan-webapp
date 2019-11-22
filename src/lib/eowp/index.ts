export type TWordMean = {
  wordClass: string;
  mean: string;
};

export type TWord = {
  word: string;
  wordMeans: TWordMean[];
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
  
    const Word = {
      word,
      wordMeans,
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

export function generateQuestionList(wordList: TWord[]){
  const randomizedWordList = shuffleArray(wordList);
  let allAnswers = gatherAllWordMeans(randomizedWordList);
  
  return randomizedWordList.map(wl => {
    allAnswers = shuffleArray(allAnswers);
    const choices = allAnswers.slice(0, 4);
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

export function loadWordListFromLocalStorage(): TWord[] {
  try{
    return JSON.parse(localStorage.getItem("wordList") as string);
  }
  catch(e){
    return [];
  }
}

export function* questionGenerator(){
  const wl = loadWordListFromLocalStorage();
  const ql = generateQuestionList(wl);
  for(let i=0;i<ql.length;i++){
    const q = ql[i];
    yield q;
  }
}
