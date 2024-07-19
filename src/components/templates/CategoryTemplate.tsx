import SettingFilter from '@/components/organisms/categoryFilter/settingFilter';
import ContentFilter from '@/components/organisms/categoryFilter/ContentFilter';
import { CategoryFilterProvider } from '@/contexts/categoryFilterContext';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';
import { SlugDto } from '@/dtos/Slug.dto';

type Props = {
  slug: ResponseSlugPageDto<ResponseCategoryFilterPageDto>;
};
export default function CategoryTemplate({ slug }: Props) {
  const data = slug.data as ResponseCategoryFilterPageDto;
  return (
    <CategoryFilterProvider>
      <div
        className={
          'rounded-[10px] border-gray-500 bg-white shadow-custom grid grid-cols-1 lg:grid-cols-6 gap-3'
        }
      >
        <SettingFilter settings={data.settings} />
        <ContentFilter products={data.products || []} settings={data.settings} total={data?.total || 0} slugData={new SlugDto({
          model: slug.model,
          model_id: slug.model_id,
          slug: slug.slug,
        })}/>
      </div>
    </CategoryFilterProvider>
  );
}
