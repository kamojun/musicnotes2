import React from 'react'


type Store = {
  starttime: number | null,
  pushedKey: Keys | null,
  position: number,
  problem: number[]
}

const initalState: Store = {
  starttime: null,
  pushedKey: null,
  position: 0,
  problem: [60, 62, 64, 65, 67, 65, 64, 62]
}

const getKey = (state: Store): Keys => {
  return (state.problem[state.position] % 12)
}

interface StoreWithAction {
  state: Store;
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

export const reducer: React.Reducer<Store, UAction> = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "keyPress": {
      if (action.key === getKey(state)) {
        const newpos = state.position + 1
        if (newpos < 8) {
          return { ...state, position: state.position + 1 }
        } else {
          return { ...state, position: 0, problem: state.problem.reverse() }
        }

      } else {
        return state
      }
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