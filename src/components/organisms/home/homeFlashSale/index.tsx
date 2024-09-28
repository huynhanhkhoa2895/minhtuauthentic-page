import { PromotionsDto } from '@/dtos/Promotions.dto';
import { SettingOptionDto } from '@/dtos/SettingOption.dto';
import ProductCard from '@/components/organisms/product/card';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import CouponsDto from '@/dtos/Coupons.dto';
import Countdown from '@/components/organisms/home/homeFlashSale/countdown';
import { getPriceWithCoupon } from '@/utils';
import Image from 'next/image';
type Props = {
  promotion?: PromotionsDto;
  setting?: SettingOptionDto;
};
export default function HomeFlashSale({ promotion, setting }: Props) {
  const endDate: Date = new Date(promotion?.end_date || '');

  return (
    <>
      {endDate?.getTime() > new Date().getTime() && (
        <div
          className={'mt-3 mx-auto p-3 rounded-[10px]'}
          style={{ backgroundColor: setting?.backgroundColor || '#fff' }}
        >
          <div
            className={
              'flex justify-end mb-3 items-center lg:h-[120px] w-full relative px-3'
            }
          >
            {promotion?.images?.[0]?.image?.url && (
              <Image
                src={promotion?.images?.[0]?.image?.url || ''}
                className={'object-cover w-full h-full'}
                alt={'Khuyến mãi flash sale'}
                fill
              />
            )}

            <Countdown className={'relative'} end_date={endDate} />
          </div>
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
                    variant={
                      {
                        ...variant,
                        ...{ regular_price: newPrice, coupon: iCoupon },
                      } as any
                    }
                    promotions={promotion && [promotion]}
                    coupon={iCoupon}
                    isShowConfiguration
                  />
                )
              );
            }}
            data={
              (promotion?.coupons || [])?.filter(
                (item: CouponsDto) => item?.coupon_details?.[0],
              ) || []
            }
          />
        </div>
      )}
    </>
  );
}
