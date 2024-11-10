import { PromotionsDto } from '@/dtos/Promotions.dto';
import { SettingOptionDto } from '@/dtos/SettingOption.dto';
import ProductCard from '@/components/organisms/product/card';
import SectionSwiper from '@/components/organisms/sectionSwiper';
import CouponsDto from '@/dtos/Coupons.dto';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isDesktop, isMobile } from 'react-device-detect';
const CountdownContainer = dynamic(
  () => import('@/components/organisms/home/homeFlashSale/countdownContainer'),
  {
    ssr: false,
  },
);
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
          className={'mt-3 mx-auto p-1 lg:p-3 rounded-[10px]'}
          style={{ backgroundColor: setting?.backgroundColor || '#fff' }}
        >
          <div
            className={
              'flex justify-end mb-3 items-center h-[80px] lg:h-[120px] w-full relative px-3'
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
            {isDesktop && (
              <CountdownContainer className={'relative'} endDate={endDate} />
            )}
          </div>
          {isMobile && (
            <CountdownContainer
              className={'flex gap-3 mb-3 items-center justify-center'}
              endDate={endDate}
            />
          )}
          <SectionSwiper
            slidesPerView={5}
            spaceBetween={10}
            auto={true}
            renderItem={(item: unknown) => {
              const coupon = item as CouponsDto;
              const variant = coupon?.coupon_details?.[0].variant;
              if (!variant || !variant.regular_price) {
                return;
              }

              return (
                variant.product && (
                  <ProductCard
                    product={variant.product}
                    variant={
                      {
                        ...variant,
                        ...{ coupon },
                      } as any
                    }
                    promotions={promotion && [promotion]}
                    coupon={coupon}
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
