import React, { useState, useEffect } from 'react';
import { CameraEndpoint } from 'Frontend/generated/endpoints';
import { Button, TextField, Grid, GridColumn, Dialog } from '@vaadin/react-components';
import { TextFieldChangeEvent } from '@vaadin/text-field';
import Camera from "Frontend/generated/com/lcaohoanq/samplewebapplication/models/Camera";

const CameraView: React.FC = () => {
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [newCamera, setNewCamera] = useState<Camera>({ brand: '', model: '', price: 0 });
    const [editCamera, setEditCamera] = useState<Camera | null>(null);
    const [deleteCamera, setDeleteCamera] = useState<Camera | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchCameras().then(r => {}).catch(e => console.error(e));
    }, []);

    const fetchCameras = async () => {
        const fetchedCameras = await CameraEndpoint.findAll();
        const validCameras = fetchedCameras?.filter((camera): camera is Camera => camera !== undefined) || [];
        setCameras(validCameras);
    };

    const handleInputChange = (event: TextFieldChangeEvent) => {
        const { name, value } = event.target;
        setNewCamera({ ...newCamera, [name]: value });
    };

    const handleEditInputChange = (event: TextFieldChangeEvent) => {
        if (editCamera) {
            const { name, value } = event.target;
            setEditCamera({ ...editCamera, [name]: value });
        }
    };

    const handleSubmit = async () => {
        await CameraEndpoint.save(newCamera);
        setNewCamera({ brand: '', model: '', price: 0 });
        fetchCameras();
    };

    const handleUpdate = async () => {
        if (editCamera) {
            await CameraEndpoint.save(editCamera);
            setEditCamera(null);
            setIsDialogOpen(false);
            fetchCameras();
        }
    };

    const handleDelete = async () => {
        if (deleteCamera) {
            await CameraEndpoint.delete(deleteCamera.id!);
            setDeleteCamera(null);
            setIsDeleteDialogOpen(false);
            fetchCameras();
        }
    };

    const handleEdit = (camera: Camera) => {
        setEditCamera(camera);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (camera: Camera) => {
        setDeleteCamera(camera);
        setIsDeleteDialogOpen(true);
    };

    return (
        <div>
            <h1>Camera Store</h1>
            <div>
                <TextField
                    label="Brand"
                    name="brand"
                    value={newCamera.brand}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Model"
                    name="model"
                    value={newCamera.model}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Price"
                    name="price"
                    value={newCamera.price?.toString()}
                    onChange={handleInputChange}
                />
                <Button onClick={handleSubmit}>Add Camera</Button>
            </div>
            <Grid items={cameras}>
                <GridColumn path="brand" header="Brand" />
                <GridColumn path="model" header="Model" />
                <GridColumn path="price" header="Price" />
                <GridColumn header="Actions" renderer={({ item }: { item: Camera }) => (
                    <>
                        <Button onClick={() => handleEdit(item)}>Edit</Button>
                        <Button onClick={() => handleDeleteClick(item)}>Delete</Button>
                    </>
                )} />
            </Grid>
            {editCamera && (
                <Dialog opened={isDialogOpen} onOpenedChanged={({ detail }) => setIsDialogOpen(detail.value)}>
                    <h2>Edit Camera</h2>
                    <TextField
                        label="Brand"
                        name="brand"
                        value={editCamera.brand}
                        onChange={handleEditInputChange}
                    />
                    <TextField
                        label="Model"
                        name="model"
                        value={editCamera.model}
                        onChange={handleEditInputChange}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={editCamera.price?.toString()}
                        onChange={handleEditInputChange}
                    />
                    <Button onClick={handleUpdate}>Update Camera</Button>
                </Dialog>
            )}
            {deleteCamera && (
                <Dialog opened={isDeleteDialogOpen} onOpenedChanged={({ detail }) => setIsDeleteDialogOpen(detail.value)}>
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete the camera {deleteCamera.brand} {deleteCamera.model}?</p>
                    <Button onClick={handleDelete}>Yes</Button>
                    <Button onClick={() => setIsDeleteDialogOpen(false)}>No</Button>
                </Dialog>
            )}
        </div>
    );
};

export default CameraView;