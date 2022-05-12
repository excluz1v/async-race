import React from "react";

type Props = {
  text?: string;
  handler?: () => void;
  className?: string;
};

export default function CustomButton(props: Props) {
  const { text, handler, className } = props;
  return (
    <button
      className={className}
      onClick={handler}
      type="button"
      aria-label="button"
    >
      {text}
    </button>
  );
}

CustomButton.defaultProps = {
  handler: () => true,
  text: "",
  className: "",
};
