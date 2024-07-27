export enum SLICE {
  Setting = 'setting',
}

export const INIT_STATE = {
  [SLICE.Setting]: null
}

export type TYPE_SLICE = {
  [SLICE.Setting]: Object | null

}


export const WHITE_LIST_PERSIT_REDUX = []

export type TYPE_PERSIST_REDUCER = TYPE_SLICE & unknown

