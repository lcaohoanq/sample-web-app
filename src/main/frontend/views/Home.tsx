import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import React, { useEffect, useState } from "react";
import Camera from "Frontend/generated/com/lcaohoanq/samplewebapplication/models/Camera";
import { CameraEndpoint } from "Frontend/generated/endpoints";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

export const config: ViewConfig = {
    menu: { order: 3, icon: "line-awesome/svg/file.svg" },
    title: "Home",
};

const HomeView: React.FC = () => {
    const [cameras, setCameras] = useState<Camera[]>([]);

    useEffect(() => {
        fetchCameras()
            .then((r) => {})
            .catch((e) => console.error(e));
    }, []);

    const fetchCameras = async () => {
        const fetchedCameras = await CameraEndpoint.findAll();
        const validCameras =
            fetchedCameras?.filter(
                (camera): camera is Camera => camera !== undefined,
            ) || [];
        setCameras(validCameras);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Camera Collection
            </Typography>
            <Grid container spacing={4}>
                {cameras.map((camera) => (
                    <Grid item xs={12} sm={6} md={4} key={camera.id}>
                        <Card className="shadow-lg">
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    gutterBottom
                                >
                                    {camera.brand} {camera.model}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {camera.description}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    className="mt-4 text-green-500"
                                >
                                    ${camera.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    component={Link}
                                    to={`/cart/${camera.id}`}
                                >
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default HomeView;
