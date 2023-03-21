import { useOrderQuery } from '@framework/order/get-order';
import usePrice from '@framework/product/use-price';
import { OrderItem } from '@framework/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import {useEffect,useState} from "react"


const OrderItemCard = ({ product }: { product: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'USD',
  });
  return (
    <tr
      className="font-normal border-b border-border-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};

interface Props {
  OrderInfo:any
}
const OrderDetails: React.FC<Props> = ({OrderInfo}) => {
  const { t } = useTranslation('common');
  const {
    query: { id },
  } = useRouter();
  const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.total,
      currencyCode: 'USD',
    }
  );
  const { price: total } = usePrice(
    order && {
      amount: order.shipping_fee
        ? order.total + order.shipping_fee
        : order.total,
      currencyCode: 'USD',
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping_fee,
      currencyCode: 'USD',
    }
  );

  const [placedOrderData,setPlacedOrderData]=useState<any>();
  useEffect(() => {
    if(OrderInfo)
    {
      setPlacedOrderData(OrderInfo)
    }
  }, [])
 
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
     

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
                 
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                   Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Item Total Price
                </th>
            </tr>
        </thead>
        <tbody>
          {placedOrderData.cart?placedOrderData.cart.map((item:any)=>{
return(
  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <th scope="row" className="px-6 py-4">
      {item.name}
  </th>
  <td className="px-6 py-4">
      <img src={item.image} alt="Product Image" width="40vh"/>
  </td>
  <td className="px-6 py-4">
      {item.quantity}
  </td>
  <td className="px-6 py-4">
      {item.price+".00 PKR"}
  </td>
  <td className="px-6 py-4">
     {item.itemTotal+".00 PKR"}
  </td>
</tr>
)

          }):""}
         <tr> 
         <th scope="col" className="px-6 py-3">Total Bill</th>
          <td className="px-6 py-4"></td>
          <td className="px-6 py-4"></td>
          <td className="px-6 py-4"></td>
          <th scope="col" className="px-6 py-3"><b>{placedOrderData.subTotal+".00 PKR"}</b></th>
          </tr>   
         
        </tbody>
    </table>
</div>


     
    {/* table */}
    <div className="pt-10 lg:pt-12">
      <Heading variant="heading" className="mb-6 xl:mb-7">
        Shipping Details:
      </Heading>
      <table className="w-full text-sm font-semibold text-brand-dark lg:text-base">
        <tfoot>
        <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Your Email:</td>
            <td className="p-4">{placedOrderData.deliveryAddress.email}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Contact Number:</td>
            <td className="p-4">{placedOrderData.deliveryAddress.phone}</td>
          </tr>
       
        
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Shipping Address:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">
               {placedOrderData.deliveryAddress.address}
              </span>
            </td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-shipping')+" cost"}:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">
               0.00
              </span>
            </td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-payment-method')}:</td>
            <td className="p-4">Home Delivery</td>
            {/* <td className="p-4">{order?.payment_gateway}</td> */}
          </tr>
          
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-sub-total')}:</td>
            <td className="p-4">{placedOrderData.subTotal+".00 PKR"}</td>
          </tr>
        </tfoot> 
      </table>
    </div>
    </>
  );
};

export default OrderDetails;
