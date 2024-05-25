import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags , setTags}) => {
    const [inputValue, setInputValue] = useState("")

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags , inputValue.trim()])
            setInputValue("")
        }
    }
    ////onKeyDown sau khi nhan enter tu dong noi dung tring input len tag kien thuc nay moi sieu hay
    const handleKeyDown = (e) => {
        if ( e.key === "Enter") {
            addNewTag();
            
        }
    }
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }
  return (
    <div>
    {tags.length > 0 && (
      <div className='flex flex-wrap gap-2 items-center mt-2'>
        {tags.map((tag, index) => (
          <span key={index} className='flex items-center bg-gray-200 rounded-full px-3 py-1'>
            # {tag}
            <button onClick={() => {handleRemoveTag(tag)}} >
              <MdClose />
            </button>
          </span>
        ))}
      </div>
        )}

    <div>
      <div className='flex items-center gap-4 mt-3'>
        <input type='text' className='text-sm bg-transparent border px-3 py-2 rounded outline-none' placeholder='Add tags' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/> 
        <button className='w-8 h-8 flex items-center justify-center rounded border-blue-700 hover:bg-blue-700' onClick={() => {addNewTag()}} >
            <MdAdd className='text-2xl text-blue-700 hover:text-white' />
        </button>
      </div>
    </div>
    </div>
  )
}

export default TagInput
