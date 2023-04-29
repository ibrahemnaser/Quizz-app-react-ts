import React from "react";

type PropsType = {
  condition: boolean;
  children: React.ReactNode;
  fallback: null | React.ReactNode;
};

const RenderWhen: React.FC<PropsType> = ({ condition, children, fallback }) => {
  return <>{condition ? children : fallback}</>;
};

export default RenderWhen;
