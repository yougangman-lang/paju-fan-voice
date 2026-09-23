import fs from "node:fs";
import path from "node:path";
import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

/** True when the file exists under /public at build/render time. */
export function publicFileExists(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
  } catch {
    return false;
  }
}

type SmartImageProps = Omit<ImageProps, "src" | "alt" | "fill"> & {
  src: string;
  alt: string;
  /** Rendered instead of the photo when the file is not in /public yet */
  fallback?: ReactNode;
  tone?: string;
};

/**
 * next/image with `fill` that degrades to a CSS placeholder when the
 * source file is missing, so the build never depends on optional photos.
 * Parent must be `relative` with a defined size.
 */
export default function SmartImage({ src, alt, fallback, tone, className, ...rest }: SmartImageProps) {
  if (!publicFileExists(src)) {
    return (
      fallback ?? (
        <div
          role="img"
          aria-label={alt}
          className="placeholder-stripes absolute inset-0 flex items-end p-4"
          style={{ backgroundColor: tone ?? "#E4DDCB" }}
        >
          <span className="font-mono text-[11px] leading-tight text-ink/50">{src}</span>
        </div>
      )
    );
  }
  return <Image src={src} alt={alt} fill className={className} {...rest} />;
}
