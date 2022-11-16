import { useState } from "react";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { Board, OrdersContainer } from "./styles";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({
  icon,
  title,
  orders,
}: OrdersBoardProps): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseOrder = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseOrder}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>( {orders.length} )</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders?.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenOrder(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>
                {order.products.length}{" "}
                {order.products.length > 1 ? "itens" : "item"}
              </span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
