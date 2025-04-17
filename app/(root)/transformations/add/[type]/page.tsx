import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/TransformationForm'
import { transformationTypes } from '@/constants'

type TransformationTypeKey = keyof typeof transformationTypes;

interface PageProps {
  params: {
    type: TransformationTypeKey;
  };
}

const AddTransformationTypePage = ({ params }: PageProps) => {
  const transformation = transformationTypes[params.type];

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
      <TransformationForm />
    </>
  );
};

export default AddTransformationTypePage;
