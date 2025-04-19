"use client";

import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { toast } from "sonner";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}: MediaUploaderProps) => {
  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url
    }));

    onValueChange(result?.info?.public_id);

    toast.message("Image Successfully Uploaded", {
      description: "One Credit deducted"
    });
  };

  const onUploadErrorHandler = () => {
    toast.message("Image Uploading failed!", {
      description: "Please try again."
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="Imaginest"
      options={{
        multiple: false,
        resourceType: "image"
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-dark-800">Original</h3>

          {publicId ? (
            <div className="overflow-hidden rounded-2xl border border-purple-300/30 bg-purple-100/10 transition-transform hover:scale-[1.01] hover:shadow-lg">
              <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}
                alt="Uploaded image"
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder={dataUrl as PlaceholderValue}
                className="w-full object-cover transition duration-300"
              />
            </div>
          ) : (
            <div
              onClick={() => open()}
              className="group flex h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-purple-300/30 bg-purple-50/10 hover:border-purple-400/60 hover:bg-purple-100/20 transition-all duration-200 shadow-inner"
            >
              <div className="rounded-full bg-white p-4 shadow-md transition group-hover:scale-105">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-sm font-medium text-dark-500 group-hover:text-purple-700">
                Click here to upload image
              </p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
