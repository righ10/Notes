import { NotebookIcon } from 'lucide-react'
import {Link} from "react-router"
import React from 'react'


const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
        <div className='bg-primary/10 rounded-full p-8'>
            <NotebookIcon className='size-10 text-primary'/>
        </div>
        <h3 className="text-2xl front-bold">No Note yet</h3>
        <p className='text-base-content/70'>
            Reacd to organize your thought? Create your first note to get started on your journey.
        </p>
        <Link to="/create" className='btn btn-primary btn-wide'>Create Your First Note</Link>

    </div>
  )
}

export default NotesNotFound