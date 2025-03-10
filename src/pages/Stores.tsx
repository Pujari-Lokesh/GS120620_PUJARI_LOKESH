import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addStore, updateStore, deleteStore } from '../store/storeSlice';
import { Button, TextField, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Stores: React.FC = () => {
    const dispatch = useDispatch();
    const stores = useSelector((state: RootState) => state.stores.stores);
    const [newStoreName, setNewStoreName] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>('');

    const handleAddStore = () => {
        if (newStoreName.trim()) {
            dispatch(addStore(newStoreName));
            setNewStoreName('');
        }
    };

    const handleUpdateStore = (id: number) => {
        if (editName.trim()) {
            dispatch(updateStore({ id, name: editName }));
            setEditingId(null);
        }
    };

    const handleDeleteStore = (id: number) => {
        dispatch(deleteStore(id));
    };

    return (
        <div>
            <h1>Stores</h1>
            <TextField
                label="New Store Name"
                value={newStoreName}
                onChange={(e) => setNewStoreName(e.target.value)}
            />
            <Button onClick={handleAddStore} variant="contained" sx={{ marginLeft: 2 }}>
                Add Store
            </Button>

            <List>
                {stores.map((store) => (
                    <ListItem key={store.id}>
                        {editingId === store.id ? (
                            <>
                                <TextField
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <Button onClick={() => handleUpdateStore(store.id)}>Save</Button>
                            </>
                        ) : (
                            <>
                                {store.name}
                                <IconButton onClick={() => {
                                    setEditingId(store.id);
                                    setEditName(store.name);
                                }}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton onClick={() => handleDeleteStore(store.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Stores;
