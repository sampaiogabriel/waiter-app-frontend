import { useEffect } from "react";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import closeIcon from "./../../assets/images/close-icon.svg";
import { Overlay, ModalBody, OrderDetails, Actions } from "./styles";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

export function OrderModal({ visible, order, onClose }: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="close icon" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === "WAITING" && "🕐"}
              {order.status === "IN_PRODUCTION" && "👨‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            <strong>
              {order.status === "WAITING" && "Fila de espera"}
              {order.status === "IN_PRODUCTION" && "Em preparação"}
              {order.status === "DONE" && "Pronto!"}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`${
                    product.imagePath
                      ? "https://via.placeholder.com/56x28"
                      : "https://via.placeholder.com/56x28"
                  }`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type="button" className="primary">
            <span>👨‍🍳</span>
            <strong>Iniciar Produção</strong>
          </button>
          <button type="button" className="secondary">
            <strong>Cancelar Pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
