import * as zr from "zrender";
import CanvasPainter from "zrender/lib/canvas/Painter";
import { createZRShape } from "./Shapes";

// @ts-ignore   fix error Renderer 'canvas' is not imported. Please import it first.
zr.registerPainter("canvas", CanvasPainter);

export { ZRender } from "./ZRender";
export { Group } from "./Group";

export const Circle = createZRShape(zr.Circle);
export const Rect = createZRShape(zr.Rect);
export const Path = createZRShape(zr.Path);
export const Line = createZRShape(zr.Line);
export const Text = createZRShape(zr.Text);
export const Ellipse = createZRShape(zr.Ellipse);
export const Arc = createZRShape(zr.Arc);
export const Star = createZRShape(zr.Star);
export const Image = createZRShape(zr.Image);
export const Isogon = createZRShape(zr.Isogon);
export const Droplet = createZRShape(zr.Droplet);
export const Polygon = createZRShape(zr.Polygon);
export const Polyline = createZRShape(zr.Polyline);
export const Rose = createZRShape(zr.Rose);
export const Sector = createZRShape(zr.Sector);
export const BezierCurve = createZRShape(zr.BezierCurve);
export const Trochoid = createZRShape(zr.Trochoid);
