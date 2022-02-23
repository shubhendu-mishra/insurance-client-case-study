import { FC, useRef, useEffect, useState } from "react";
import {
  shallowEqual,
  useSelector,
  connect,
  useDispatch,
  ConnectedProps,
} from "react-redux";

import * as auth from "./AuthRedux";
import { RootState } from "../../../../setup";

const mapState = (state: RootState) => ({ auth: state.auth });
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;
const AuthInit: FC<PropsFromRedux> = (props) => {
  return <>{props.children}</>;
};

export default connector(AuthInit);
