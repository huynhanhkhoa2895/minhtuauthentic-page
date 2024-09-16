import { PromotionsDto } from '@/dtos/Promotions.dto';
import CouponsDto from '@/dtos/Coupons.dto';
import { getPriceWithCoupon } from '@/utils';
import ProductCard from '@/components/organisms/product/card';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import { Suspense, useEffect, useState } from 'react';
import useSWR from 'swr';
import { PROMOTION_TYPE } from '@/config/enum';

const fetcher = () =>
  fetch('/api/promotions/' + PROMOTION_TYPE.DEAL_SOCK, {
    method: 'GET',
  }).then((res) => res.json());
export default function ProductDealSock() {
  const { data, error } = useSWR(
    '/api/promotions/' + PROMOTION_TYPE.DEAL_SOCK,
    fetcher,
  );

  const [promotion, setPromotion] = useState<PromotionsDto>();
  useEffect(() => {
    setPromotion(data?.data);
  }, [data]);
  return (
    <>
      {promotion && (
        <div className={'w-full shadow-custom bg-white my-3 p-3'}>
          <h3 className={'text-2xl font-bold text-primary mb-3'}>
            MUA VỚI GIÁ ĐẶC BIỆT
          </h3>
          <SectionSwiper
            slidesPerView={5}
            slidesPerViewMobile={1}
            spaceBetween={10}
            renderItem={(item: unknown) => {
              const iCoupon = item as CouponsDto;
              const variant = iCoupon?.coupon_details?.[0].variant;
              if (!variant || !variant.regular_price) {
                return;
              }

              return (
                variant.product && (
                  <ProductCard
                    product={variant.product}
                    variant={{
                      ...variant,
                      ...{ coupon: iCoupon },
                    }}
                    promotions={promotion && [promotion]}
                    coupon={iCoupon}
                    addText={'Chọn sản phẩm'}
                    isShowConfiguration
                  />
                )
              );
            }}
            data={
              promotion?.coupons?.filter(
                (item: CouponsDto) => item?.coupon_details?.[0],
              ) || []
            }
          />
        </div>
      )}
    </>
  );
}
