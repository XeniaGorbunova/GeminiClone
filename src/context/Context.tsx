import { createContext } from "react";
import { type ResultContextType, type AppContextType } from "./models";

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const ResultContext = createContext<ResultContextType>({} as ResultContextType);