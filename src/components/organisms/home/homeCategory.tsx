import { StaticComponentDto } from '@/dtos/StaticComponent.dto';
import GroupCategory from '@/components/organisms/groupCategory';
import BannerUnderCategory from '@/components/organisms/home/bannerUnderCategory';
import { Fragment, useEffect, useState } from 'react';
import { StaticContentsDto } from '@/dtos/StaticContents.dto';
import HomeFeatureCategory from '@/components/organisms/home/homeFeatureCategory';
import { SETTING_KEY } from '@/config/enum';
import { SettingOptionDto } from '@/dtos/SettingOption.dto';

const HomeCategory = ({
  homeCategory,
  bannerUnderCategory,
  homeBlockFeaturedCategory,
  settingsHome
}: {
  homeBlockFeaturedCategory?: StaticContentsDto[];
  homeCategory: StaticComponentDto[];
  bannerUnderCategory?: StaticComponentDto[];
  settingsHome: Record<string, SettingOptionDto | undefined>;
}) => {

  const [blockContents, setBlockContents] = useState<Map<number | undefined, StaticComponentDto[]>>(new Map());



  useEffect(()=>{

    const contents = Map.groupBy(bannerUnderCategory, (item)=> item.properties?.position_index);
    setBlockContents(contents)
  },[])
  return (
    <>
      {(homeCategory || []).map((item: StaticComponentDto, key: number) => {
        const position =key % 4 === 0 ? key / 4 : null;
        return (
          <Fragment key={'GroupCategory_' + key}>
            {
              position !== null && <BannerUnderCategory
                key={key + 'banner-under-category'}
                contents={blockContents.get(position) || []}
              />
            }
            {position === 0 && homeBlockFeaturedCategory && (
              <HomeFeatureCategory
                contents={homeBlockFeaturedCategory || []}
                setting={settingsHome[SETTING_KEY.FEATURE_CATEGORY.KEY]}
              />
            )}
            <GroupCategory staticComponent={item} />
          </Fragment>
        );
      })}
    </>
  );
};
export default HomeCategory;
