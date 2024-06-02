import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';
import SettingFilter from '@/components/organisms/categoryFilter/settingFilter';
import ContentFilter from '@/components/organisms/categoryFilter/ContentFilter';
import { CategoryFilterProvider } from '@/contexts/categoryFilterContext';

type Props = {
  data: ResponseCategoryFilterPageDto;
};
export default function CategoryTemplate({ data }: Props) {
  return (
    <CategoryFilterProvider>
      <div
        className={
          'rounded-[10px] border-gray-500 bg-white shadow-custom mt-3 grid grid-cols-1 lg:grid-cols-6 gap-3'
        }
      >
        <SettingFilter settings={data.settings} />
        <ContentFilter products={data.products || []} />
      </div>
    </CategoryFilterProvider>
  );
}
