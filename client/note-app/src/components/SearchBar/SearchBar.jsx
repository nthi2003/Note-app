import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
const SearchBar = ({ searchQuery, onChange, handleSearch, onClearSearch, color, bgSearch  }) => {

    return (
        <div className={`${bgSearch ? 'bg-gray-500' : 'bg-slate-100'} w-80 flex items-center px-4 rounded-md`}>
            <input
                type='text'
                value={searchQuery}
                placeholder='Search'
                className={`${color ? 'text-white' : 'text-black'} w-full text-xs bg-transparent py-[11px] outline-none `}
                onChange={onChange}
            />
            <FaMagnifyingGlass className={`cursor-pointer ${color ? 'text-white' : 'text-black'}`} onClick={handleSearch} />
      {searchQuery && (
        <IoMdClose className={`cursor-pointer ${color ? 'text-white' : 'text-black'}`} onClick={onClearSearch} />
      )}

        </div>
    )
}

export default SearchBar
