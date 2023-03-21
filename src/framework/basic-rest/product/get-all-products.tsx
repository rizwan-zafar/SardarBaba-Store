import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
 
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};

const filterData = ({ data }: any, brand: any, category: any) => {
  var filteredBrandData: any;

  if (brand || category) {


    let params: any;
    if (!category) {


      params = brand ? brand.split(",") : null;

      filteredBrandData = data ? data.filter(function (item: any) {
        for (let i = 0; i < params.length; i++) {
          if (item.brand === params[i]) {
            return item;
          }
        }

      }) : "";
    }



    if (!brand) {
      category = category.hasOwnProperty("limit") ? null : category
      params = category ? category.split(",") : null;
      filteredBrandData = data ? data.filter(function (item: any) {
        for (let i = 0; i < params.length; i++) {
          if (item.category === params[i]) {
            return item;
          }
        }

      }) : "";
    }




    if (category && brand) {

      const brands = brand ? brand.split(",") : null;
      category = category.hasOwnProperty("limit") ? null : category
      const categories = category ? category.split(",") : null;
      filteredBrandData = data ? data.filter(function (item: any) {
        for (let i = 0; i < brands.length; i++) {
          if (item.brand === brands[i]) {
            for (let j = 0; j < categories.length; j++) {
              if (item.category === categories[j]) {

                return item;
              }
            }

          }
        }

      }) : "";


    }

  }

  return filteredBrandData

}
const fetchProducts = async ({ queryKey }: any) => {
  const [brand, category, _params] = queryKey;
  const allProducts = await http.get(API_ENDPOINTS.PRODUCTS);

  let data;
  if (brand || category) {
    
    if ( brand == null && category?category.charAt(0) === "1":null ) {
       data = allProducts ? allProducts.data.filter((items: any) => {
        return "1" + items.parent.replace(/[^a-zA-Z0-9 ]/g, "")
          .replace(/[^A-Z0-9]/gi, "-")
          .replace(/[^A-Z0-9]/gi, " ")
          .replace(/ {1,2}/gi, "-")
          .toLowerCase() === category;
      }) : ""

    }else{
      data = filterData(allProducts ? allProducts : null, brand, category)
    }
   
  }
  else {
    data = allProducts.data

  }



  return {
    data: shuffle(data) as Product[],
    paginatorInfo: {
      nextPageUrl: '',
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  const { limit, brand, category } = options
  useEffect(() => {

  }, [options])

  return useInfiniteQuery<PaginatedProduct, Error>(
    [brand, category, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
