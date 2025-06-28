import {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../libs/axios';
import  {toast, LoaderIcon } from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';

const NodeDetailPage = () => {
  const[note,setNote]=useState(null);
  const[loading, setLoading]=useState(true);
  const[saving, setSaving]= useState(false);

  const navigate=useNavigate();

  const {id}= useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
         const res = await api.get(`/notes/${id}`)
         setNote(res.data)
         console.log(note)

      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to fetch data")
        
      } finally{
        setLoading(false)
      }
    };

    fetchNote();
  },[id])

  console.log(note);
  
  const handleDelete = async () => {
      if(window.confirm("Are you sure you wanth to delete this Note")) return

      try {
        await api.delete(`/notes/${id}`)
        toast.success("Note successful delete")
        navigate("/")
      } catch (error) {
        console.log("Error Deleting the note:",error)
        toast.error("Failed to delete the note")
      }
  }

  const handleSave = async () => {
    if(!note.title.trim()  || !note.content.trim()){
      toast.error("Please add title & content");
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note);
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      console.log("Error saving the note:", error)
      toast.error("Failed to update note")
      
    }finally{
      setSaving(false)
    }
  }

  if(loading){
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
          <LoaderIcon className='animate-spin size-10'/>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-bae-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to= "/" className='btn btn-ghost'>
            <ArrowLeftIcon className='h-5 w-5'/>
            Back to Note
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5w-5'/>
              Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className="card-body">
              <div className='form-control mb-4'>
               <label className='label' >
                  <span className='label-text'>Title</span>
                </label>
                    <input type="text" 
                    name='title'
                    placeholder='Note Title' 
                    className='input input-bordered ' 
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value})}
                    />
                  
              </div>   

              <div className='form-control mb-4'>
                
                <label className=" label">
                    
                  <span className='labal-text'>Content</span>
                </label>
                  <textarea 
                    name='text'
                    placeholder='Write Your Note Here...'
                    className='textarea textarea-bordered h-32'
                    value={note.content}
                    onChange={(e) => setNote({...note, content:e.target.value})}
                    >

                  </textarea>

              </div>    

              <div className="card-actions justify-end">
                <button className='btn btn-primary ' disabled={saving} onClick={handleSave}>
                  {saving? "Saving...": "Save Changes"}
                </button>
              </div>     
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NodeDetailPage