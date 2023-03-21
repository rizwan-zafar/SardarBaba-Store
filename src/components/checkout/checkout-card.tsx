import Link from 'next/link';
import React from 'react';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';
// import { useRouter } from "next/router";
const CheckoutCard: React.FC = () => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty } = useCart();
  const [email,setEmail]=React.useState('')
  const [phone,setPhone]=React.useState('')
  const [address,setAddress]=React.useState('')
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  });

  const baseURL= process.env.NEXT_PUBLIC_REST_API_ENDPOINT;
  async function orderHeader(e:any) {
    e.preventDefault()
    const deliveryAddress={
      email:email,
      phone:phone,
      address:address
    }
    const data={
      cart:items,
      deliveryAddress:deliveryAddress,
      subTotal:total,
      status:'Pending'
    }
 

    const requestBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
    try {
      
      let res = await fetch(baseURL+"/order/add", requestBody);
      let resJson = await res.json();
      if (res.status === 201) {
          alert("Order Placed  Successfully")
          !isEmpty && Router.push({
            pathname: ROUTES.ORDER,
            query: { _id:resJson._id}
        });
          return resJson;
      } else {
          alert("Something Went To Wrong")
      }
  } catch (err) {
      console.log("Error" + err);
  }
  }









  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: '$0',
    },
    {
      id: 3,
      name: t('text-total'),
      price: subtotal,
    },
  ];
  return (
    <>
 
      <div className="px-4 py-1 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
 <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={orderHeader}>

    <div className="mb-12">
      <label className="block text-gray-700 text-sm font-bold mb-2"  >
        Email
      </label>
      <input  onChange={(e) => setEmail(e.target.value)} value={email} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="example@gmail.com" />
    </div>
    <div className="mb-12">
      <label className="block text-gray-700 text-sm font-bold mb-2"  >
        Phone Number
      </label>
      <input onChange={(e) => setPhone(e.target.value)} value={phone} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="03...." />
    </div>

   
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Address</label>
    <textarea onChange={(e) => setAddress(e.target.value)} value={address} required id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here your shipping address. . . "></textarea>

    <div className="w-full max-w-xs">  
    <p className="text-center text-gray-500 text-xs">
      &copy;2020 Acme Corp. All rights reserved.
    </p>
    </div>
           
  
        <Button
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-brand text-brand-light rounded font-semibold px-4 py-3 transition-all ${
            isEmpty && 'opacity-40 cursor-not-allowed'
          }`}
        >
          {t('button-order-now')}
        </Button>
        </form>
       {/* form */}
       {/* end form */}
      </div>


      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS}>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY}>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
     
    </>
  );
};

export default CheckoutCard;
