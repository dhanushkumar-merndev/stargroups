import { ImageResponse } from "next/og";

export const alt =
  "Star Groups, a fast-growing multi-sector business group based in Bengaluru";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f7f5",
          color: "#111111",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 22,
            height: "100%",
            background: "#e51b2d",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 76px 62px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: "-1px",
              }}
            >
              <span>STAR</span>
              <span style={{ color: "#e51b2d", marginLeft: 10 }}>GROUPS</span>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#606068",
              }}
            >
              BENGALURU, INDIA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 940,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1.06,
                fontWeight: 800,
                letterSpacing: "-3px",
              }}
            >
              A fast-growing multi-sector business group.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 32,
                fontSize: 25,
                lineHeight: 1.45,
                color: "#5f5f67",
              }}
            >
              Building and growing businesses across property, technology,
              media, marketing and investments.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "1.6px",
              color: "#e51b2d",
              textTransform: "uppercase",
            }}
          >
            Real Estate&nbsp;&nbsp; / &nbsp;&nbsp;Interiors&nbsp;&nbsp; / &nbsp;&nbsp;Landscaping&nbsp;&nbsp; / &nbsp;&nbsp;Technology&nbsp;&nbsp; / &nbsp;&nbsp;Media&nbsp;&nbsp; / &nbsp;&nbsp;Ventures
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: -90,
            bottom: -125,
            width: 330,
            height: 330,
            borderRadius: 40,
            background: "#e51b2d",
            transform: "rotate(24deg)",
            opacity: 0.08,
          }}
        />
      </div>
    ),
    size,
  );
}
