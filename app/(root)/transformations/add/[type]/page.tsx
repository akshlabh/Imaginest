import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'


const AddTransformationTypePage = async ({ params}: SearchParamProps) => {
  const xxx= await params;
  const transformation = transformationTypes[xxx.type];
 

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
 
    </>
  )
}

export default AddTransformationTypePage

