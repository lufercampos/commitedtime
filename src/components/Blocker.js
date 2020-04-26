import React from "react";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

function Blocker(props) {
  const { children, submitting } = props;
  return (
    <BlockUi tag="div" blocking={submitting}>
      {children}
    </BlockUi>
  );
}

export default Blocker;
