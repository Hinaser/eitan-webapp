import {loadEowpDataFromLocalStorage} from "../../../../lib/eowp";
import {EowpState} from "../initialState/index.type";

export async function loadEowpData(): Promise<EowpState> {
  return loadEowpDataFromLocalStorage();
}
