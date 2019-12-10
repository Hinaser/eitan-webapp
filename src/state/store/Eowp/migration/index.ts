import {IMigration, IMinimalState} from "../../../migration/type";
import {EowpState, currentVersion} from "../initialState/index.type";
// When you have version N migration file, import here like
// import migrationVN from "./vN";

const getMigration = (updateToVersion: number): IMigration<any, any>|null => {
  switch(updateToVersion){
    // Add migration object here for each a new version.
    // i.e. case 2: return migrationV2; ...
    default: return null;
  }
};

/**
 * No need to change this function.
 */
export function upgradeToLatestState<S extends IMinimalState>(state: S): EowpState {
  const {version: stateVersion} = state;

  const migrations = [];
  for(let v=stateVersion+1;v<=currentVersion;v++){
    const migration = getMigration(v);
    if(migration){
      migrations.push(migration);
    }
  }
  
  return migrations.reduce((s: any, migration) => {
    const newState = migration.upgrade(s);
    
    if(process.env.REACT_APP_ENV === "development"){
      console.log(`App state has been upgraded from ${s.version} to ${newState.version}`);
      console.log("oldState: ", s);
      console.log("newState: ", newState);
    }
    
    return newState;
  }, state);
}
