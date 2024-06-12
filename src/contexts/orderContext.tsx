import React, { createContext, useEffect, useState } from 'react';
import { OrderItemsDto } from '@/dtos/OrderItems.dto';
import { VariantDto } from '@/dtos/Variant.dto';
import { toast } from 'react-toastify';
import { variantName } from '@/utils';
const OrderContext = createContext<TypeAppState | undefined>(undefined);
export type TypeAppState = {
  cart: OrderItemsDto[];
  addCart: (product_name: string, variantDto: VariantDto, qty?: number) => void;
  updateCart: (variantDto: VariantDto, qty?: number) => void;
  removeCart: (variantDto: VariantDto) => void;
};
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<OrderItemsDto[]>([]);
  const [ready, setReady] = useState(false);
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

  const addCart = (
    product_name: string,
    variant: VariantDto,
    qty: number = 1,
  ) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.variant_id === variant.id);
    const orderItem = newCart[index];
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
          price: variant.price,
          variant_name: product_name,
          variant_price: variant.price,
          variant_regular_price: variant.regular_price,
        }),
      ]);
    }
  };

  const updateCart = (product: VariantDto, qty: number = 1) => {
    const exist = cart.find((item) => item.variant_id === product.id);
    if (qty < 1) {
      toast.error('Số lượng phải lớn hơn 0');
      return;
    }
    if (exist) {
      if (qty === 0) {
        removeCart(product);
      } else {
        exist.qty = qty;
        setCart([...cart]);
      }
    }
  };

  const removeCart = (product: VariantDto) => {
    const exist = cart.find((item) => item.variant_id === product.id);
    if (exist) {
      setCart(cart.filter((item) => item.variant_id !== product.id));
    }
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        addCart,
        updateCart,
        removeCart,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContext;
