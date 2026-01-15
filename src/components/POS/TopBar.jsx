import { usePOS } from '../../context/POSContext';

const TopBar = () => {
    const { tableNumber, setTableNumber, searchQuery, setSearchQuery } = usePOS();

    return (
        <header className="top-bar">
            <div className="header-left">
                <select
                    id="table-select"
                    className="table-select"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                >
                    {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>Table {i + 1}</option>
                    ))}
                </select>
            </div>

            <div className="header-center">
                <div className="brand-text">
                    <h1>Garden of Dreams</h1>
                    <p>Restaurant, Bar & Party Venue</p>
                </div>
            </div>

            <div className="header-right">
                <div className="search-bar">
                    <svg width="20" height="20" fill="none" className="icon-search" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search menu..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
        </header>
    );
};

export default TopBar;
