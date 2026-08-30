/**
 * Minimal typings for `react-simple-maps`, which ships none.
 *
 * Only the surface this project uses is declared. A bare
 * `declare module 'react-simple-maps'` types everything as `any`, which forced
 * `any` annotations at every call site in GlobalReach.
 */
declare module "react-simple-maps" {
  import type { ComponentType, CSSProperties, ReactNode, SVGProps } from "react";

  /** One feature from the TopoJSON, as react-simple-maps hands it back. */
  export interface GeographyFeature {
    rsmKey: string;
    svgPath: string;
    type: string;
    properties: Record<string, unknown>;
    geometry: unknown;
  }

  export interface GeographyStyle {
    default?: CSSProperties;
    hover?: CSSProperties;
    pressed?: CSSProperties;
  }

  export interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    children?: ReactNode;
  }
  export const ComposableMap: ComponentType<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (args: {
      geographies: GeographyFeature[];
      outline: GeographyFeature;
      borders: GeographyFeature;
    }) => ReactNode;
  }
  export const Geographies: ComponentType<GeographiesProps>;

  export interface GeographyProps extends Omit<SVGProps<SVGPathElement>, "style"> {
    geography: GeographyFeature;
    style?: GeographyStyle;
  }
  export const Geography: ComponentType<GeographyProps>;

  export interface MarkerProps extends SVGProps<SVGGElement> {
    coordinates: [number, number];
    children?: ReactNode;
  }
  export const Marker: ComponentType<MarkerProps>;

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    children?: ReactNode;
  }
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
