export default function H1({ children }: { children?: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide lg:text-5xl">
      {children}
    </h1>
  );
}
