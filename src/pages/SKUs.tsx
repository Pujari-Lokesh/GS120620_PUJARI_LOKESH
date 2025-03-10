import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addSKU, updateSKU, deleteSKU } from '../store/skuSlice';
import { Button, TextField, List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SKUs: React.FC = () => {
    const dispatch = useDispatch();
    const skus = useSelector((state: RootState) => state.skus.skus);

    // Form States
    const [skuName, setSkuName] = useState<string>('');
    const [skuPrice, setSkuPrice] = useState<number>(0);
    const [skuCost, setSkuCost] = useState<number>(0);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>('');
    const [editPrice, setEditPrice] = useState<number>(0);
    const [editCost, setEditCost] = useState<number>(0);

    // Add New SKU
    const handleAddSKU = () => {
        if (skuName.trim()) {
            dispatch(addSKU({
                id: Date.now(),   // Unique ID generation
                name: skuName,
                price: skuPrice,
                cost: skuCost
            }));
            setSkuName('');
            setSkuPrice(0);
            setSkuCost(0);
        }
    };

    // Update SKU
    const handleUpdateSKU = () => {
        if (editName.trim()) {
            dispatch(updateSKU({
                id: editingId!,
                name: editName,
                price: editPrice,
                cost: editCost
            }));
            setEditingId(null);
        }
    };

    // Delete SKU
    const handleDeleteSKU = (id: number) => {
        dispatch(deleteSKU(id));
    };

    return (
        <div>
            <h1>SKUs Management</h1>

            {/* Add New SKU Section */}
            <div style={{ marginBottom: '20px' }}>
                <TextField
                    label="SKU Name"
                    value={skuName}
                    onChange={(e) => setSkuName(e.target.value)}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Price"
                    type="number"
                    value={skuPrice}
                    onChange={(e) => setSkuPrice(Number(e.target.value))}
                    sx={{ marginRight: 2 }}
                />
                <TextField
                    label="Cost"
                    type="number"
                    value={skuCost}
                    onChange={(e) => setSkuCost(Number(e.target.value))}
                    sx={{ marginRight: 2 }}
                />
                <Button onClick={handleAddSKU} variant="contained">Add SKU</Button>
            </div>

            {/* SKU List Section */}
            <List>
                {skus.map((sku) => (
                    <ListItem key={sku.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {editingId === sku.id ? (
                            <>
                                <TextField
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <TextField
                                    label="Price"
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(Number(e.target.value))}
                                />
                                <TextField
                                    label="Cost"
                                    type="number"
                                    value={editCost}
                                    onChange={(e) => setEditCost(Number(e.target.value))}
                                />
                                <Button onClick={handleUpdateSKU} variant="contained">Save</Button>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ flexGrow: 1 }}>
                                    {sku.name} - Price: ${sku.price} | Cost: ${sku.cost}
                                </Typography>

                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        setEditingId(sku.id);
                                        setEditName(sku.name);
                                        setEditPrice(sku.price);
                                        setEditCost(sku.cost);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>

                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteSKU(sku.id)}
                                >
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

export default SKUs;
