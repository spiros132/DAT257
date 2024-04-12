"use client";
import React, {useState} from "react";

function searchBar({onSearch}: {onSearch: (searchInput: string) => void}){
    const [searchInput, setSearchInput] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchInput);
    };
    return (
        <form onSubmit={handleSearch}>
                <div className="relative mb-4 flex w-full flex-wrap">
                    <input
                        type="text"
                        id="searchBar"
                        className="block flex-auto border border-solid px-3 bg-white text-black font-bold"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchInput}
                        onChange={handleChange}
                        aria-describedby="button-addon1" />
                    <button
                        className="flex bg-primary px-6 py-2.5 text-white bg-black"
                        type="submit"
                        id="button-addon1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
        </form>
    );

}
export default searchBar;
    

