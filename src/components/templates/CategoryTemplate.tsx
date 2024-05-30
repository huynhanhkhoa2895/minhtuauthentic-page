import { ResponseCategoryFilterPageDto } from '@/dtos/responseCategoryFilterPage.dto';

type Props = {
  data: ResponseCategoryFilterPageDto;
};
export default function CategoryTemplate({ data }: Props) {
  console.log('data template',data)
  return (
    <div>
      <h1>CategoryTemplate</h1>
    </div>
  );
}
