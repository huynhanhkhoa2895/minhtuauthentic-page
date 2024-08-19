import SettingFilter from '@/components/organisms/categoryFilter/settingFilter';
import ContentFilter from '@/components/organisms/categoryFilter/ContentFilter';
import { CategoryFilterProvider } from '@/contexts/categoryFilterContext';
import { ResponseSlugPageDto } from '@/dtos/responseSlugPage.dto';
import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';
import { SlugDto } from '@/dtos/Slug.dto';
import { generateSlugToHref } from '@/utils';
import BreadcrumbComponent from '@/components/molecules/breakcrumb';
import { Entity } from '@/config/enum';

type Props = {
  slug?: ResponseSlugPageDto<ResponseCategoryFilterPageDto>;
  breadcrumb?: {
    label: string;
    link: string;
  };
};
export default function CategoryTemplate({ slug, breadcrumb }: Props) {
  const data = slug?.data as ResponseCategoryFilterPageDto;
  const renderLabelBreadcrumb: Record<string, string> = {
    [Entity.CATEGORIES]: 'Danh mục',
    [Entity.BRANDS]: 'Nhãn hiệu',
    [Entity.KEYWORDS]: slug?.keyword?.value || 'Từ khóa',
  };
  return (
    <CategoryFilterProvider>
      <BreadcrumbComponent
        label={
          breadcrumb
            ? breadcrumb?.label
            : renderLabelBreadcrumb[slug?.model || ''] || ''
        }
        link={generateSlugToHref(breadcrumb?.link || slug?.slug)}
      />
      <div
        className={
          'rounded-[10px] border-gray-500 bg-white shadow-custom grid grid-cols-1 lg:grid-cols-6 gap-3'
        }
      >
        {data.settings && <SettingFilter settings={data.settings} />}
        <ContentFilter
          products={data.products || []}
          settings={data.settings}
          total={data?.total || 0}
          slugData={
            new SlugDto({
              model: slug?.model,
              model_id: slug?.model_id,
              slug: slug?.slug,
            })
          }
        />
      </div>
    </CategoryFilterProvider>
  );
}
