"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MOTION_LEVEL } from "@/lib/motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitStarted = useRef(false);
  const finishStarted = useRef(false);

  useEffect(() => {
    if (document.documentElement.dataset.pl !== "active") return;

    const main = document.querySelector<HTMLElement>("#main");
    const footer = document.querySelector<HTMLElement>("footer");
    if (main) main.setAttribute("inert", "");
    if (footer) footer.setAttribute("inert", "");

    const calm = MOTION_LEVEL === "calm";
    const minimumMs = calm ? 500 : 900;
    const hardCapMs = 3000;
    const startedAt = performance.now();
    let display = 0;
    let target = 0;
    let capReached = false;
    let exited = false;
    let frame = 0;
    let finishTimer = 0;

    const steps = { dom: false, fonts: false, load: false, eager: false };

    const updateTarget = () => {
      target = 0;
      if (steps.dom) target += 25;
      if (steps.fonts) target += 30;
      if (steps.load) target += 35;
      if (steps.eager) target += 10;
    };

    const markStep = (step: keyof typeof steps) => {
      if (steps[step]) return;
      steps[step] = true;
      updateTarget();
    };

    const startExit = () => {
      if (exitStarted.current) return;
      exitStarted.current = true;
      exited = true;
      try {
        sessionStorage.setItem("aa-preloader", "1");
      } catch {}

      document.documentElement.dataset.pl = "done";
      window.dispatchEvent(new Event("preloader:done"));
      setProgress(100);
      setExiting(true);

      finishTimer = window.setTimeout(() => {
        if (finishStarted.current) return;
        finishStarted.current = true;
        if (main) main.removeAttribute("inert");
        if (footer) footer.removeAttribute("inert");
        const overlay = document.getElementById("preloader");
        overlay?.remove();
      }, calm ? 500 : 820);
    };

    const maybeExit = (now: number) => {
      if (exited) return;
      if (capReached) {
        if (now - startedAt >= minimumMs) startExit();
        return;
      }
      if (now - startedAt >= minimumMs && target === 100 && display >= 99.5) startExit();
    };

    const animateProgress = (now: number) => {
      if (!exited) {
        if (!capReached && now - startedAt >= hardCapMs) {
          capReached = true;
          display = 100;
          target = 100;
          setProgress(100);
        } else if (target > display) {
          const delta = (target - display) * 0.18;
          display = Math.min(target, display + Math.min(delta, 25));
          setProgress(Math.floor(display));
        }
        maybeExit(now);
      }
      if (!exited) frame = requestAnimationFrame(animateProgress);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => markStep("dom"), { once: true });
    } else {
      markStep("dom");
    }

    Promise.resolve(document.fonts.ready).then(() => markStep("fonts"));

    if (document.readyState === "complete") {
      markStep("load");
    } else {
      window.addEventListener("load", () => markStep("load"), { once: true });
    }

    const eagerImage = document.querySelector<HTMLImageElement>("#main img[loading='eager'], #main img[fetchpriority='high']");

    if (eagerImage) {
      const markEagerDecoded = () => markStep("eager");
      if (eagerImage.complete) {
        eagerImage.decode ? eagerImage.decode().then(markEagerDecoded).catch(markEagerDecoded) : markEagerDecoded();
      } else {
        eagerImage.addEventListener("load", () => {
          if (eagerImage.decode) eagerImage.decode().then(markEagerDecoded).catch(markEagerDecoded);
          else markEagerDecoded();
        }, { once: true });
      }
    } else {
      const markNoEagerImage = () => markStep("eager");
      if (document.readyState === "complete") markNoEagerImage();
      else window.addEventListener("load", markNoEagerImage, { once: true });
    }

    frame = requestAnimationFrame(animateProgress);
    updateTarget();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
      if (!exited && main) main.removeAttribute("inert");
      if (!exited && footer) footer.removeAttribute("inert");
    };
  }, []);

  return (
    <div
      id="preloader"
      role="status"
      aria-live="polite"
      className={exiting ? `aa-preloader aa-preloader-exiting${MOTION_LEVEL === "calm" ? " aa-preloader-calm" : ""}` : "aa-preloader"}
    >
      <span className="sr-only">Loading</span>
      <div aria-hidden="true" className="aa-preloader-red" />
      <div aria-hidden="true" className="aa-preloader-white">
        <div className="aa-preloader-brand">
          <div className="aa-preloader-logo">
            <Image
              src="/logo.png"
              alt=""
              width={104}
              height={104}
              priority
              sizes="(max-width: 639px) 88px, 104px"
              className="rounded-2xl object-contain"
              style={{ boxShadow: "0 12px 32px -12px rgb(11 11 11 / .18)" }}
            />
          </div>
          <div className="aa-preloader-wordmark font-display">
            <span>Amader</span> <span>Agency</span>
          </div>
          <div className="aa-preloader-track" aria-hidden="true">
            <div className="aa-preloader-fill" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
        </div>
        <div className="aa-preloader-counter" aria-hidden="true">
          {progress}<span>%</span>
        </div>
        <div className="aa-preloader-label" aria-hidden="true">Loading experience</div>
      </div>
    </div>
  );
}
