import { Action } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  UserRequested: "Requested Current User",
};

const initialAuthState: IAuthState = {
  accessToken: undefined,
};

export interface IAuthState {
  accessToken?: string;
}

export const reducer = persistReducer(
  {
    storage,
    key: "urmulnet-react-100",
    whitelist: ["accessToken"],
  },
  (
    state: IAuthState = initialAuthState,
    action: ActionWithPayload<IAuthState>
  ) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken;
        return { ...state, accessToken: accessToken };
      }

      case actionTypes.Logout: {
        return initialAuthState;
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (accessToken: string) => ({
    type: actionTypes.Login,
    payload: { accessToken },
  }),

  logout: () => ({ type: actionTypes.Logout }),

  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    try {
    } catch (error) {}
  });
}
