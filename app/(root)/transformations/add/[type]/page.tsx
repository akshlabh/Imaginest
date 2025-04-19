import Header from '@/components/shared/header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type Params = Promise<{ id:string,type: TransformationTypeKey }>

const AddTransformationTypePage = async (props: { params: Params }) => {
  const { userId } = await auth();
  const params = await props.params;
  const index = params.type;
  const transformation = transformationTypes[index];

  if(!userId) redirect('/sign-in')
  const user = await getUserById(userId);

  // const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    {/* <section></section> */}
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage