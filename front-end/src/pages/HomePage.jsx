import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import Axios from "axios"
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard.jsx'
import api from '../libs/axios'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {

    const[rateLimited,setRateLimited]=useState(false);
    const[notes, setNotes]=useState([])
    const[loading, setLoading]=useState(true)

    useEffect(() => {
        const fetchNotes = async ()=> {
            try {
                const res=await api.get("/notes",);
                console.log(res.data);
                setNotes(res.data)
                setRateLimited(false)
            } catch (error) {
                console.log("Error Fetching Notes")
                console.log(error)
                if(error.response?.status === 429){
                    setRateLimited(true)
                }else{
                    toast.error('failed to load Notes')
                }
            }finally{
                setLoading(false)
            }
        };
        fetchNotes();
    }, [])

  return (  <div className="min-h-screen" >

        <NavBar />

        {rateLimited && <RateLimitedUI/>}
        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-cente text-primary py-10'></div>}

            {notes.length ===0 && !rateLimited && <NotesNotFound/>}

            {notes.length > 0 && !rateLimited &&  (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map(note => (
                        <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                    ))}
                </div>
            )}

        </div>
        
        </div>
  )
}

export default HomePage