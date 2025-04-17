import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/TransformationForm'
import { transformationTypes } from '@/constants'

interface SearchParamProps {
  params: {
    type: keyof typeof transformationTypes
  }
}

const AddTransformationTypePage = ({ params }: SearchParamProps) => {
  const transformation = transformationTypes[params.type]

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
