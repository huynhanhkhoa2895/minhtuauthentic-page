import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import { toast } from 'react-toastify';
import { getPriceWithCoupon, variantName } from '@/utils';
import { usePathname } from 'next/navigation';
const OrderContext = createContext<TypeAppState | undefined>(undefined);
export type TypeAppState = {
  cart: OrderItemsDto[];
  addCart: (variantDto: VariantDto) => void;
  updateCart: (index: number, qty?: number) => void;
  clearCart: () => void;
  isOpenHeaderCart?: boolean;
  setIsOpenHeaderCart?: Dispatch<SetStateAction<boolean>>;
};
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const ref = useRef(pathname);
  const [cart, setCart] = useState<OrderItemsDto[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpenHeaderCart, setIsOpenHeaderCart] = useState(false);
  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    }
    setReady(true);
  }, []);
  useEffect(() => {
    ready && localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (ref.current !== pathname) {
      setIsOpenHeaderCart(false);
    }
    ref.current = pathname;
  }, [pathname]);

  const callAddUpdateCart = async (variant: VariantDto, qty: number) => {
    return await fetch(`/api/orders/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variant_id: variant.id,
        current_cart: cart,
        qty,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return null;
      });
  };

  const addCart = async (variant: VariantDto) => {
    console.log('variant', variant);
    const newCartResponse = await callAddUpdateCart(variant, 1);
    if (!newCartResponse?.data) {
      toast('Không thể thêm vào giỏ hàng', { type: 'error' });
    }
    setCart(newCartResponse?.data || []);
  };

  const updateCart = async (index: number, qty: number = 1) => {
    const orderItem = cart[index];
    if (!orderItem.variant) {
      toast('Variant không tồn tại', { type: 'error' });
      return;
    }
    const newCartResponse = await callAddUpdateCart(orderItem.variant, qty);
    setCart(newCartResponse?.data || []);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        addCart,
        updateCart,
        isOpenHeaderCart,
        setIsOpenHeaderCart,
        clearCart,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContext;
