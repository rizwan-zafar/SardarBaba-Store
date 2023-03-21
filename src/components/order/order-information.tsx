import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useTranslation } from 'next-i18next';
import { useEffect,useState } from "react";
import { useRouter } from 'next/router';
// import { useOrderQuery } from '@framework/order/get-order';
// import usePrice from '@framework/product/use-price';
 

export default function OrderInformation(_id:any) {
  const router = useRouter();
  const [placedOrder,setPlacedOrder]=useState("");
  async function getSubmittedOrder(_id:any)
  {
    const baseURL= process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

    try {
      
      let res = await fetch(baseURL+"/order/"+_id);
      let resJson = await res.json();
      if (resJson) {
        setPlacedOrder(resJson)
      } else {
          alert("Something Went To Wrong")
      }
  } catch (err) {
      console.log("Error" + err);
  }
  }
  useEffect(() => {

      if(!router.isReady) return;
      if(router.query._id)
      {
        getSubmittedOrder(router.query._id)
      }

    }, [router.query.data]);
  const { t } = useTranslation('common');
  if (placedOrder==="") return <p>Loading...</p>;
  return (
    <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
      <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-fill-secondary lg:px-5 text-brand-dark md:text-base lg:mb-8">
        <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-brand bg-opacity-20 shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-brand" />
        </span>
        {t('text-order-received')}
      </div>

      

      <OrderDetails OrderInfo={placedOrder} />
    </div>
  );
}
