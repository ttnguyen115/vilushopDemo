import React, { useContext } from 'react'
import {GlobalState} from '../../GlobalState';

function Filters() {
    const state = useContext(GlobalState);
    const [categories] = state.categoriesApi.categories;
    const [category, setCategory] = state.productsApi.category;
    const [sort, setSort] = state.productsApi.sort;
    const [search, setSearch] = state.productsApi.search;

    const handleFilters = e => {
        setCategory(e.target.value);
        setSearch('');
    }

    return (
        <div className="w-full overflow-hidden flex justify-between items-center flex-wrap mt-3 filter-menu">
            <div className="row sort">
                <span>Filters: </span>

                <select name="category" value={category} onChange={handleFilters}
                    className="border border-gray-300 rounded px-3 py-0 outline-none"
                >
                    <option value="">All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Search" 
                onChange={e => setSearch(e.target.value.toLowerCase())} 
                className="border border-gray-300 rounded px-3 py-0 outline-none flex-1 mx-4"
            />
        
            <div className="row sort">
                <span>Sort by: </span>

                <select value={sort} onChange={e => setSort(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-0 outline-none"
                >
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best sellers</option>
                    <option value="sort=-price">Price: High to Low</option>
                    <option value="sort=price">Price: Low to High</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
