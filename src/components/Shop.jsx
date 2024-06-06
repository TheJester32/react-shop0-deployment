import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { CartList } from './CartList';
import { Alert } from './Alert';

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isbasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.mainId === item.mainId);
    
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                amount: 1,
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        amount: orderItem.amount + 1,
                    }
                } else {
                    return orderItem;
                }
            })
    
            setOrder(newOrder);
        }
    
        setAlertName(item.displayName);
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.mainId !== itemId);
        setOrder(newOrder);
    }

    const handleBasketShow = () => {
        setBasketShow(!isbasketShow);
    }

    const increaseAmount = (mainId) => {
        setOrder(order.map(item => {
            if (item.mainId === mainId) {
                return {
                    ...item,
                    amount: item.amount + 1
                };
            }
            return item;
        }));
    }

    const decreaseAmount = (mainId) => {
        setOrder(order.map(item => {
            if (item.mainId === mainId) {
                const newAmount = item.amount - 1;
                if (newAmount > 0) {
                    return {
                        ...item,
                        amount: newAmount
                    };
                } else {
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null));
    }


    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        }).then(response => response.json()).then(data => {
            data.shop && setGoods(data.shop)
            setLoading(false)
        })
    }, [])

    const closeAlert = () =>{
        setAlertName('');
    }

    return (
        <main className="container content">
            <Cart amount={order.length} handleBasketShow={handleBasketShow} />
            {
                loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />
            }
            {
                isbasketShow && <CartList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} decreaseAmount={decreaseAmount}
                    increaseAmount={increaseAmount} />
            }
            {
                alertName && <Alert displayName={alertName} closeAlert={closeAlert}/>
            }
        </main>
    )
}

export { Shop };