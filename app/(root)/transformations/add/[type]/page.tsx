import Header from '@/components/shared/header'
// import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'


const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {

  const transformation = transformationTypes[type];


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