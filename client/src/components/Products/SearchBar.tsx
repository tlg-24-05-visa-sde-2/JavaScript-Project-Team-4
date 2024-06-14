import React, {useRef} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductService from "../../utils/ProductService";

interface SearchBarProps {
    setProducts: any;
}

function SearchBar({ setProducts }: SearchBarProps): React.ReactElement {

    const inputRef = useRef<HTMLInputElement>(null);

    const searchedProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchValue = inputRef.current?.value ?? "";
       
        if (searchValue === "") {
            ProductService.getAllProducts().then((response) => {
                setProducts(response.products);
            });
            return;
        };

        try {
            const response = await ProductService.searchProducts(searchValue);
            setProducts(response.products); // Assuming response.products is an array of products
        } catch (error) {
            console.error("Error searching for products:", error);
        }
    };

    return (
        <Form className="align-self-center mt-3 mb-3 searchbar-custom" onSubmit={searchedProduct}>
            <Row>
                <Col xs="auto">
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        ref={inputRef}
                    />
                </Col>
                <Col xs="auto">
                    <Button className="button-search-custom" type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchBar;