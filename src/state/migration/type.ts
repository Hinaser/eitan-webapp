export interface IMinimalState {
  version: number;
}

export interface IMigration<OldState extends IMinimalState, NewState extends IMinimalState> {
  upgrade: (oldState: OldState) => NewState;
  downgrade: (newState: NewState) => OldState;
}
