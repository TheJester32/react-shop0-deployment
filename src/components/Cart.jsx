function Cart(props){
const {amount = 0, handleBasketShow = Function.prototype} = props;
return(
    <div className="cart blue whote-text" onClick={handleBasketShow}>
        <i className="material-icons">shopping_cart</i>
        {amount ? <span className="cart-amount">{amount}</span> : null}
    </div>
)

}

export { Cart };