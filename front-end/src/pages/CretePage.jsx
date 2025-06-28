import { ArrowLeftIcon, DivideCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import api from '../libs/axios';

const CretePage = () => {
  const[title,setTitle]=useState("");
  const[content,setContent]=useState("");
  const[loading,setLoading]=useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim() ){
      toast.error("All field are required");
      return;
    }

    setLoading(true)

    try {
      await api.post("/notes",{
      title,
      content
    })
  
    toast.success("Note created successfully");
    navigate("/")
    } catch (error) {
      console.log("Error creating Notes", error)
      if (error.reponse.status === 428){
        toast.error("slow down you're creating note to fast", {
          duration:4000,
          icon:"💀",
        } );
      }else{
        toast.error("Failed to create Note")
      }
    }finally{
      setLoading(false)
    }
  }
    
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5'/>
          Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'> Create New Note</h2>
              <form onSubmit={handleSubmit}>

                  <label className='form-control mb-4  max-w-full' >
                    <span className='label-text'>Title</span>
                    <input type="text" 
                    name='title'
                    placeholder='Note Title' 
                    className='input input-bordered ' 
                    value={title}
                    onChange={(e) => setTitle( e.target.value)}
                    />
                  </label>
                

                
                  <label className=" form-control mb-4 max-w-full">
                    
                    <span className='labal-text'>Content</span>
                    <textarea 
                    name='text'
                    placeholder='Write Your Note Here...'
                    className='textarea textarea-bordered h-32'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    >

                    </textarea>
                  
                  </label>
                

                <div className="card-action flex justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}  >
                    {loading? "Creating ...": " Create Note"}
                  </button>
                </div>
              </form>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default CretePage