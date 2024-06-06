import { CartListItem } from "./CartListItem";

function CartList(props) {
    const { order = [], handleBasketShow = Function.prototype, removeFromBasket = Function.prototype, increaseAmount = Function.prototype,
        decreaseAmount = Function.prototype } = props;

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.regularPrice * el.amount;
    }, 0)

    return (
        <ul className="collection cart-list">
            <li className="collection-item active">Корзина</li>
            {
                order.length ? order.map(item => (
                    <CartListItem
                        key={item.mainId}
                        removeFromBasket={removeFromBasket}
                        decreaseAmount={decreaseAmount}
                        increaseAmount={increaseAmount}
                        {...item} />
                )) :
                    <li className="collection-item">Корзина пуста</li>
            }
            <li className="collection-item active">Общая стоимость: {totalPrice} руб.</li>
            <i className="material-icons cart-close" onClick={handleBasketShow}>close</i>
        </ul>
    )
}

export { CartList };