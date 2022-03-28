import React from "react";
import * as ZR from "zrender";
import { ZRenderProvider } from "./hooks";

interface ZRenderProps {
  className?: string;
  style?: React.CSSProperties;
  zrOption?: ZR.ZRenderInitOpt;
}

export const ZRender: React.FC<ZRenderProps> = ({
  children,
  zrOption,
  className,
  style,
}) => {
  const domRef = React.useRef<HTMLDivElement>(null);
  const zrRef = React.useRef<ZR.ZRenderType>();
  const [ready, setReady] = React.useState(false);

  React.useLayoutEffect(() => {
    if (domRef.current) {
      zrRef.current = ZR.init(domRef.current, zrOption);
      setReady(true);
    }
    return () => {
      if (zrRef.current) {
        zrRef.current.dispose();
      }
    };
  }, []);

  const context = React.useMemo(
    () => ({
      dom: domRef.current || undefined,
      zr: zrRef.current,
    }),
    [domRef.current, zrRef.current]
  );

  return (
    <div className={`${className}`} style={style}>
      <div ref={domRef} style={{ height: "100%" }}></div>
      {ready && <ZRenderProvider {...context}>{children}</ZRenderProvider>}
    </div>
  );
};
