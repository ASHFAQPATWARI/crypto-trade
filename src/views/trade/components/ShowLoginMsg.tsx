import { Button } from "components";
import React from "react";
import useStore from "store/AppStore";

function ShowLoginMsg() {
  const setShowLogin = useStore((state) => state.setShowLogin);
  return (
    <>
      <h5 className="text-white mb-5">
        Please login to interact with trade form.
      </h5>
      <Button theme="secondary" onClick={() => setShowLogin(true)}>
        Login
      </Button>
    </>
  );
}

export default ShowLoginMsg;
