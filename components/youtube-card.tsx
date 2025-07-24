export default function YoutubeCard({ src, title }: { src: string; title: string }) {
  return (
    <div className="w-full h-full">
      <iframe
        width="100%"
        height="100%"
        src={src}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
}