import { render } from "react-dom";

export function homePage() {
    render(
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div data-aos="fade-up" data-aos-delay="400">
                            <a href="../view/rentPage.html" id="homePageMidBtn">Rent</a>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="500">
                            <p>You can text us bellow</p>
                        </div>
                    </div>
                </div>
        </section>

            <footer>

                <address>
                    Write us:<a href="mailto:szalanics.szabolcs@gmail.com"> info@carrent.com</a>
            4400, Nyíregyháza Valami utca 1.
        </address>
            </footer>

    )


}