declare module "type-util" {
  type Omit<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

  type TWithTranslateProps = "i18n" | "t";
  type TWithStyleProps = "classes" | "theme";
  type TWithContentSizeProps = "availableWidth" | "availableHeight";

  type TReservedHocProps = TWithTranslateProps | TWithStyleProps | TWithContentSizeProps;
  
  // Extract Actions from ActionCreators.
  // Thanks to https://qiita.com/Takepepe/items/9be98c8a05d22fd08055
  type Unwrap<T> = T extends {[K in keyof T]: infer U} ? U : never;
  type ReturnTypes<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ?
      ReturnType<T[K]> :
      never
  };
  type CreatorsToActions<T> = Unwrap<ReturnTypes<T>>;
}
