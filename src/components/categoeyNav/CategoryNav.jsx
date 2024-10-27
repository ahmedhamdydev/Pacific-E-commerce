import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import styles from './categorynav.module.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CategoryNav = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategoriesfe, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const getAllCategoires = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/categories/', {
            withCredentials: true,
        });
        return response.data;
    };

    useQuery('get-categories', getAllCategoires, {
        onSuccess: (res) => {
            const fetchMainCategories = res.data.documents.map((category) => {
                return { key: category.name, value: category._id };
            });
            setMainCategories(fetchMainCategories);
        },
        onError: (err) => {
            console.error(err);
        },
    });
    const toggleCategoriesDropdown = (e) => {
        e.stopPropagation();
        setShowCategoriesDropdown(!showCategoriesDropdown);
    };
    
    const handleOutsideClick = (e) => {
        if (!e.target.closest(`.${styles.categoryDropdown}`)) {
            setShowCategoriesDropdown(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    //sub categories
    const getAllSubCategoreisforCategory = async (id) => {
        let response = await axios.get(`http://localhost:3000/api/v1/categories/${id}/subcategories`, {
            withCredentials: true,
        });
        return response.data;
    };

    const { refetch: fetchSubCategories } = useQuery(
        ["get-subcategories", categoryId],
        () => getAllSubCategoreisforCategory(categoryId),
        {
            enabled: !!categoryId,
            onSuccess: (res) => {
                const fetchedSubCategories = res.data.documents.map((subcategory) => {
                    return { key: subcategory.name, value: subcategory._id };
                });
                setSubCategories(fetchedSubCategories);
            },
            onError: (err) => {
                console.error(err);
            },
        }
    );
    const handleCategoryHover = (id) => {
        setCategoryId(id);
        setHoveredCategory(id);
        fetchSubCategories();
        setShowSubCategories(true);
    };

    const handleCategoryLeave = () => {
        setShowSubCategories(false);
    };

    const navigate = useNavigate()


    const handleSubCatgoryId = (subcategoryId) => {
        navigate('/ProductCategory', { state: { subcategoryId, searchValue: null } });
    };


    return (
        <div className={styles.categoriesContainer}>
            <div className={`${styles.categoryDropdown}`}>
                <div
                    className={styles.categoryDropdownToggle}
                    onClick={toggleCategoriesDropdown}
                >
                    Select Category <i class="fa-solid fa-caret-down"></i>
                </div>
                {showCategoriesDropdown && (
                    <div className={styles.categoriesDropdownMenu}>
                        {mainCategories.length > 0 ? (
                            mainCategories.map((category, idx) => (
                                <div
                                    key={idx}
                                    className={styles.categoryItem}
                                    onMouseEnter={() => handleCategoryHover(category.value)}
                                    onMouseLeave={handleCategoryLeave}
                                >
                                    {category.key}
                                    {showSubCategories && hoveredCategory === category.value && (
                                        <div className={styles.subCategoryDropdown}>
                                            {subCategoriesfe.length ? (
                                                subCategoriesfe.map((subCategory, subIdx) => (
                                                    <div key={subIdx} className={styles.subCategoryItem}
                                                        onClick={() => handleSubCatgoryId(subCategory.value)}
                                                    >
                                                        {subCategory.key}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No subcategories</div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>Loading categories...</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryNav
