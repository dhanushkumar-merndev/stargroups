"use client";

import {
  Map,
  MapArc,
  MapMarker,
  MarkerContent,
  MarkerLabel,
} from "@/components/ui/map";

const hub = { name: "Bengaluru", lng: 77.5946, lat: 12.9716 };

const destinations = [
  { name: "New York", lng: -74.006, lat: 40.7128 },
  { name: "São Paulo", lng: -46.6333, lat: -23.5505 },
  { name: "Cape Town", lng: 18.4241, lat: -33.9249 },
  { name: "Dubai", lng: 55.2708, lat: 25.2048 },
  { name: "Mumbai", lng: 72.8777, lat: 19.076 },
  { name: "Singapore", lng: 103.8198, lat: 1.3521 },
  { name: "Tokyo", lng: 139.6917, lat: 35.6895 },
  { name: "Sydney", lng: 151.2093, lat: -33.8688 },
];

const arcs = destinations.map((destination) => ({
  id: destination.name,
  from: [hub.lng, hub.lat] as [number, number],
  to: [destination.lng, destination.lat] as [number, number],
}));

export function HeroMap() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[50%]">
      <Map
        center={[hub.lng, hub.lat]}
        zoom={2.77}
        theme="light"
        projection={{ type: "globe" }}
        hideLabels
        autoRotate={0.75}
        interactive={false}
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
      >
        <MapArc
          data={arcs}
          curvature={0.24}
          paint={{
            "line-color": "#e0142c",
            "line-width": 1.35,
            "line-opacity": 0.72,
            "line-dasharray": [2, 2],
          }}
          interactive={false}
        />

        <MapMarker longitude={hub.lng} latitude={hub.lat}>
          <MarkerContent>
            <div className="size-3 rounded-full border-2 border-white bg-sg-red shadow-md" />
            <MarkerLabel
              position="top"
              className="rounded-sm bg-sg-dark-ink px-1.5 py-0.5 text-[11px] font-semibold text-white shadow-sm"
            >
              {hub.name}
            </MarkerLabel>
          </MarkerContent>
        </MapMarker>

        {destinations.map((destination) => (
          <MapMarker
            key={destination.name}
            longitude={destination.lng}
            latitude={destination.lat}
          >
            <MarkerContent>
              <div className="size-2 rounded-full border-2 border-white bg-sg-red shadow-sm" />
              <MarkerLabel position="top" className="text-sg-dark-ink">
                {destination.name}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
