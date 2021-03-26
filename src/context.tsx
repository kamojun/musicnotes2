import React from 'react'


interface IStore {
  starttime: number,
  pushedKeys: Keys[]
}

const initalState: IStore = {
  starttime: null,
  pushedKeys: [],
}

interface StoreWithAction {
  state: IStore;
  dispatch: React.Dispatch<UAction>;
}
const RootContext = React.createContext<StoreWithAction>({
  state: initalState,
  dispatch: ({ }: UAction) => { }
});

export enum Keys {
  C = 0,
  Cis,
  D,
  Dis,
  E,
  F,
  Fis,
  G,
  Gis,
  A,
  Ais,
  B
}

type UAction = {
  type: "keyPress",
  key: Keys,
}

export const reducer: React.Reducer<IStore, UAction> = (state, action) => {
  switch (action.type) {
    case "keyPress": {
      return { ...state, pushedKeys: [...state.pushedKeys, action.key] }
    }
    default: {
      return state
    }
  }
}

interface StoreProviderProps {
  children: JSX.Element | JSX.Element[];
}
export const Provider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initalState)
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  )
}

export const useRootContext = () => React.useContext(RootContext)