import React from "react";
import * as ZR from "zrender";

export interface ZRenderContext {
  dom?: HTMLDivElement;
  zr?: ZR.ZRenderType;
  group?: ZR.Group;
  zIndex?: number;
}

const ZRenderContext = React.createContext<ZRenderContext>({});

export const ZRenderProvider: React.FC<ZRenderContext> = ({
  children,
  ...props
}) => {
  return (
    <ZRenderContext.Provider value={props}>{children}</ZRenderContext.Provider>
  );
};

export function useZRender() {
  const context = React.useContext(ZRenderContext);
  if (!context) throw "useZRender must used as child of ZRenderProvider";

  return context;
}

export function usePre<T>(v: T): T | null {
  const ref = React.useRef(null);
  const pre = ref.current;
  ref.current = v;

  return pre;
}
