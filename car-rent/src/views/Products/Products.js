import React from 'react';
import { Layout } from '../layOut/layOut';
import { withRouter } from 'react-router-dom';

//import CSS & Images
import './Products.css';


export function Products() {

    const [products, setProducts] = useState([]);

    //Backenden lekérni hozzá az adatokat
    useEffect(() => {
        Axios.get('http://localhost:3001/Products')
            //ide kell jönnie hogy mi történjen
            .then((response) => {
                setProducts(response.data);
            })
            //error (lehet popup window is vagy egy alert)
            .catch(err => {
                console.log(err);
                alert("Produts not available right now")
            })
    }, []);



    return (<>

        <Layout />

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
                        <img className="img" src={product.picture} alt="car"></img>
                        <div className="container">
                            <h4 key={product.id}><b>{product.brand}</b></h4>
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
                <img className="img" src={driverIMG} alt="avatar" />
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
export default withRouter(Products);