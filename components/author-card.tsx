import Image from "next/image";

export default function AuthorCard() {
  return (
    <div className="flex flex-col gap-4 bg-secondary rounded-md px-4 pt-4 pb-6 border-2 border-muted-foreground/10 w-fit my-4">
      <div className="flex flex-row gap-2">
        <Image src="/zxstim.png" alt="logo" width={60} height={60} />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">ZxStim (Victor Luong)</h1>
          <p className="text-sm text-muted-foreground">
            Host của DeFi.vn
          </p>
        </div>
      </div>
    </div>
  );
}