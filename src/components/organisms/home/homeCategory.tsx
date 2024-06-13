import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import GroupCategory from '@/components/organisms/groupCategory';
import BannerUnderCategory from '@/components/organisms/home/bannerUnderCategory';
import { Fragment } from 'react';

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
          <Fragment key={'GroupCategory_' + key}>
            <GroupCategory staticComponent={item} />
            {(key + 1) % 3 === 0 && (
              <BannerUnderCategory
                key={key + 'banner-under-category'}
                contents={bannerUnderCategory || []}
                position={(key + 1) / 3}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};
export default HomeCategory;
