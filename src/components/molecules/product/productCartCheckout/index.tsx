import CartInput from '@/components/atoms/cartInput';
import CartPlus from '@/components/icons/cart-plus';
import OrderContext from '@/contexts/orderContext';
import { useContext, useEffect, useState } from 'react';
import { VariantDto } from '@/dtos/Variant.dto';
import { useRouter } from 'next/router';
type Props = {
  variant: VariantDto;
};
export default function ProductCartCheckout({ variant }: Props) {
  const router = useRouter();
  const orderCtx = useContext(OrderContext);
  const [qty, setQty] = useState(1);
  const [indexCart, setIndexCart] = useState<number | null>(null);
  useEffect(() => {
    const index = (orderCtx?.cart?.items || [])?.findIndex(
      (item) => item.variant_id === variant.id,
    );
    index && setIndexCart(index);
  }, [orderCtx?.cart]);
  const handleAddToCart = () => {
    if (!indexCart) return;
    if (indexCart > -1) {
      orderCtx?.updateCart && orderCtx.updateCart(indexCart, qty);
    } else {
      orderCtx?.addCart && orderCtx.addCart(variant);
    }
  };
  return (
    <div className={'flex justify-between gap-3'}>
      <CartInput
        className={'w-[100px]'}
        value={qty}
        onChange={(value) => {
          setQty(value);
        }}
      />
      <button
        className={
          'flex flex-col bg-primary items-center justify-center p-3 rounded-[10px] grow text-[12px]'
        }
        type={'button'}
        onClick={() => {
          handleAddToCart();
          router.push('/gio-hang/tom-tat');
        }}
      >
        <span className={'text-white text-xl font-bold uppercase'}>Mua ngay</span>
        <span className={'text-white'}>Giao Tận Nơi hoặc Nhận Tại Cửa Hàng</span>
      </button>
      <button
        className={
          'flex flex-col border border-primary items-center justify-center p-3 rounded-[10px] w-[100px] text-[12px]'
        }
        type={'button'}
        onClick={() => {
          handleAddToCart();
        }}
      >
        <span>
          <CartPlus className={'w-6 h-6 text-primary'} />
        </span>
        <span className={'text-primary '}>Thêm vào giỏ</span>
      </button>
    </div>
  );
}
