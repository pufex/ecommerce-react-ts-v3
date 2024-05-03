import type { ReactElement } from "react";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom"
import { usePartnersContext } from "../../contexts/Partners";
import { useCitiesContext } from "../../contexts/Cities";
// import { useCart } from "../../hooks/useCart";

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import ProductCard from "./ProductCard/ProductCard";
import SearchSubmit from "../../components/SearchSubmit/SearchSubmit";

import "./Sales.css"
import { useIconsContext } from "../../contexts/Icon";

type PaginationType = {
    current: number,
    lowest: number,
    highest: number,
}

const Sales = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const location = searchParams.get("location");
    const partnerId = searchParams.get("partner");


    if (
        !location ||
        !partnerId
    )
        return <ErrorComponent />

    const {
        MdKeyboardArrowLeft,
        MdKeyboardArrowRight,
        FaLocationDot,
    } = useIconsContext();


    // const { addToCart } = useCart(searchParams.get("partner")!);

    // const city = useCitiesContext().find(({name}) => name == searchParams.get("location"))


    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>, newSearch: string) => {
        e.preventDefault();
        setSearchParams((prev) => {
            prev.set("q", newSearch);
            return prev;
        })
    }
    const search = searchParams.get("q");

    const partner = usePartnersContext().find(({ id }) => id == partnerId)

    const [pagination, setPagination] = useState<PaginationType>({
        current: 1,
        lowest: 1,
        highest: Math.ceil(partner?.products.products?.length! / 8),
    });

    const { current, lowest, highest } = pagination

    const setPage = (newPage: number) => {
        setPagination({
            ...pagination,
            current: newPage
        })
    }

    const nextPage = () => {
        setPagination(({ current: previous }) =>
            previous == highest
                ? pagination
                : { ...pagination, current: previous + 1 }
        )
    }

    const previousPage = () => {
        setPagination(({ current: previous }) =>
            previous == lowest
                ? pagination
                : { ...pagination, current: previous - 1 }
        )
    }

    useEffect(() => {
        const body = document.querySelector("body")!
        body.scrollIntoView({ behavior: "instant" })
    }, [current])

    const city = useCitiesContext().find(({ name }) => name == searchParams.get("location"))!

    const filteredProducts = useMemo(() => {
        const newlyFilteredProducts =
            partner?.
                products.
                products.
                filter(({ name }) =>
                    !search
                        ? true
                        : name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                )
        console.log(newlyFilteredProducts)
        return newlyFilteredProducts
    }, [current, highest, search])

    const paginatedProducts = useMemo(() => {
        const newlyPaginatedProducts =
            filteredProducts?.
                slice((current - 1) * 8, current * 8);
        return newlyPaginatedProducts
    }, [filteredProducts])

    useEffect(() => {
        const newHighest = Math.ceil(filteredProducts?.length!/8)
        setPagination({
            ...pagination,
            current: current > newHighest
                ? newHighest
                : current,
            highest: newHighest
        })
    }, [paginatedProducts])

    const paginationButtons = useMemo(() => {
        const arr: number[] = new Array(Math.ceil(filteredProducts?.length! / 8))
        const buttonsList: ReactElement[] = arr
            .fill(0)
            .map((_, i) => {
                return <button
                    className="btn btn--paginate"
                    onClick={() => setPage(i+1)}
                >
                    {(i + 1).toString()}
                </button>
            })
        return buttonsList;
    }, [current, highest])

    const renderedProducts = useMemo(() => {
        const newlyRenderedProducts = paginatedProducts?.map(({ id, name, price, stock, thumbnails }) => {
            return <ProductCard
                id={id}
                partnerId={partner!.id}
                location={city.name}
                name={name}
                price={price}
                stock={stock}
                thumbnails={thumbnails}
            />
        })
        return newlyRenderedProducts
    }, [paginatedProducts])
    
    return <main className="sales__main">
        <header className="sales__header">
            <h2 className="sales__heading">
                You are in:
            </h2>
            <h1 className="sales__partner">
                {partner?.name}
            </h1>
            <h2 className="sales__location">
                <FaLocationDot
                    className="sales__location-icon"
                    size={25}
                />
                <span className="sales__location-name">
                    {searchParams.get("location")}
                </span>
            </h2>
        </header>
        <section className="sales__products-header">
            <h1 className="sales__heading">
                Products
            </h1>
        </section>
        <section className="sales__options">
            <div className="sales__search-container">
                <SearchSubmit
                    placeholder="Search"
                    onSearch={handleSearchSubmit}
                    limitChar={50}
                    defaultValue={!search ? "" : search}
                />
            </div>
        </section>
        <section className="sales__products">
            {
                renderedProducts?.length
                    ? renderedProducts
                    : null
            }
        </section>
        {
            filteredProducts?.length
                ? <section className="sales__pagination-buttons">
                    {
                        current != lowest
                            ? <button
                                className="btn btn--paginate btn--paginate-direction"
                                onClick={previousPage}
                            >
                                <MdKeyboardArrowLeft
                                    className="btn--paginate-icon"
                                    size={40}
                                />
                            </button>
                            : null
                    }
                    {paginationButtons}
                    {
                        current != highest
                            ? <button
                                className="btn btn--paginate btn--paginate-direction"
                                onClick={nextPage}
                            >
                                <MdKeyboardArrowRight
                                    className="btn--paginate-icon"
                                    size={40}
                                />
                            </button>
                            : null
                    }
                </section>
                : null
        }
    </main>
}

export default Sales
