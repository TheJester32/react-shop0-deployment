function CartListItem(props) {
    const {
        mainId,
        displayName,
        regularPrice,
        amount,
        removeFromBasket = Function.prototype,
        increaseAmount = Function.protorype,
        decreaseAmount = Function.prototype
    } = props;
    return (
        <div>
            <li className="collection-item">
                {displayName} x{amount} = {regularPrice * amount} руб.
                <span className="secondary-content" onClick={() => removeFromBasket(mainId)}>
                    <i className="material-icons cart-item-clear">clear</i>
                </span>
            </li>
            <span className="change-amount-wrapper">
                    <button onClick={() => decreaseAmount(mainId)}>-</button>
                    <button onClick={() => increaseAmount(mainId)}>+</button>
                </span>
        </div>
    )
}

export { CartListItem };