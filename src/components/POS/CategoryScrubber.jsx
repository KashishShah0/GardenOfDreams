import { usePOS } from '../../context/POSContext';
import { capitalize } from '../../utils/helpers';

const CategoryScrubber = () => {
    const { categories, activeCategory, setActiveCategory } = usePOS();

    return (
        <div className="categories-scrubber" id="category-filters">
            {categories.map(cat => (
                <button
                    key={cat}
                    className={`cat-pill ${cat === activeCategory ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                >
                    {capitalize(cat)}
                </button>
            ))}
        </div>
    );
};

export default CategoryScrubber;
