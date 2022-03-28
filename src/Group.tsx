import React from "react";
import * as ZR from "zrender";
import { ElementEventCallback } from "zrender";
import { useZRender, ZRenderProvider } from "./hooks";

export const Group: React.FC<ZR.GroupProps & { zIndex?: number }> = ({
  children,
  zIndex = 1,
  ...props
}) => {
  const group = React.useMemo(() => {
    const group = new ZR.Group();
    return group;
  }, []);
  const context = useZRender();
  group.attr(props);

  React.useMemo(() => {
    if (context.group) {
      context.group.add(group);
    } else if (context.zr) {
      context.zr.add(group);
    }
  }, []);

  React.useEffect(
    () => () => {
      if (context.group) {
        context.group.remove(group);
      } else if (context.zr) {
        context.zr.remove(group);
      }
    },
    []
  );

  const parentZIndex = context.zIndex ?? 0;

  return (
    <ZRenderProvider {...context} group={group} zIndex={parentZIndex + zIndex}>
      {children}
    </ZRenderProvider>
  );
};

const EventNames = [
  "click" as const,
  "dblclick" as const,
  "mousewheel" as const,
  "mouseout" as const,
  "mouseover" as const,
  "mouseup" as const,
  "mousedown" as const,
  "mousemove" as const,
  "contextmenu" as const,
  "drag" as const,
  "dragstart" as const,
  "dragend" as const,
  "dragenter" as const,
  "dragleave" as const,
  "dragover" as const,
  "drop" as const,
  "globalout" as const,
];

type EventfulGroupProps = {
  [k in `on${Capitalize<typeof EventNames[number]>}`]?: ElementEventCallback<
    unknown,
    unknown
  >;
};

function capitalize(evtName: string) {
  return evtName[0].toUpperCase() + evtName.slice(1);
}

export const EventfulGroup: React.FC<EventfulGroupProps> = ({
  children,
  ...props
}) => {
  const group = React.useMemo(() => {
    const group = new ZR.Group();
    return group;
  }, []);
  const context = useZRender();

  EventNames.forEach((eventName) => {
    const propName = `on${capitalize(eventName)}`;
    React.useEffect(() => {
      group.on(eventName, props[propName]);
      return () => {
        group.off(eventName, props[propName]);
      };
    }, [props[propName]]);
  });

  React.useMemo(() => {
    if (context.group) {
      context.group.add(group);
    } else if (context.zr) {
      context.zr.add(group);
    }
  }, []);

  React.useEffect(
    () => () => {
      if (context.group) {
        context.group.remove(group);
      } else if (context.zr) {
        context.zr.remove(group);
      }
    },
    []
  );

  return (
    <ZRenderProvider {...context} group={group}>
      {children}
    </ZRenderProvider>
  );
};
