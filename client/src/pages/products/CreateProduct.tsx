import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavbarComponent from "../../components/Nabar";
import "../../assets/css/CreateProduct.css";
import Footer from "../../components/Footer";
import ProductService from '../../utils/ProductService';
import { toast } from 'react-toastify';

interface CreateProductProps {
    props: {
        userData: any;
        isLoggedIn: boolean;
        setShowPicker: any;
    };
}

interface FormState {
    name: string;
    description: string;
    price: number;
    image: string;
    quantityAvailable: number;
    tags: string[];
}



const CreateProduct: React.FC<CreateProductProps> = ({ props }) => {
    const fileUrl = localStorage.getItem("fileUrl");

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formState, setFormState] = useState<FormState>({
        name: '',
        description: '',
        price: 0,
        image: "",
        quantityAvailable: 0,
        tags: []
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    useEffect(() => {
        if (props.isLoggedIn !== undefined) {
            setLoading(false);
        }
    }, [props.isLoggedIn]);

    const handleSubmit = async (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            console.log("Form submitted successfully!", formState);
            // Here you can make API call to submit the form data.
            const response = await ProductService.createProduct(formState);
            if(response && response.message === "Product created successfully") {
                toast.success("Product created successfully!");
                localStorage.removeItem("fileUrl");
                setTimeout(() => {
                    window.location.replace("/products");
                }, 2000);
            } else {
                toast.error(response.error);
            }
    
        }

        setValidated(true);


    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!props.isLoggedIn) {
        window.location.replace("/login");
        return null;
    }

    return (
        <div className="d-flex justify-content-between flex-column h-100 custom-container">
            <NavbarComponent props={props} />
            <h1 className='text-center'>Have a fresh goods to offer?</h1>
            <h3 className='text-center'>Fill out the form below to get started!</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-4 bg-light shadow-sm rounded custom-form">
                <Col className="mb-3 d-flex flex-column">
                    <Form.Group as={Col} md="4" controlId="validationCustom01" className="mb-3">
                        <Form.Label className="form-label-create">Product Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Product name"
                            className="custom-input"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02" className="mb-3">
                        <Form.Label className="form-label-create">Description:</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            placeholder="Describe your beautiful product here!"
                            className="custom-input"
                            name="description"
                            value={formState.description}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername" className="mb-3">
                        <Form.Label className="form-label-create">Price Per Item:</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="12.50"
                                aria-describedby="inputGroupPrepend"
                                required
                                className="custom-input"
                                name="price"
                                value={formState.price}
                                onChange={handleInputChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a price per item.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col className="mb-3 d-flex flex-column">
                    <Form.Group as={Col} md="4" controlId="validationCustom03" className="mb-3">
                        <Form.Label className="form-label-create">How many do you have?</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="100"
                            required
                            className="custom-input"
                            name="quantityAvailable"
                            value={formState.quantityAvailable}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid quantity.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom04" className="mb-3">
                        <Form.Label className="form-label-create">Tags
                            <small className="text-muted"> (This helps users find your product)</small>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ghost pepper, spicy, hot, organic, etc."
                            className="custom-input"
                            name="tags"
                            value={formState.tags}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom05" className="mb-3 d-flex flex-column">
                        <Form.Label className="form-label-create">Upload an image: </Form.Label>
                        {fileUrl && (fileUrl !== "" ? <img src={fileUrl} alt="product" className="uploaded-image" /> : null)}

                        <Button className="custom-button" onClick={() => props.setShowPicker(true)}>Upload</Button>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid image.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col className="d-flex flex-column">
                    <Button type="submit" className="mt-3 custom-button">Add new Product</Button>
                </Col>
            </Form>
            <Footer />
        </div>
    );
}

export default CreateProduct;