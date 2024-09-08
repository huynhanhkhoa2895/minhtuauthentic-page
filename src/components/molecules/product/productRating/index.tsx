import { QuestionAnswerDto } from '@/dtos/QuestionAnswer.dto';
import { Collapse } from 'antd';
import RatingDto from '@/dtos/Rating.dto';
import FormProductRating from '@/components/molecules/product/productRating/form';

type Props = {
  ratings: RatingDto[];
  product_id: number;
};
export default function ProductRating({ ratings, product_id }: Props) {
  return (
    <div
      className={'rounded-[10px] border-gray-500 bg-white shadow-custom mt-3'}
    >
      <div
        className={
          'bg-gray-100 text-primary font-semibold p-3 text-[16px] text-center'
        }
      >
        <h3 className={'uppercase'}>Đánh giá sản phẩm</h3>
      </div>
      <div className={'p-3'}>
        <FormProductRating product_id={product_id} />
      </div>
    </div>
  );
}
