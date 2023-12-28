import { FC } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroWrapper: FC = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl dark:text-white sm:text-5xl md:text-6xl font-bold">
            Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
            <span className="underline">Notion</span>
          </h1>
          <h3 className="text-base dark:text-white sm:text-xl md:text-2xl font-medium">
            Notion is the connected workspace where <br />
            better, faster work happens.
          </h3>
        </div>
        <Button asChild>
          <Link href="/login">
            Try Notion
            <MoveRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroWrapper;
