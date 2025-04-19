// "use client"
import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { getAllImages } from "@/lib/actions/image.actions"
// searchParams: {
//   [key: string]: string | string[] | undefined;
// }
type searchPar= Promise<{[key: string]: string | string[] | undefined;}>
const Home = async (props: { params: searchPar }) => {
  const value = await props.params;

  const page = Number(value?.page) || 1;
  const searchQuery = (value?.query as string )||"";
  const images = await getAllImages({ page, searchQuery})
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-10 rounded-[20px] border bg-[url('/assets/images/banner-bg.png')] bg-cover bg-center bg-no-repeat p-10 shadow-inner sm:p-16">
        <h1 className="text-[32px] sm:text-[44px] font-semibold leading-tight text-center text-white shadow-md max-w-xl">
          Unleash Your Creative Vision with Imaginest
        </h1>

        <ul className="flex flex-wrap items-center justify-center gap-10">
          {navLinks.slice(1, 5).map((link) => (
            <li key={link.route}>
              <Link href={link.route} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-full bg-white p-4">
                  <Image src={link.icon} alt="nav icon" width={24} height={24} />
                </div>
                <p className="text-white text-sm sm:text-base text-center">{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>


      <section className="sm:mt-12">
          <Collection
            hasSearch={true}
            images={images?.data}
            totalPages={images?.totalPage}
            page={page}
          ></Collection>
      </section>
    </>
  )
}

export default Home
