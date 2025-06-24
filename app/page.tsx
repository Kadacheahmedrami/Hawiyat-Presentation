export default function Home() {
  const figmaUrl = "https://embed.figma.com/proto/KSyUoxacOyg1XVqR0yO9lp/Hawiyat?node-id=459-665&p=f&scaling=scale-down&content-scaling=fixed&page-id=459%3A664&embed-host=share";
  
  return (
    <div className="h-screen w-screen">
      <iframe
        className="w-full h-full border-0"
        src={figmaUrl}
        allowFullScreen
        title="Hawiyat Figma Prototype"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}