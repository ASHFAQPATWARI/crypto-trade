import Container from "components/Container";
import React from "react";
import useStore from "store/AppStore";
import ShowLoginMsg from "./components/ShowLoginMsg";
import Tradeform from "./components/Tradeform";

function Trade() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  return (
    <Container>
      <div className="flex items-center justify-center">
        <div className="bg-primary rounded-lg p-4">
          {isAuthenticated ? <Tradeform /> : <ShowLoginMsg />}
        </div>
      </div>
    </Container>
  );
}

export default Trade;
