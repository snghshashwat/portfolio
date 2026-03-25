import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-lg rounded-3xl text-center">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
            404
          </p>
          <CardTitle className="mt-2 text-3xl text-blue-950 dark:text-slate-100">
            Case study not found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600 dark:text-slate-300">
            The page you requested does not exist or was moved.
          </p>
          <Button asChild variant="outline" className="mt-7">
            <Link href="/">Return Home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
