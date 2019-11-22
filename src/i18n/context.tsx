import * as React from "react";
import {TFunction} from "i18next";
import memoizeOne from "memoize-one";
import i18n from "./index";

type I18nProps = {
  lang: string;
  t: TFunction;
};

const getTFunction = memoizeOne((lang: string) => i18n.getFixedT(lang));

export function withI18n<P extends I18nProps>(Component: React.ComponentType<P>){
  return (props: Omit<P, "t">) => {
    const t = getTFunction(props.lang);
    return <Component {...props as any} t={t} />;
  };
}

