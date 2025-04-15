import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";
import { aspectRatioOptions } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR HANDLER
export const handleError = (error: unknown): never => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// SHIMMER PLACEHOLDER
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

// URL QUERY HELPERS
interface FormUrlQueryParams {
  searchParams: URLSearchParams;
  key: string;
  value: string | number | boolean | null;
}

export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };
  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

interface RemoveUrlQueryParams {
  searchParams: string;
  keysToRemove: string[];
}

export function removeKeysFromQuery({
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  Object.keys(currentUrl).forEach(
    (key) =>
      (currentUrl as Record<string, unknown>)[key] == null &&
      delete (currentUrl as Record<string, unknown>)[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

// DEBOUNCE
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// GET IMAGE SIZE
export type AspectRatioKey = keyof typeof aspectRatioOptions;

interface ImageProps {
  aspectRatio?: AspectRatioKey;
  width?: number;
  height?: number;
}

export const getImageSize = (
  type: string,
  image: ImageProps,
  dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// DOWNLOAD IMAGE
export const download = (url: string, filename: string): void => {
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(" ", "_")}.png`;

      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => console.log({ error }));
};

// DEEP MERGE OBJECTS
export const deepMergeObjects = <T extends object>(
  obj1: Partial<T>,
  obj2: Partial<T> | null | undefined
): T => {
  if (obj2 === null || obj2 === undefined) {
    return obj1 as T;
  }

  const output: Partial<T> = { ...obj2 };

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (
        typeof val1 === "object" &&
        val1 !== null &&
        typeof val2 === "object" &&
        val2 !== null
      ) {
        (output as any)[key] = deepMergeObjects(val1 as object, val2 as object);
      } else {
        (output as any)[key] = val1;
      }
    }
  }

  return output as T;
};
