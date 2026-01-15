import { usePOS } from '../context/POSContext';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    // The legacy layout used .app-layout grid.
    return (
        <div className="app-layout">
            <Sidebar />
            {children}
        </div>
    );
};

export default Layout;
