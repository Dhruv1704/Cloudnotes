import {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const DeleteNote = ({id}) => {

    const context = useContext(noteContext)
    const {deleteNote} = context;

    const closeModal = ()=>{
        document.getElementById('delete-modal').style.display = "none"
    }

    const handleDelete = ()=>{
        closeModal();
        deleteNote(id);
    }

    return (
        <>
            <div id={`delete-modal`}
                 className={"hidden fixed top-0 left-0 box-border px-2 w-full h-full bg-[#ffffffcc] z-50"}>
                <div className={"relative top-[40%] bg-white max-w-md m-auto p-4 pt-0 pb-1 rounded-xl shadow-2xl"}>
                    <div className={"flex flex-col p-3 gap-y-3"}>
                        <p className={"text-center text-lg"}>Are you sure you want to delete this note?</p>
                        <div className={"flex justify-end gap-x-3 border-t pt-2"}>
                            <div className={"bg-black w-[42px] h-[42px] justify-center rounded-full flex items-center cursor-pointer select-none active:scale-90"} onClick={handleDelete}>
                                <i className="fa-solid fa-check text-white"></i>
                            </div>
                            <div className={"bg-black w-[42px] h-[42px] justify-center rounded-full flex items-center cursor-pointer select-none active:scale-90"} onClick={closeModal}>
                                <i className="fa-solid fa-xmark text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteNote;
