import { PromotionsDto } from '@/dtos/Promotions.dto';
import { SettingOptionDto } from '@/dtos/SettingOption.dto';
import { IProductCategoryDto } from '@/dtos/IProductCategory.dto';
import ProductCard from '@/components/organisms/product/card';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import CouponsDto from '@/dtos/Coupons.dto';
import { CouponDetailDto } from '@/dtos/CouponDetail.dto';

type Props = {
  promotion?: PromotionsDto;
  setting?: SettingOptionDto;
};
export default function HomeFlashSale({ promotion, setting }: Props) {
  const endDate = new Date(promotion?.end_date || '');
  return (
    <>
      {endDate?.getTime() > new Date().getTime() && (
        <div
          className={'mt-3 mx-auto p-3 rounded-[10px]'}
          style={{ backgroundColor: setting?.backgroundColor || '#fff' }}
        >
          <div className={'flex justify-between mb-3'}>
            <h3 className={'text-[24px] uppercase font-bold w-max shrink-0'}>
              Flash Sale
            </h3>
          </div>
          <SectionSwiper
            isGrid={true}
            slidesPerView={5}
            spaceBetween={10}
            isUseHeightWrapper={true}
            renderItem={(item: unknown) => {
              const iCoupon = item as CouponsDto;
              const variant = iCoupon?.coupon_details?.[0].variant;
              if (!variant) {
                return;
              }
              return (
                variant.product && (
                  <ProductCard product={variant.product} variant={variant} />
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
