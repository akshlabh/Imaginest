import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/header";
import { getUserImages } from "@/lib/actions/image.actions";
import { getUserById } from "@/lib/actions/user.action";
type searchPar= Promise<{[key: string]: string | string[] | undefined;}>


const Profile = async (props: { params: searchPar }) => {
  // const ans = await searchParams;
  const value = await props.params;
  const page = Number(value?.page) || 1;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id });

  return (
    <>
      <Header title="Profile" />

      <section className="mt-5 flex flex-col gap-5 sm:flex-row md:mt-8 md:gap-10">
        <div className="w-full rounded-[16px] border-2 border-purple-200/20 bg-white p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:(font-medium text-[16px] leading-[140%]) ">CREDITS AVAILABLE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/coins.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-dark-600">{user.creditBalance}</h2>
          </div>
        </div>

        <div className="w-full rounded-[16px] border-2 border-purple-200/20 bg-white p-5 shadow-lg shadow-purple-200/10 md:px-6 md:py-8">
          <p className="font-medium text-[14px] leading-[120%] md:text-[16px] md:leading-[140%]">IMAGE MANIPULATION DONE</p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/assets/icons/photo.svg"
              alt="coins"
              width={50}
              height={50}
              className="size-9 md:size-12"
            />
            <h2 className="text-[30px] font-bold md:text-[36px] leading-[110%] text-dark-600">{images?.data.length}</h2>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-14">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  );
};

export default Profile;