import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import GroupCategory from '@/components/organisms/groupCategory';
import BannerUnderCategory from '@/components/organisms/home/bannerUnderCategory';

const HomeCategory = ({
  homeCategory,
  bannerUnderCategory,
}: {
  homeCategory: StaticComponentDto[];
  bannerUnderCategory?: StaticComponentDto[];
}) => {
  return (
    <>
      {(homeCategory || []).map((item: StaticComponentDto, key: number) => {
        return (
          <>
            <GroupCategory key={key} staticComponent={item} />
            {(key + 1) % 3 === 0 && (
              <BannerUnderCategory
                key={key + 'banner-under-category'}
                contents={bannerUnderCategory || []}
                position={(key + 1) / 3}
              />
            )}
          </>
        );
      })}
    </>
  );
};
export default HomeCategory;
