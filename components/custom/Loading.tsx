import React from "react";

const Loading = () => {
  return (
    <span className="relative flex size-10">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-700 opacity-75"></span>
      <span className="relative inline-flex size-10 rounded-full bg-slate-500"></span>
    </span>
  );
};

export default Loading;
