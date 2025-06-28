import Note from "../models/notes.js";


export async function getAllNote(req, res){
   try {
     const notes = await Note.find().sort({createdAt: -1})
     res.status(200).json(notes)
   } catch (error) {
    console.log ("Error in getAllNotes controller ", error)
    res.status(500).json({message:"Internal server error"})
   }
}

export async function getNotesById(req,res){
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note is not found"})
        res.status(200).json(note)
    } catch (error) {
        console.log ("Error in getNotesById controller ", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function createNote (req, res) {
    try {
        const {title,content} = req.body;
        const newNote = new Note({title, content})

        await newNote.save();
        res.status(201).json({message:"Note created successfully!"})
    } catch (error) {
        console.log ("Error in createNote controller ", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function updateNote(req, res) {
    try {
        const {title,content}= req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{new:true,});
        if(!updatedNote) return res.status(404).json({message:"Note is not found"})
        res.status(200).json({message:"Note updated Successfully!"})
    } catch (error) {
        console.log ("Error in updateNotes controller ", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function deleteNote(req, res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.json({message:"Note deleted Successfully!"});
    } catch (error) {
        console.log ("Error in deleteNotes controller ", error)
        res.status(500).json({message:"Internal server error"})
    }
}

