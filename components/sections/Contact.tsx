"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { fadeUp, fadeUpTransition, VIEWPORT_ONCE } from "@/lib/animations/variants";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10, "Say a bit more — 10 characters minimum").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full border border-border-hairline bg-transparent px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-tertiary transition-colors focus:border-signal focus:outline-none";

export function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setSubmitState("error");
    }
  };

  return (
    <section id="contact" className="border-t border-border-hairline px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <m.p
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          transition={fadeUpTransition()}
          className="mb-6 font-mono text-2xs uppercase tracking-widest text-text-tertiary"
        >
          ~/contact
        </m.p>

        <m.h2
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          transition={fadeUpTransition(0.05)}
          className="text-2xl font-light text-text-primary md:text-3xl"
        >
          Have a role, a project, or just want to talk shop? I read every
          message myself.
        </m.h2>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={fadeUp}
          transition={fadeUpTransition(0.1)}
          className="mt-10"
        >
          {submitState === "success" ? (
            <div className="border border-border-hairline bg-bg-elevated p-6 font-mono text-sm">
              <p className="text-signal">$ message sent successfully</p>
              <p className="mt-2 text-text-secondary">
                Thanks for reaching out — I&apos;ll reply from{" "}
                <span className="text-text-primary">jaind2677@gmail.com</span>{" "}
                as soon as I can.
              </p>
              <button
                type="button"
                onClick={() => setSubmitState("idle")}
                className="mt-4 text-text-tertiary underline underline-offset-4 hover:text-signal"
              >
                send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block font-mono text-2xs text-text-tertiary">
                  name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className={fieldClass}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1.5 font-mono text-2xs text-text-secondary">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block font-mono text-2xs text-text-tertiary">
                  email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 font-mono text-2xs text-text-secondary">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block font-mono text-2xs text-text-tertiary">
                  message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="What's on your mind?"
                  className={`${fieldClass} resize-none`}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1.5 font-mono text-2xs text-text-secondary">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitState === "error" && errorMessage && (
                <p className="font-mono text-xs text-text-secondary">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="flex items-center gap-2 border border-text-primary bg-text-primary px-5 py-3 font-mono text-sm text-bg-primary transition-colors hover:border-signal hover:bg-signal disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitState === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                    sending
                  </>
                ) : (
                  <>
                    send message
                    <ArrowUpRight size={16} aria-hidden />
                  </>
                )}
              </button>
            </form>
          )}
        </m.div>
      </div>
    </section>
  );
}
