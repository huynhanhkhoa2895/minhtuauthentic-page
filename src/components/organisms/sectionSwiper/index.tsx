import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';
const SectionSwiperItem = dynamic(
  () => import('@/components/organisms/sectionSwiper/item'),
  { ssr: false },
);
import { isDesktop, isMobile } from 'react-device-detect';
import { SwiperProps } from '@/components/organisms/sectionSwiper/item';

type Props = {
  slidePerViewMobile?: number;
  slidePerView?: number;
  spaceBetween?: number;
  spaceBetweenMobile?: number;
} & SwiperProps;
const SectionSwiper = (props: Props) => {
  return (
    <>
      {isMobile && (
        <SectionSwiperItem
          {...props}
          slidesPerView={props.slidePerViewMobile || 2}
          spaceBetween={props.spaceBetweenMobile || 5}
        />
      )}
      {isDesktop && (
        <SectionSwiperItem
          {...props}
          slidesPerView={props.slidePerView || 10}
          spaceBetween={props.spaceBetween || 10}
        />
      )}
    </>
  );
};
export default SectionSwiper;
