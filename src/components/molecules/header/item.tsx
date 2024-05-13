import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const HeaderItem = ({
  icon,
  children,
  className,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Link
      href={'/'}
      className={
        'block rounded-[10px] hover:bg-linkHover transition-colors duration-300 p-2'
      }
    >
      <div className={'text-white flex text-[14px] items-center gap-[10px]'}>
        {icon}
        <div className={twMerge(className)}>{children}</div>
      </div>
    </Link>
  );
};
export default HeaderItem;
