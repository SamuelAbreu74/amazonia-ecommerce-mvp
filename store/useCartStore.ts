import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@prisma/client';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items;
        
        const foundProduct = currentItems.find(item => item.id === product.id)

        let newItems;

        if(foundProduct) {
            newItems = currentItems.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            ); 
        }

        else{
            newItems = [...currentItems, {...product, quantity: 1}];
        }


        set({ items: newItems});
      },

      removeItem: (productId) => {

        const currentItems = get().items 
        const filteredItems = currentItems.filter(item => item.id !== productId);

        set({ items: filteredItems });

      },

      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'amazonia-cart-storage', // Nome da chave que ficará salva no navegador
    }
  )
);