export function flatten<U>(arr: U[][], depth: number = 1, stack: U[] = []): U[] {
  for(let i=0;i<arr.length;i++){
    const item = arr[i] as any;
    if(item instanceof Array && depth > 0){
      flatten(item, depth-1, stack);
    }
    else{
      stack.push(item);
    }
  }
  
  return stack;
}
