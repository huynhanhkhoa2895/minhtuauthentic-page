import { twMerge } from 'tailwind-merge';

export default function CheckoutTemplate() {
  return (
    <div
      className={twMerge(
        'w-full rounded-[10px] shadow-custom bg-white overflow-hidden relative mx-auto p-3 grid grid-cols-1 lg:grid-cols-2',
      )}
    >
      <div>
        <h2 className={'text-3xl font-bold'}>Thông tin vận chuyển</h2>
      </div>
      <div></div>
    </div>
  );
}
