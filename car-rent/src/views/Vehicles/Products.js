import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';


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

        <div className='container'>

            {/*Page messages*/}
            <div className='row text-center pt-5'>
                <h3>Here are our Vehicles you can choose from!</h3>
            </div>

            <div className='row text-center'>
                <p className='mt-5 mb-5'>Vehicles</p>
            </div>

            {/*vehicles*/}
            {products.map(product => <>
                <div className="row col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center ps-4 pe-4">
                    <div className="cardCar">
                        {/*Végigmegyünk a products-okon és minden egyed product id-nál kiíratjuk a hozzátartozó adatot*/}
                        <div className="d-flex justify-content-center" key={product.id}>
                            <img id='img' src={`http://localhost:3001/${product.image}`} alt="car"></img>
                            <div className="container text-light">
                                <div className='row text-center'>
                                    <p className='textSetting'><b>{product.brand.toUpperCase()} - {product.model.toUpperCase()}</b></p>
                                </div>
                                <div className='row text-center'>
                                    <p className='textSetting'>Fuel-type: {product.fuel.toUpperCase()}</p>
                                </div>
                                <div className='row text-center'>
                                    <p className='textSetting'>Price / day: {product.price}HUF</p>
                                </div>
                                <div className='row text-center'>
                                    <p className='textSetting'>Year: {product.year}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="rounded mt-4 mb-4"></hr>
            </>)}
        </div>
    </>);
}
