// @flow
/* eslint-disable no-undef, no-unused-vars */

declare module GoogleMaps {
    declare type GoogleMapsApi = $ReadOnly<{
        Map: Class<GoogleMap>,
        LatLng: Class<LatLng>,
        Polyline: Class<Polyline>,
        LatLngBounds: Class<LatLngBounds>,
        Marker: Class<Marker>,
        OverlayView: Class<OverlayView>,
        ControlPosition: ControlPosition,
        event: $ReadOnly<{
            trigger(map: GoogleMap, event: string): void
        }>
    }>;

    declare class GoogleMap extends MVCObject {
        constructor(element: HTMLElement, options?: MapOptions): GoogleMap;
        getCenter(): LatLng;
        setCenter(position: Position): void;
        getOptions(): MapOptions;
        setOptions(options: MapOptions): void;
        getZoom(): number;
        setZoom(zoom: number): void;
        getDiv(): Element;
        getBounds(): LatLngBounds;
        fitBounds(bounds: LatLngBounds, padding?: number | Padding): void;
        +controls: Array<MVCArray<Node>>;
    }

    declare type MapOptions = {};

    declare class LatLng {
        constructor(lat: number, lng: number): LatLng;
        lat(): number;
        lng(): number;
        equals(other: LatLng): boolean;
        toJSON(): PositionObject;
    }

    declare type PositionObject = {
        lat: number,
        lng: number
    };

    declare type Position = PositionObject | LatLng;

    declare class Point {
        constructor(x: number, y: number): Point;
        equals(other: Point): boolean;
        +x: number;
        +y: number;
    }

    declare class Polyline extends MVCObject {
        constructor(options: PolylineOptions): Polyline;
        getMap(): GoogleMap;
        setMap(map: ?GoogleMap): void;
        getOptions(): PolylineOptions;
        setOptions(options: PolylineOptions): void;
    }

    declare type PolylineOptions = {};

    declare class LatLngBounds {
        constructor(): LatLngBounds;
        extend(point: Position): LatLngBounds;
        getCenter(): LatLng;
        getNorthEast(): LatLng;
        getSouthWest(): LatLng;
    }

    declare class Marker extends MVCObject {
        constructor(options: MarkerOptions): Marker;
        getMap(): GoogleMap;
        setMap(map: ?GoogleMap): void;
        getOptions(): MarkerOptions;
        setOptions(options: MarkerOptions): void;
    }

    declare type MarkerOptions = {};

    declare type ControlPosition = {
        BOTTOM_CENTER: number,
        BOTTOM_LEFT: number,
        BOTTOM_RIGHT: number,
        LEFT_BOTTOM: number,
        LEFT_CENTER: number,
        LEFT_TOP: number,
        RIGHT_BOTTOM: number,
        RIGHT_CENTER: number,
        RIGHT_TOP: number,
        TOP_CENTER: number,
        TOP_LEFT: number,
        TOP_RIGHT: number
    };

    declare class OverlayView extends MVCObject {
        constructor(): OverlayView;
        draw(): void;
        onAdd(): void;
        onRemove(): void;
        getMap(): GoogleMap;
        setMap(map: ?GoogleMap): void;
        getPanes(): MapPanes;
        getProjection(): MapCanvasProjection;
    }

    declare interface MapPanes {
        /**
         * This pane contains the info window. It is above all map overlays. (Pane 4).
         */
        +floatPane: Element;

        /**
         * This pane is the lowest pane and is above the tiles. It may not receive DOM events. (Pane 0).
         */
        +mapPane: Element;

        /**
         * This pane contains markers. It may not receive DOM events. (Pane 2).
         */
        +markerLayer: Element;

        /**
         * This pane contains polylines, polygons, ground overlays and tile layer overlays. It may not receive DOM events. (Pane 1).
         */
        +overlayLayer: Element;

        /**
         * This pane contains elements that receive DOM events. (Pane 3).
         */
        +overlayMouseTarget: Element;
    }

    declare interface MapCanvasProjection {
        fromLatLngToContainerPixel(latLng: LatLng): Point;
        fromLatLngToDivPixel(latLng: LatLng): Point;
        getWorldWidth(): number;
    }

    declare type Padding = {
        bottom: number,
        left: number,
        right: number,
        top: number
    };

    declare class MVCObject {
        addListener(eventName: string, handler: () => mixed): MapsEventListener;
        removeListener(listener: MapsEventListener): void;
    }

    declare class MVCArray<T> extends MVCObject {
        indexOf(elem: T): number;
        getAt(i: number): T;
        removeAt(i: number): T;
        setAt(i: number, elem: T): void;
        insertAt(i: number, elem: T): void;
        push(elem: T): number;
        pop(): T;
        clear(): void;
        forEach(cb: (elem: T, i: number) => mixed): void;
        getArray(): Array<T>;
        getLength(): number;
    }

    declare interface MapsEventListener {
        remove(): void;
    }
}

import type { GoogleMapsApi } from 'GoogleMaps';

declare var google: ?$Exact<{
    maps: GoogleMapsApi
}>;
