"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { Search } from "./Search";
import { Suspense } from "react";

export const Collection = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-purple-900">
          Recent Edits
        </h2>
        {hasSearch && (
          <Suspense fallback={<div className="text-sm text-gray-500">Loading search...</div>}>
            <Search />
          </Suspense>
        )}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={String(image._id)} />
          ))}
        </ul>
      ) : (
        <div className="flex-center h-60 w-full rounded-xl border border-gray-300 bg-white/40 text-center">
          <p className="text-lg font-semibold text-gray-600">No images found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent className="flex w-full items-center justify-between gap-4">
            <Button
              disabled={Number(page) <= 1}
              className="rounded-full bg-purple-500 px-6 py-3 text-white transition hover:bg-purple-600 disabled:opacity-50"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:text-white" />
              <span className="ml-2 text-sm">Previous</span>
            </Button>

            <p className="text-base font-medium text-gray-700">
              Page {page} of {totalPages}
            </p>

            <Button
              className="rounded-full bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-700 disabled:opacity-50"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <span className="mr-2 text-sm">Next</span>
              <PaginationNext className="hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  return (
    <li>
      <Link
        href={`/transformations/${image._id}`}
        className="group flex flex-col gap-4 rounded-2xl border border-purple-200 bg-white p-4 shadow-lg transition-all hover:shadow-xl hover:border-purple-300"
      >
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="h-52 w-full rounded-lg object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />

        <div className="flex items-center justify-between">
          <p className="line-clamp-1 text-lg font-semibold text-gray-800">
            {image.title}
          </p>
          <Image
            src={`/assets/icons/${
              transformationTypes[
                image.transformationType as TransformationTypeKey
              ].icon
            }`}
            alt={image.title}
            width={24}
            height={24}
          />
        </div>
      </Link>
    </li>
  );
};
