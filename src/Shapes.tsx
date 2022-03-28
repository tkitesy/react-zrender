import React from "react";
import { usePre, useZRender } from "./hooks";

export function createZRShape<T extends new (args: any) => any>(ctor: T) {
  const Comp: React.FC<T extends new (args: infer P) => any ? P : any> = ({
    children,
    ...props
  }) => {
    const context = useZRender();
    const pre = usePre(props);
    const element = React.useMemo(() => {
      const element = new ctor(props);
      return element;
    }, []);

    if (pre && props) {
      for (let [attrName, attrValue] of Object.entries(props)) {
        element.attr(attrName, attrValue);
      }
    }
    element.attr("z", context.zIndex ?? 0);

    React.useMemo(() => {
      if (context.group) {
        context.group.add(element);
      } else if (context.zr) {
        context.zr.add(element);
      }
    }, []);

    React.useEffect(
      () => () => {
        if (context.group) {
          context.group.remove(element);
        } else if (context.zr) {
          context.zr.remove(element);
        }
      },
      []
    );
    return <>{children}</>;
  };
  return Comp;
}
