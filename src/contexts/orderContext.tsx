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
import { variantName } from '@/utils';
import { usePathname } from 'next/navigation';
const OrderContext = createContext<TypeAppState | undefined>(undefined);
export type TypeAppState = {
  cart: OrderItemsDto[];
  addCart: (product_name: string, variantDto: VariantDto, qty?: number) => void;
  updateCart: (index: number, qty?: number) => void;
  removeCart: (index: number) => void;
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

  const addCart = async (
    product_name: string,
    variant: VariantDto,
    qty: number = 1,
  ) => {
    const detailVariant: { data: VariantDto } = await fetch(
      `/api/variant/${variant.id}`,
    ).then((res) => res.json());
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.variant_id === variant.id);
    const orderItem = newCart[index];
    const coupons = [];
    if (variant.coupon) {
      coupons.push(variant.coupon);
    }
    if (orderItem) {
      if (orderItem.qty) {
        orderItem.qty += qty;
      } else {
        orderItem.qty = qty;
      }
      newCart[index] = orderItem;
      setCart(newCart);
    } else {
      setCart([
        ...newCart,
        new OrderItemsDto({
          variant_id: variant.id,
          qty,
          price: variant.regular_price,
          variant_name:
            product_name +
            variantName(
              detailVariant?.data?.variant_product_configuration_values,
            ),
          variant_price: variant.price,
          variant_regular_price: variant.regular_price,
          slug: detailVariant?.data?.product?.slugs?.slug,
          image: detailVariant?.data?.images?.[0]?.image,
          coupons: coupons,
        }),
      ]);
    }
  };

  const updateCart = (index: number, qty: number = 1) => {
    const newCart = [...cart];
    if (qty < 1) {
      toast.error('Số lượng phải lớn hơn 0');
      return;
    }
    if (index !== -1) {
      const orderItem = newCart[index];
      orderItem.qty = qty;
      newCart[index] = orderItem;
      setCart(newCart);
    }
  };

  const removeCart = (index: number) => {
    setCart((cart) => {
      const newCart = [...cart];
      newCart.splice(index, 1);
      return newCart;
    });
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
        removeCart,
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
