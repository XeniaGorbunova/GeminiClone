import { createContext } from "react";
import { type ResultContextType, type AppContextType, type ErrorContextType } from "./models";

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const ResultContext = createContext<ResultContextType>({} as ResultContextType);
export const ErrorContext = createContext<ErrorContextType>({} as ErrorContextType);