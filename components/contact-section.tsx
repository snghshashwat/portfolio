import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactLinks } from "@/lib/projects";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 py-12 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="h-full rounded-2xl">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Contact
              </p>
              <CardTitle className="text-xl text-blue-950 sm:text-2xl dark:text-slate-100">
                Let&apos;s build something meaningful.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-blue-700 dark:text-slate-300 sm:text-lg">
              <Link
                href={`mailto:${contactLinks.email}`}
                className="block hover:underline"
              >
                {contactLinks.email}
              </Link>
              <Link
                href={contactLinks.linkedin}
                className="block hover:underline"
              >
                LinkedIn
              </Link>
              <Link
                href={contactLinks.leetcode}
                className="block hover:underline"
              >
                LeetCode
              </Link>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-blue-950 dark:text-slate-100">
                Send a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="Your email" />
                <Textarea placeholder="Tell me about your project" />
                <Button type="button" className="w-full">
                  Send inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
