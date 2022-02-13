import { ArrowDownIcon } from "@heroicons/react/outline";
import React from "react";
import styled from "styled-components/macro";

const StyledSwapBtn = styled.button`
  padding: 4px;
  border-radius: 12px;
  height: 32px;
  width: 32px;
  margin-top: -14px;
  margin-bottom: -14px;
  left: calc(50% - 16px);
  z-index: 2;
`;

interface ISwapBtn {
  onClick: () => void;
}

/**
 * Button to swap Trade inputs
 * */
function SwapBtn({ onClick }: ISwapBtn) {
  return (
    <StyledSwapBtn
      onClick={onClick}
      className="swapBtn bg-slate-600 border-slate-900 border-4 block relative"
    >
      <ArrowDownIcon color="white" />
    </StyledSwapBtn>
  );
}

export default SwapBtn;
