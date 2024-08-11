import { ResponseProductDetailPageDto } from '@/dtos/responseProductDetailPage.dto';
import ProductDetailCard from '@/components/organisms/product/detailCard';
import { Suspense, useContext, useEffect, useState } from 'react';
import { SettingsDto } from '@/dtos/Settings.dto';
import AppContext from '@/contexts/appContext';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { generateSlugToHref } from '@/utils';
import { Entity } from '@/config/enum';
import { SlugDto } from '@/dtos/Slug.dto';
import { ProductDto } from '@/dtos/Product.dto';

export async function getStaticProps() {
  const res = await fetch('/api/pages/products/all');
  const data: { data: ProductDto } = await res.json();

  return {
    props: {
      product: data?.data || null,
    },
    revalidate: 60, // In seconds
  };
}
export async function getStaticPaths() {
  const res = await fetch(
    process.env.BE_URL + '/api/pages/slug/list/' + Entity.PRODUCTS,
  );
  const data: { data: SlugDto[] } = await res.json();

  const paths = (data?.data || []).map((post) => ({
    params: { slug: post.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}
const ProductTemplate = ({ product }: { product: ProductDto }) => {
  return (
    <>
      {/*<BreadcrumbComponent*/}
      {/*  label={'Sản phẩm'}*/}
      {/*  link={'/san-pham'}*/}
      {/*  current={{*/}
      {/*    label: data?.product?.name || '',*/}
      {/*    link: generateSlugToHref(data?.product?.slugs?.slug),*/}
      {/*  }}*/}
      {/*/>*/}
      {/*{data?.product && (*/}
      {/*  <ProductDetailCard*/}
      {/*    product={data.product}*/}
      {/*    relatedProducts={data?.relatedProducts || []}*/}
      {/*    productConfigurations={data?.productConfigurations || []}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};
export default ProductTemplate;
