import carIMG from '../../images/img_car.png';
import driverIMG from '../../images/img_avatar.png';

{/*Choosed Car & Driver card*/}
<div className="container_cards">

<div className="cardPosition">
    {/*Car*/}
    <div className="card" id="car">
        <img className="img" src={carIMG} alt="car" />
        <div className="container">
            <h4 id="car"><b>Brand</b></h4>
            <p>price/day</p>
            <p id="startTime">start time</p>
            <p id="endTime">end time</p>
        </div>

    </div>
</div>

<p id="total">total</p>

<div >
    {/*Driver*/}
    {/*Ha a vásárló nem kér sofőrt ne jelenjen meg se név se semmi, opacity: 0.4;*/}
    <div className="card" id="car">
        <img className="img" src={driverIMG} />
        <div className="container">
            <h4 id="name"><b>Name</b></h4>
            <p id="age">Age</p>
            <p>férfi</p>
        </div>
    </div>
</div>
</div>