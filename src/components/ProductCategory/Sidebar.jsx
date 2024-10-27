import axios from "axios";
import React, { useState, useEffect } from "react";

const Sidebar = ({ onProductsFetch }) => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [selectedPrice, setSelectedPrice] = useState(""); 
    const [hovered, setHovered] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/categories"
            );
            const data = response.data.data.documents;
            setCategories(data);
        } catch (error) {
            console.error("Error fetching Categories:", error);
        }
    };

    const handleCategoryClick = (category_id) => {
        setCategoryId(category_id);
    };

    const handlePriceChange = async (priceRange) => {
        setSelectedPrice(priceRange); 
        let priceFilter = "";

        switch (priceRange) {
            case "Under50":
                priceFilter = "price[lt]=50";
                break;
            case "50to100":
                priceFilter = "price[gte]=50&price[lte]=100";
                break;
            case "100to300":
                priceFilter = "price[gte]=100&price[lte]=300";
                break;
            case "300to900":
                priceFilter = "price[gte]=300&price[lte]=900";
                break;
            case "900to2000":
                priceFilter = "price[gte]=900&price[lte]=2000";
                break;
            default:
                priceFilter = ""; 
                break;
        }

        try {
            if (subCategoryId) {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/subcategories/${subCategoryId}/products/subcategory?${priceFilter}`
                );
                const data = response.data.data.documents;
                onProductsFetch(data); 
            } else {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/products?${priceFilter}`
                );
                const data = response.data.data.documents;
                onProductsFetch(data); 
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            if (categoryId) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/api/v1/categories/${categoryId}/subcategories`
                    );
                    const data = response.data.data.documents;
                    setSubCategories(data);
                } catch (error) {
                    console.error("Error fetching SubCategories:", error);
                }
            }
        };

        fetchSubCategories();
    }, [categoryId]);

    const handleSubCategoryClick = (subCategory_id) => {
        setSubCategoryId(subCategory_id);
    };

    useEffect(() => {
        const fetchProductsSubCategory = async () => {
            if (subCategoryId) {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/api/v1/subcategories/${subCategoryId}/products/subcategory`
                    );
                    const data = response.data.data.documents;
                    onProductsFetch(data); 
                } catch (error) {
                    console.error("Error fetching ProductsSubCategories:", error);
                }
            }
        };

        fetchProductsSubCategory();
    }, [subCategoryId]);

    return (
        <div className="bg-light shadow-sm" style={{ minHeight: "100vh" }}>
            <nav id="sidebar" className="p-3">
                <div
                    className="sidebar-header text-white p-3 rounded mb-3"
                    style={{
                        backgroundColor: "#EF9E86",
                    }}
                >
                    <button className="btn btn-lg text-uppercase w-100">
                        Categories
                    </button>
                </div>

                <ul className="list-unstyled">
                    {categories.map((category) => (
                        <li key={category._id} className="mb-2">
                            <button
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#categorySubmenu-${category._id}`}
                                aria-expanded={categoryId === category._id ? "true" : "false"}
                                className={`dropdown-toggle btn btn-block w-100 d-flex justify-content-between align-items-center ${categoryId === category._id
                                        ? "active bg-secondary text-white rounded"
                                        : ""
                                    }`}
                                onClick={() => handleCategoryClick(category._id)}
                                onMouseEnter={() => setHovered(category._id)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    transition: "all 0.3s ease",
                                    padding: "0.75rem 1rem",
                                    backgroundColor:
                                        hovered === category._id ? "#EF9E86" : "transparent",
                                    color: hovered === category._id ? "#fff" : "",
                                }}
                            >
                                <span>
                                    <i className="bi bi-folder-fill me-2"></i>
                                    {category.name}
                                </span>
                                <i
                                    className={`bi ${categoryId === category._id
                                            ? "bi-caret-up-fill"
                                            : "bi-caret-down-fill"
                                        }`}
                                ></i>
                            </button>

                            <ul
                                className={`collapse list-unstyled ${categoryId === category._id ? "show" : ""
                                    }`}
                                id={`categorySubmenu-${category._id}`}
                            >
                                {categoryId === category._id &&
                                    subCategories.map((subCategory) => (
                                        <li key={subCategory._id} className="mt-1">
                                            <button
                                                className="btn btn-sm btn-outline-secondary w-100 text-start"
                                                onClick={() => handleSubCategoryClick(subCategory._id)}
                                                onMouseEnter={() => setHovered(subCategory._id)}
                                                onMouseLeave={() => setHovered(null)}
                                                style={{
                                                    padding: "0.5rem 1rem",
                                                    transition: "all 0.3s ease",
                                                    backgroundColor:
                                                        hovered === subCategory._id ? "#EF9E86" : "",
                                                    color: hovered === subCategory._id ? "#fff" : "",
                                                }}
                                            >
                                                <i className="bi bi-tag-fill me-2"></i>
                                                {subCategory.name}
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                {/* Price Filter */}
                <div>
                    <div
                        className="sidebar-header text-white p-3 rounded mb-3"
                        style={{
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        <h1 className="btn btn-lg text-uppercase w-100">Price</h1>
                    </div>
                    <div className="card shadow-sm p-3 mb-4">
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="price"
                                            id="priceUnder50"
                                            onChange={() => handlePriceChange("Under50")}
                                        />
                                        <label className="form-check-label" htmlFor="priceUnder50">
                                            Under: $50
                                        </label>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="price"
                                            id="price50to100"
                                            onChange={() => handlePriceChange("50to100")}
                                        />
                                        <label className="form-check-label" htmlFor="price50to100">
                                            $50 - $100
                                        </label>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="price"
                                            id="price100to300"
                                            onChange={() => handlePriceChange("100to300")}
                                        />
                                        <label className="form-check-label" htmlFor="price100to300">
                                            $100 - $300
                                        </label>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="price"
                                            id="price300to900"
                                            onChange={() => handlePriceChange("300to900")}
                                        />
                                        <label className="form-check-label" htmlFor="price300to900">
                                            $300 - $900
                                        </label>
                                    </div>
                                </li>
                                <li className="mb-3">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="price"
                                            id="price900to2000"
                                            onChange={() => handlePriceChange("900to2000")}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="price900to2000"
                                        >
                                            $900 - $2000
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
