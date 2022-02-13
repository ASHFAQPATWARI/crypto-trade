import "index.css";
import React from "react";
import styled from "styled-components/macro";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "secondary";
}

const StyledButton = styled.button<IButtonProps>`
  width: 100%;
  color: white;
  text-align: center;
  background-color: ${(p) =>
    p.theme === "primary" ? `var(--primary-color)` : `var(--secondary-color)`};
  &:hover {
    box-shadow: ${(p) =>
      p.theme === "primary"
        ? "0 6px 10px 0 rgb(8 30 57 / 30%)"
        : "0 6px 10px 0 rgb(255 130 21 / 30%)"};
  }
`;

function Button(props: IButtonProps): React.ReactElement<IButtonProps> {
  const { children, theme = "primary", ...rest } = props;
  return (
    <StyledButton
      {...rest}
      theme={theme}
      className={`
      ${rest.className} font-medium rounded-lg text-sm px-5 py-2.5`}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
