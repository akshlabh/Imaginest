import { Suspense } from "react";
import { Collection } from "@/components/shared/Collection";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { getAllImages } from "@/lib/actions/image.actions";

type searchPar = Promise<{ [key: string]: string | string[] | undefined }>;

const Home = async (props: { params: searchPar }) => {
  const value = await props.params;

  const page = Number(value?.page) || 1;
  const searchQuery = (value?.query as string) || "";
  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-10 rounded-3xl border border-purple-200 bg-[url('/assets/images/banner-bg.png')] bg-cover bg-center bg-no-repeat px-6 py-16 shadow-lg sm:px-20 sm:py-24 transition-all duration-300">
        <h1 className="max-w-3xl text-center text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl">
        Elevate Your Creative Journey with Imaginest
        </h1>

        <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {navLinks.slice(1, 5).map((link) => (
            <li key={link.route}>
              <Link
                href={link.route}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-center justify-center rounded-full bg-white p-4 shadow-md hover:shadow-purple-300 transition-shadow">
                  <Image src={link.icon} alt="nav icon" width={24} height={24} />
                </div>
                <p className="text-center text-sm font-medium text-white sm:text-base">
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 sm:mt-16 px-4 sm:px-8">
        <Suspense fallback={<div className="text-center text-purple-600">Loading collection...</div>}>
          <Collection
            hasSearch={true}
            images={images?.data}
            totalPages={images?.totalPage}
            page={page}
          />
        </Suspense>
      </section>
    </>
  );
};

export default Home;
