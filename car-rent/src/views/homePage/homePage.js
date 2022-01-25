//Import CSS
import './Home.css';

//Import BG
import background from '../../images/homePageBgImage.jpg';

export function HomePage() {
    return(<>
        <img src={background} alt="BG"/>
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div data-aos="fade-up" data-aos-delay="400">
                            <a href="../view/rentPage.html" className="homePageMidBtn">Rent</a>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="500">
                            <div className="p">You can text us bellow</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="footer">

            <div>
                Write us:<a href="mailto:szalanics.szabolcs@gmail.com"> info@carrent.com</a>
                4400, Nyíregyháza Valami utca 1.
            </div>
        </div>
    </>)
}