import Image from "next/image";

const PHOTOS = [
  {
    src: "/meeting-point/aerial.jpeg",
    alt: "Aerial view of Doug Jennings Park and Marine Stadium, Main Beach, with the jetty and pontoon on the lagoon",
    caption: "Doug Jennings Park, Main Beach — from above",
  },
  {
    src: "/meeting-point/pontoon.jpeg",
    alt: "Marine Stadium Jetty & Pontoon at Doug Jennings Park, Main Beach — the boarding point",
    caption: "Marine Stadium Jetty & Pontoon — board here",
  },
];

/** Meeting point photos + map. Shared by every cruise page so guests can find the jetty. */
export default function DepartureLocation() {
  return (
    <div
      className="light-adapt-section"
      style={{
        background: "var(--navy)",
        borderBottom: "1px solid rgba(201,168,76,0.08)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 48px" }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.35)",
            marginBottom: 14,
          }}
        >
          Departure Location
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            lineHeight: 1.6,
            color: "rgba(245,240,232,0.75)",
            margin: "0 0 18px",
          }}
        >
          Marine Stadium Jetty &amp; Pontoon · Doug Jennings Park, Main Beach,
          Gold Coast
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {PHOTOS.map((photo) => (
            <figure key={photo.src} style={{ margin: 0 }}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 560px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(245,240,232,0.45)",
                  marginTop: 8,
                }}
              >
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=-27.9407977,153.4237125&z=17&output=embed"
            width="100%"
            height="300"
            style={{
              display: "block",
              border: "none",
              filter: "grayscale(30%) contrast(1.05)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Departure point — Marine Stadium Jetty & Pontoon, Doug Jennings Park, Main Beach, Gold Coast"
          />
        </div>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <a
            href="https://maps.app.goo.gl/ef21zFGntpZDjmB17"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
            }}
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}
