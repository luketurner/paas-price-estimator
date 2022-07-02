import { Accessor, Component, For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import styles from './App.module.css';

interface ContainerCartItem {
  type: 'container'
  cpu: number
  memory: number
  quantity: number
}

interface NetworkCartItem {
  type: 'network'
  bytesIn?: number
  bytesOut?: number
}

type CartItem = ContainerCartItem | NetworkCartItem

interface Cart {
  items: CartItem[]
}

const [cart, setCart] = createStore<Cart>({
  items: []
})

const addCartItem = () => {
  setCart(
    produce((cart) => {
      cart.items.push({
        type: 'container',
        cpu: 1,
        memory: 256,
        quantity: 1
      })
    })
  )
}

const deleteCartItem = (index: number) => {
  setCart(
    produce((cart) => {
      cart.items.splice(index, 1)
    })
  )
}

interface CartItemProps {
  item: CartItem
  index: Accessor<number>
}

const CartItem: Component<CartItemProps> = ({ item, index }) => {

  return <div>
    {index() + 1}. {JSON.stringify(item)}
    <button onClick={[deleteCartItem, index()]}>(X)</button>
  </div>
}

const AddItemButton = () => {
  return <button onClick={addCartItem}>Add item</button>;
}

const CartList = () => {
  return <For each={cart.items} fallback={'Empty cart!'}>
    {(item, index) => (
      <CartItem item={item} index={index}></CartItem>
    )}
  </For>
}

const App: Component = () => {

  return (
    <div>
      <CartList />
      <div>
        <AddItemButton />
      </div>
    </div>
  );
};

export default App;
