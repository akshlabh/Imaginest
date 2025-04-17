import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'

const AddTransformationTypePage = async (props: SearchParamProps) => {
  const { type } = await props.params;

  const transformation = transformationTypes[type];

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <TransformationForm />
    </>
  )
}

export default AddTransformationTypePage
