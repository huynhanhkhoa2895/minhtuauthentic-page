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
  applyCoupon: (couponCode: string, variant_id?: number) => Promise<boolean>;
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

  const callAddUpdateCart = async (variant_id: number, qty: number) => {
    return await fetch(`/api/orders/addToCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variant_id: variant_id,
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
    const currentVariantOnCart = cart.find(
      (item) => item.variant_id === variant.id,
    );
    if (!variant?.id) {
      toast('Variant không tồn tại', { type: 'error' });
      return;
    }
    const newCartResponse = await callAddUpdateCart(
      variant.id,
      currentVariantOnCart?.qty ? currentVariantOnCart?.qty + 1 : 1,
    );
    if (!newCartResponse?.data) {
      toast('Không thể thêm vào giỏ hàng', { type: 'error' });
    }
    setCart(newCartResponse?.data || []);
  };

  const updateCart = async (index: number, qty: number = 1) => {
    const orderItem = cart[index];
    if (!orderItem?.variant_id) {
      toast('Variant không tồn tại', { type: 'error' });
      return;
    }
    const newCartResponse = await callAddUpdateCart(orderItem.variant_id, qty);
    setCart(newCartResponse?.data || []);
  };

  const applyCoupon = async (
    couponCode: string,
    variant_id?: number,
  ): Promise<boolean> => {
    if (couponCode) {
      return fetch('/api/coupons/apply', {
        method: 'POST',
        body: JSON.stringify({
          code: couponCode,
          current_cart: cart || [],
          variant_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data: { data: OrderItemsDto[]; message: string }) => {
          if (data?.data) {
            setCart(data?.data);
            return true;
          } else {
            if (data?.message) {
              toast.error(data?.message);
            }
          }

          return false;
        })
        .catch((error) => {
          return false;
        });
    }
    return false;
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
        applyCoupon,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContext;
