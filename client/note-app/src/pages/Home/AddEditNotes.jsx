import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';

import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, onClose, getAllNotes , showToastMessage }) => {
  //Kiểm tra nếu noteData không null và không undefined, sau đó truy cập thuộc tính tags
  const [title, setTitle] = useState(noteData?.title ||'');
  const [content, setContent] = useState(noteData?.content ||'');
  const [tags, setTags] = useState(noteData?.tags ||[]);
  const [errors, setErrors] = useState({ title: '', content: '' });
  //add notes
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
          title,
          content,
          tags
      })
      if ( response.data && response.data.note) {
        showToastMessage("Note add Successfully")
        getAllNotes()
        onClose()
      }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mes){
          setErrors(error.response.data.mes)
        }
    }
  }
  const editNote = async () => {
    const noteId = noteData._id
    try{
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags
      })
      if ( response.data && response.data.note) {
        showToastMessage("Note Update Successfully")
        getAllNotes()
        onClose()
      }
    }catch (error) {
      if (error.response && error.response.data && error.response.data.mes){
        setErrors(error.response.data.mes)
      }
  }}
  //cach 1
  // const handleAddNote = () => {
  //   let newErrors = { title: '', content: '' };

  //   if (!title) {
  //     newErrors.title = 'Please provide a title';
  //   }

  //   if (!content) {
  //     newErrors.content = 'Please provide content';
  //   } else if (content.length < 5) {
  //     newErrors.content = 'Content requires more than 5 characters';
  //   }

  //   setErrors(newErrors);

    
  // };
  //cach 2
  // prevError tham số đây là giá trị trước đó của errors
  const handleAddNote = () => {
  if(!title) {
    setErrors((prevErrors) => ({ ...prevErrors, title: 'Please provide a title' }));
    return;
  }
  
  if(!content) {
    setErrors((prevErrors) => ({ ...prevErrors, content: 'Please provide content'}))
    return;
  }
  if(!content.length < 5) {
    setErrors((prevErrors) => ({ ...prevErrors, content: 'Content requires more than 5 characters'}))
  }
  setErrors("")
  if(type === 'edit') {
    editNote()
  }
  else {
    addNewNote()
  }
}

  

    
  
  return (
    <div className='relative'>
      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>
      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input
          type='text'
          className='text-2xl text-slate-950 outline-none'
          placeholder='Go To Gym At 5'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        {errors.title && <p className='text-red-500'>{errors.title}</p>}
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>CONTENT</label>
        <textarea
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        {errors.content && <p className='text-red-500'>{errors.content}</p>}
      </div>
      <div className='mt-3'>
        <label htmlFor='input-label'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>
        {type === 'edit'? "UPDATE" :'ADD'}
      </button>
    </div>
  );

}
export default AddEditNotes;
