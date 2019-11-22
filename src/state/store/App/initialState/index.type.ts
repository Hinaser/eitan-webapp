// DO NOT FORGET TO INCREMENT VERSION BELOW when you modify the state definition.
export const currentVersion = 2;

export type AppState = {
  version: number;
  lang: string;
  theme: string;
  isLoadingApp: boolean;
  isSidebarOpen: boolean;
  sidebarPosition: "left" | "right";
};
