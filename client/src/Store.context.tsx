import React, { createContext, useReducer } from "react";

type State = boolean;
type Action = { type: "update"; payload: boolean };

const initialState: State = false;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "update":
      return action.payload;
    default:
      return state;
  }
};

export const Store = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
