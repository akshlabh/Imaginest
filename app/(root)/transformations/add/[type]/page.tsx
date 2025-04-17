import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'

type Params = Promise<{ id:string,type: TransformationTypeKey }>
const AddTransformationTypePage = async (props: { params: Params }) => {
  // const xxx= await type;
  const params = await props.params;
  const index = params.type;
  const transformation = transformationTypes[index];
 

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

