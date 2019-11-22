import {BaseModelType} from "./index.type";
import {Condition, OrConditions, SearchConditions} from "./search.type";
import {DepOrConditions} from "./dependency.type";

type FilterCondition<M extends BaseModelType> = (m: M) => boolean;

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

/**
 * Flatten nested conditions bound by and/or.
 *
 * Sample 1
 * {field: "f1", op: "<=", value: 2, and: [{field: "f1", op: ">=", value: 1}]}
 * =>
 * [
 *   [{field: "f1", op: "<=", value: 2}, /and/ {field: "f1", op: ">=", value: 1}],
 * ]
 *
 * Sample 2
 * {field: "f1", op: "<=", value: 2, and: [{field: "f1", op: ">=", value: 1}, {field: "f1", op: "==", value: 2}]}
 * =>
 * [
 *   [{field: "f1", op: "<=", value: 2}, /and/ {field: "f1", op: ">=", value: 1}],
 *   / or /
 *   [{field: "f1", op: "<=", value: 2}, /and/ {field: "f1", op: "==", value: 2}],
 * ]
 *
 */
export const flattenCondition = <M extends BaseModelType>(
  c: Condition<M> | Array<Condition<M>>,
): Array<Array<Condition<M>>> => {
  if(Array.isArray(c)){
    const multipleFlatCondition = c.map(c2 => flattenCondition(c2));
    return flatten(multipleFlatCondition);
  }
  
  if (c.and && c.and.length > 0) {
    const branchedOrConditions = c.and.map(condition => flattenCondition(condition));
    const cWithoutAnd = {
      field: c.field,
      op: c.op,
      value: c.value,
    };
    
    return branchedOrConditions.map(foc => [cWithoutAnd].concat(...foc));
  }
  
  return [[c]];
};

export const checkCondition = <M extends BaseModelType>(m: M, c: Condition<M>) => {
  switch (c.op) {
    case "<":
      return m[c.field] < c.value;
    case "<=":
      return m[c.field] <= c.value;
    case "==":
      return m[c.field] === c.value;
    case ">=":
      return m[c.field] >= c.value;
    case ">":
      return m[c.field] > c.value;
    case "contains":
      return (m[c.field] as any).findIndex((v: any) => c.value === v) > -1;
    default:
      return false;
  }
};

export const makeFilterFromCondition = <M extends BaseModelType>(sc: SearchConditions<M> | string): FilterCondition<M> => {
  if (typeof sc === "string") {
    return m => m.key === sc;
  }
  
  const conditions = flattenCondition(sc);
  
  return m => {
    return conditions.some(orC => orC.every(andC => checkCondition(m, andC)));
  };
};

export const getUniqueModels = <M extends BaseModelType>(models: M[]): M[] => {
  return models.filter((model, i, arr) => i === arr.findIndex(a => a.key === model.key));
};

export const convertRefToValueInCondition = <M extends BaseModelType>(
  depCondition: DepOrConditions<M>,
  model: M,
): OrConditions<M> => {
  return depCondition.map(dc => {
    dc = {...dc};
    
    if(dc.ref){
      dc.value = model[dc.ref as keyof M];
      delete dc.ref;
    }
    
    if(dc.and && dc.and.length > 0){
      dc.and = convertRefToValueInCondition(dc.and, model);
    }
    
    return dc;
  });
};
