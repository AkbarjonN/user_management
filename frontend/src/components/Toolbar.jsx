import { MdLockOpen } from 'react-icons/md'
import { MdLock } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'	
export default function Toolbar({ onBlock, onUnblock, onDelete }) {
    return (
      <div className="mb-2">
        <button className="btn btn-danger me-2" onClick={onBlock}><MdLock /></button>
        <button className="btn btn-success me-2" onClick={onUnblock}><MdLockOpen /></button>
        <button className="btn btn-danger me-2" onClick={onDelete}> <FaTrash /></button>
      </div>
    );
  }