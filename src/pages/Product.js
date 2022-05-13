import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setInfoProductThunk, setProductThunk } from "../redux/actions";
import { addProductTocart } from "../services";

const Product = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.ProductInfo);
    const filterProducts = useSelector(state => state.products)

    const [quantity, setQuantity] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [felterProd, setFilterProd] = useState([])

    useEffect(() => {
        dispatch(setInfoProductThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(quantity && confirm){
            addProductTocart({
                product : id,
            })
            .then((res) => {
                console.log(res)
                setConfirm(false)
            })
        }   
    }, [quantity, confirm, id])

    const decrement = () => {
        setConfirm(false)
        if(quantity > 0){
            setQuantity(quantity - 1)
        }
    }
    const increment = () => {
        setConfirm(false)
        setQuantity(quantity + 1)
        
    }

    return(
        <div>
            <h1>{product.name}</h1>
            <div>
                <button onClick={decrement}>-</button>
                {quantity}
                <button onClick={increment}>+</button>
                <br />
                <button onClick={() => setConfirm(true)}>Add To Cart</button>
                <p>{product.description}</p>
                {product.images?.map((item) => <img src={item.url} width='200px' alt='' key={item.id} />)}
                <h2>Productos Relacionados</h2>
                {filterProducts.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <img width='200px' src={product.images[0].url} alt="" />
                    </div>
                ))}               
            </div>
        </div>
    );

};

export default Product;