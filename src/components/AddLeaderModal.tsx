import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';

const AddLeaderModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Leader</Button>
      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add New Leader</h2>
          <input type="text" placeholder="Name" className="border rounded p-2 mb-4 w-full" />
          <input type="text" placeholder="Skills" className="border rounded p-2 mb-4 w-full" />
          <textarea placeholder="Bio" className="border rounded p-2 mb-4 w-full"></textarea>
          <Button onClick={() => console.log('Submit')}>Submit</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddLeaderModal;