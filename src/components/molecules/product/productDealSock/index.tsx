import { PromotionsDto } from '@/dtos/Promotions.dto';
import CouponsDto from '@/dtos/Coupons.dto';
import { getPriceWithCoupon } from '@/utils';
import ProductCard from '@/components/organisms/product/card';
import SectionSwiper from '@/components/organisms/sectionSwiper';

type Props = {
  promotion: PromotionsDto;
};
export default function ProductDealSock({ promotion }: Props) {
  return (
    <div className={'w-full shadow-custom bg-white my-3 p-3'}>
      <h3 className={'text-2xl font-bold text-primary mb-3'}>
        MUA VỚI GIÁ ĐẶC BIỆT
      </h3>
      <SectionSwiper
        slidesPerView={5}
        spaceBetween={10}
        renderItem={(item: unknown) => {
          const iCoupon = item as CouponsDto;
          const variant = iCoupon?.coupon_details?.[0].variant;
          if (!variant || !variant.regular_price) {
            return;
          }

          const newPrice = getPriceWithCoupon(
            variant.regular_price || 0,
            iCoupon,
          );
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
  );
}
