import { CategoryDto } from '@/dtos/Category.dto';
import Link from 'next/link';

const MenuChildren = ({
  categories,
  onMouseEnter,
  onMouseLeave,
}: {
  categories: CategoryDto[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return (
    <>
      {categories.length > 0 && (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={
            'absolute h-full w-[500px] bg-white z-[20] top-0 left-[200px] ml-2 p-2'
          }
        >
          <ul>
            {categories.map((item, index) => {
              return (
                <li className={''} key={index}>
                  <Link href={item?.slugs?.slug || ''}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
export default MenuChildren;
