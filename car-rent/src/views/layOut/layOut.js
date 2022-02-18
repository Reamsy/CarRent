import { MenuBar } from "../menuBar/menuBar";


export function Layout({children}) {
    return (
        <div>
            <MenuBar/>
            {children}
        </div>
    )
}

export default Layout;