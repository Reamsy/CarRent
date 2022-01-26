import React from 'react';

//Import CSS & Images
import './profilePage.css';
import driverIMG from '../../images/img_avatar.png';

export function Profile() {
    return (<>
        {/*Avatar Picture */}
        <div className="container-base">
            <img src={driverIMG} alt="img_avatar" id="profileImage" />
        </div>

        {/*Info Section*/}
        <div className="container">
            <div className="leftInput">
                <h3><b>First name:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="text" value="" />
            </div>
            <div className="rightInput">
                <h3><b>Second name:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="text" value="" />
            </div>
        </div>

        <div className="container">
            <div className="leftInput">
                <h3><b>E-mail:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="email" value="" />
            </div>
            <div className="rightInput">
                <h3><b>Phone num.:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="tel" value="" placeholder="Form: 12-345-6789"
                    pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}" required />
            </div>
        </div>

        <div className="container">
            <div className="leftInput">
                <h3><b>Personal ID:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="text" value="" />
            </div>
            <div className="rightInput">
                <h3><b>License ID:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="text" value="" />
            </div>
        </div>

        <div className="container">
            <div className="leftInput">
                <h3><b>License cat.:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="text" value="" />
            </div>
            <div className="rightInput">
                <h3><b>License expiry:
                    {/*value-ba kerülnek a DB adatok */}
                </b></h3> <input type="text" value="" />
            </div>
        </div>

        <div className="BTN">
            <button id="saveBTN">Save</button>
        </div>
    </>)
}