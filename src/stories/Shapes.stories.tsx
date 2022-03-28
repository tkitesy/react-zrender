import React from "react";
import { Circle, ZRender, Group } from "..";
import { EventfulGroup } from "../Group";
export default {
  title: "Example/Shapes",
};

export function DemoCircle() {
  const [red, setRed] = React.useState(false);
  const [zIndex, setZIndex] = React.useState(false);
  return (
    <div>
      <button onClick={() => setRed((v) => !v)}>{red ? "blue" : "red"}</button>
      <button onClick={() => setZIndex((v) => !v)}>{zIndex ? "1" : "0"}</button>
      <ZRender style={{ height: "200" }}>
        <Group zIndex={zIndex ? 1 : 0}>
          <EventfulGroup onClick={() => alert("click trigger")}>
            <Circle
              shape={{
                r: 50,
                cx: 80,
                cy: 50,
              }}
              style={{ fill: "yellow", stroke: "#4577d4" }}
            />
          </EventfulGroup>
        </Group>
        <Circle
          shape={{
            r: 50,
            cx: 50,
            cy: 50,
          }}
          style={{ fill: red ? "red" : "blue", stroke: "#4577d4" }}
        />
      </ZRender>
    </div>
  );
}
