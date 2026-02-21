type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  return (
    <section className="gallery-grid">
      <img
        src={`${images[0]}?auto=format&fit=crop&w=1300&q=80`}
        alt={`${title} main photo`}
        style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 12 }}
      />
      <div style={{ display: "grid", gap: "0.75rem", gridTemplateRows: "1fr 1fr" }}>
        {images.slice(1, 3).map((image, index) => (
          <img
            key={image}
            src={`${image}?auto=format&fit=crop&w=600&q=80`}
            alt={`${title} photo ${index + 2}`}
            style={{ width: "100%", height: 164, objectFit: "cover", borderRadius: 12 }}
          />
        ))}
      </div>
    </section>
  );
}
