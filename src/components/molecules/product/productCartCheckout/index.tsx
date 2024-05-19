import CartInput from '@/components/atoms/cartInput';
import CartPlus from '@/components/icons/cart-plus';

export default function ProductCartCheckout() {
  const handleChange = (value: number) => {};
  return (
    <div className={'flex justify-between gap-3'}>
      <CartInput className={'w-[100px]'} value={1} onChange={handleChange} />
      <button
        className={
          'flex flex-col bg-primary items-center justify-center p-3 rounded-[10px] grow text-[12px]'
        }
        type={'button'}
        onClick={() => {}}
      >
        <span className={'text-white'}>Mua ngay</span>
        <span className={'text-white'}>Giao Tận Nơi</span>
      </button>
      <button
        className={
          'flex flex-col border border-primary items-center justify-center p-3 rounded-[10px] w-[100px] text-[12px]'
        }
        type={'button'}
      >
        <span>
          <CartPlus className={'w-6 h-6 text-primary'} />
        </span>
        <span className={'text-primary '}>Thêm vào giỏ</span>
      </button>
    </div>
  );
}
