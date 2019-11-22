# Implementing Migration code

When implementing a new feature, you may be required to define new state of the app.  
If you design the app so that users always run the app with the fresh state definition, you can avoid to think about state migration.

If not, for example, you let users save their working application state to localStorage, then you should read this document carefully.

## What to do when you re-define redux state

\* Note that `App` mentioned below can be replaced with sub-state name of the combined reducer.  

### Define new state
1. Define new version of state under `src/state/store/App/initialState/index.type.ts`.  
   Please note that `currentVersion` value must be incremented as you modify state definition.
2. Modify `src/state/store/App/initialState/*.ts` with the new values.
3. Re-implement reducer/action with the new state definition.

### Write migration code
1. Create `src/state/store/App/migration/vX.ts` where `X` in `vX.ts` is version number.  
   This is a migration file. This file must export interface and upgrade/downgrade script described below.  
   Below is a sample migration code which migrates state between version 0 and 1.   
   ```
   import {IMigration, IMinimalState} from "../../../migration/type";
   
   // Definition of state before update
   export interface IStateV0 extends IMinimalState {
     lang: string;
   }

   // Definition of state after update
   // As you see, the new state just adds `theme` property to old state. 
   export interface IStateV1 extends IStateV0 {
     theme: string;
   }

   // This is migration body.
   // Migration object must implement both upgrade function and
   // downgrade function.
   const Migration: IMigration<IStateV0, IStateV1> = {
     upgrade: (appState) => {
       return {
         ...appState,
         version: 1,
         theme: "default",
       };
     },
     downgrade: (appState) => {
       const oldState = {...appState, version: 0};
       delete oldState.theme;
       return oldState;
     },
   };

   export default Migration;
   ```
2. Modify `src/state/store/App/migration/index.ts` to include new migration you created above.  
   See the sample below.
   ```
   import {IMigration, IMinimalState} from "../../../migration/type";
   import {AppState, currentVersion} from "../type.state";
   import migrationV1 from "./v1";
   // When you have version N migration file, import here like
   // import migrationVN from "./vN";
   
   const getMigration = (updateToVersion: number): IMigration<any, any>|null => {
     switch(updateToVersion){
       case 1: return migrationV1;
       // Add migration object here for each a new version.
       // i.e. case 2: return migrationV2; ...
       default: return null;
     }
   };
   ...
   ```

## When actual migration occurred

Migration will occur when state is loaded via `IStateLoader`
defined under `src/state/loader/*Loader.ts`.  
How and when to load state is completely up to you.  
State can be loaded just after the react app starts, or when users log in to their account and so on.
