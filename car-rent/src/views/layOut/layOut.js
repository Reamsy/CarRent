import {menuBar} from '../menuBar/menuBar';

export function Layout({children}) {
    return (
        <div className="ui container">
            <menuBar />
            {children}
        </div>
    )
}