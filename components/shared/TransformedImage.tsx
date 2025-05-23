"use client"
import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

const TransformedImage = ({image,type,title,transformationConfig,isTransforming,setIsTransforming,hasDownload=false}:TransformedImageProps) => {
    const downloadHandler =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();

        download(getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transformationConfig
        }), title)
    }
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex-between'>
            <h3 className='font-bold text-[30px] leading-[140%] text-dark-600'>
                Transformed
            </h3>

            {hasDownload && (
                <button className='font-medium text-[14px] leading-[120%] mt-2 flex items-center gap-2 px-2'
                onClick={downloadHandler}
                >
                    <Image src="/assets/icons/download.svg" 
                    alt="Download"
                    width={24}
                    height={24}
                    className='pb-[6px] cursor-pointer'></Image>
                </button>
            )}
        </div>
            {image?.publicId && transformationConfig?(
                <div className='relative'>
                    <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={image?.publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="h-fit min-h-72 w-full rounded-[10px] border border-dashed bg-purple-100/20 object-cover p-2"
                  onLoad={()=>{
                    setIsTransforming && setIsTransforming(false)
                  }}
                  onError={()=>{
                    debounce(()=>{
                        setIsTransforming && setIsTransforming(false)
                    },8000)()
                  }}
                  {...transformationConfig}
                />

                {isTransforming && (
                    <div className='flex-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-[10px] border bg-dark-700/90'>
                        <Image src="/assets/icons/spinner.svg"
                        alt='spinner'
                        height={50}
                        width={50}/>
                        <p className='text-white/80'>Please Wait...</p>
                    </div>)}    
                </div>
            ):( 
                <div className="flex flex-col items-center justify-center h-full min-h-72 gap-4 rounded-2xl border border-dashed border-purple-300/30 bg-purple-100/10 text-sm font-medium text-dark-500 shadow-inner transition hover:border-purple-400/60 hover:bg-purple-100/20">
  <p className="text-center text-base font-semibold text-purple-800">
    Transformed image
  </p>
</div>
) } 
    </div>
  )
}

export default TransformedImage