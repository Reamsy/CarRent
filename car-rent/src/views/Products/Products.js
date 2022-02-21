import React, { useEffect, useState } from 'react';
import { Layout } from '../layOut/layOut';
import Axios from 'axios';

//import CSS & Images
import './Products.css';


export function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/Products')

            //itt kezeljük le az backendről érkező adatokat
            .then((response) => {
                if (response) {
                    console.log(response);
                    setProducts(response.data);
                }
                //hiba esetén alert
                else {
                    alert("Products not available right now!");
                }
            });

    }, []);



    return (<>

        <Layout />
        {/*{products.map(product =>
             <li key={product.id}>{product.title}</li>
        )}*/}

        {/*Page message*/}
        <h3 id="h3">Here Are our Drivers and Vehicles you can choose from!</h3>

        {/*Culomn Signs*/}
        <div className="signs">
            <p id="culVehicle">Vehicles</p>
            <p id="culDriver">Drivers</p>
        </div>

        {/*Cards for the Products*/}
        {/*vehicle1*/}
        <div className="row">
            <div className="card" id="car">

                {/*Végigmegyünk a products-okon és minden egyed product id-nál kiíratjuk a hozzátartozó adatot*/}
                {products.map(product =>
                    <>
                        <img key={product.id} className="img" src={product.picture} alt="car"></img>
                        <div className="container">
                            <h4><b>{product.title}</b></h4>
                            <p {...product.fuel}></p>
                            <p {...product.rentPrice}></p>
                            <p {...product.year}></p>
                        </div>
                    </>
                )}

                {/*<img className="img" src={} alt="car" />
                <div className="container">
                    {/*ezeket adatbázisból kellene feltölteni
                    <h4><b>Brand</b></h4>
                    <p>fuel type </p>
                    <p>bérlési ár</p>
                    <p>évjárat</p>
                </div>*/}

            </div>

            {/*driver1*/}
            <div className="card" id="people">
                <img className="img" src="" alt="avatar" />
                <div className="container">
                    {/*ezeket adatbázisból kellene feltölteni*/}
                    <h4><b>name</b></h4>
                    <p>sex</p>
                    <p>license category</p>
                </div>
            </div>
        </div>

        <hr className="rounded"></hr>
    </>);
}
