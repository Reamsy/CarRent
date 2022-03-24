import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';

//import CSS & Images
import './Products.css';


export function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/products')

            //itt kezeljük le az backendről érkező adatokat
            .then((response) => {
                if (response) {
                    setProducts(response.data);
                }
                //alertbe kezeljük ha hiba történt
                else {
                    alert("Products not available right now!");
                }
            });

    }, []);



    return (<>

        <Layout />

        {/*Page message*/}
        <h3 id="h3">Here are our Vehicles you can choose from!</h3>

        {/*Culomn Signs*/}
        <div className="signs">
            <p id="culVehicle">Vehicles</p>
        </div>

        {/*Cards for the Products*/}
        {/*vehicle1*/}
        {products.map(product =>
            <><div className="row">
                <div className="cardCar">
                    {/*Végigmegyünk a products-okon és minden egyed product id-nál kiíratjuk a hozzátartozó adatot*/}

                    <div key={product.id}>
                        <img className="img" src={product.image} alt="car"></img>
                        <div className="container">
                            <h4><b>{product.brand} - {product.model}</b></h4>
                            <p>Fuel-type: {product.fuel}</p>
                            <p>Price / day: {product.rentprice}HUF</p>
                            <p>Year: {product.year}</p>
                        </div>
                    </div>

                </div>
            </div><hr className="rounded"></hr></>
        )}

    </>);
}
