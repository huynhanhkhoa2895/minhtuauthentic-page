import { TagsOutlined } from '@ant-design/icons/lib/icons';
import Link from 'next/link';
import { generateSlugToHref } from '@/utils';
import { useState } from 'react';
import { ProductDto } from '@/dtos/Product.dto';
type Props = {
  product: ProductDto;
};
export default function ListKeyword({ product }: Props) {
  const [displayTags, setDisplayTags] = useState<boolean>(false);
  return (
    <div className={'mt-3'}>
      <TagsOutlined
        onClick={() => {
          setDisplayTags(!displayTags);
        }}
      />
      {displayTags && (
        <div className={'flex flex-wrap gap-1 items-center'}>
          <span className={'font-bold'}>Từ khóa:</span>
          {product?.keywords?.map((item) => {
            return (
              <Link
                key={item?.id}
                href={generateSlugToHref(item?.keyword?.slugs?.slug)}
                className={'text-sm text-gray-500 hover:text-primary'}
              >
                {item.keyword?.value}
                {', '}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
