

import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import style from '../addProduct/addProduct.module.css';
import styles from '../../pages/Login/login.module.css';
import FormController from '../formConteoller/formController';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { data } from 'jquery';
const UpdateProduct = () => {
    const [mainCategories, setMainCategories] = useState([]);
    const [subCategoriesfe, setSubCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('')
    const [tempColor, setTempColor] = useState('')
    const [tempSize, setTempSize] = useState('')
    const [imageCoverCopy, setImageCover] = useState("");
    const [imageCoverCopyShow, setImageCovershow] = useState("");
    const [multiImagesCopy, setImages] = useState([]);
    const [multiImagesCopyShow, setImagesShow] = useState([]);
    const userId = Cookies.get('userId')
    const [productData, setProductData] = useState()
    const navigate = useNavigate()


    const { productId } = useParams()
    const fetchProductData = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${productId}`, {
            withCredentials: true,
        });
        return response.data;
    }
    const { data: fetchedData } = useQuery('fetch-product-data', fetchProductData, {
        onSuccess: (res) => {
            setProductData(res.data);
        }
    })

    useEffect(() => {
        if (productData) {
            setImageCover(productData.imageCover)
            setImageCovershow(productData.imageCover)
            setImages(productData.images)
            setImagesShow(productData.images)

        }
    }, [productData])

    const initialValues = productData ? {
        title: productData.title || '',
        description: productData.description || "",
        price: productData.price || "",
        priceAfterDisc: productData.priceAfterDisc || "",
        discount: productData.discount || "",
        colors: productData.colors || "",
        size: productData.size || "",
        imageCover: "",
        images: [],
        stock: productData.stock || "",
        category: categoryId || (productData?.category?.name || ""),
        subcategories: productData.subcategories || "",
        brand: productData.brand || "",
    } : {
        title: '',
        description: "",
        price: "",
        priceAfterDisc: "0",
        discount: "0",
        colors: [],
        size: [],
        imageCover: "",
        images: [],
        stock: "",
        category: "",
        subcategories: [],
        brand: "",
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Required").min(3, "Invalid Product name").max(100, "Invalid Product name").trim(),
        description: Yup.string().required("Required").min(3, "Invalid description").trim(),
        price: Yup.number().required("Required").positive("Not valid price"),
        priceAfterDisc: Yup.number(),
        discount: Yup.number().min(0).max(100),
        imageCover: Yup.mixed(),
        images: Yup.array().of(Yup.mixed()).max(2),
        stock: Yup.number().required("Required"),
        category: Yup.string().required("Required"),
        subcategories: Yup.array().required("Required").min(1),
        brand: Yup.string(),
        size: Yup.array().of(Yup.string().oneOf(['sm', 'md', 'lg', 'xl'], "invalid")),
        colors: Yup.array().of(Yup.string()),
    });


    const onSubmit = (values) => {
        if (imageCoverCopy && userId) {


            const updatedValue = {
                ...values,
                imageCover: imageCoverCopy,
                images: [...multiImagesCopy],
                sellerId: userId
            }
            mutation.mutate(updatedValue)
        } else {
            toast.error("image cover required")
        }
    };
    const updateProduct = async (product) => {
        let response = await axios.put(`http://localhost:3000/api/v1/products/${productId}`, product, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },

        })
        return response.data;
    }
    const mutation = useMutation(updateProduct, {
        onSuccess: (res) => {
            toast.success("Product updated successfully!");
            navigate('/profile/' + userId + '/seller-products');
        },
        onError: (err) => {
            console.log(err);
            toast.error("Failed to update product!");
        },
    })

    //get all categories
    const getAllCategoires = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/categories/', {
            withCredentials: true,
        })
        return response.data;

    }
    useQuery(['get-categories', fetchedData], getAllCategoires, {
        onSuccess: (res) => {

            const fetchMainCategories = res.data.documents.map((category) => {
                return { key: category.name, value: category._id };
            });
            setMainCategories(fetchMainCategories)
            if (productData) {

                const ca = res.data.documents.filter((category, index) => category.name === productData.category.name)
                setCategoryId(ca[0]._id)

            }
        },
        onError: (err) => {
            console.error(err)
        }
    })

    let fullMainCategoriesoption = [
        { key: "select cat", value: '' },
        ...mainCategories
    ]

    const getAllSubCategoreisforCategory = async () => {
        let response = await axios.get(`http://localhost:3000/api/v1/categories/${categoryId}/subcategories`, {
            withCredentials: true,
        })
        return response.data;
    }
    useQuery(['get-subcategories', categoryId], getAllSubCategoreisforCategory, {
        onSuccess: (res) => {

            const fetchSubCategories = res.data.documents.map((subcategory) => {
                return { key: subcategory.name, value: subcategory._id };
            });
            setSubCategories(fetchSubCategories)
        },
        onError: (err) => {
            console.error(err)
        }
    })

    let fullSubCategoriesoption = [
        { key: "select sub catategory", value: '' },
        ...subCategoriesfe
    ]

    return (
        <div className={style.AddProduct}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                {({ values, setFieldValue, isValid, handleSubmit }) => {
                    const handleAddSize = (e) => {
                        e.preventDefault();
                        const newSize = tempSize.trim();
                        if (newSize && !values.size.includes(newSize)) {
                            setFieldValue("size", [...values.size, newSize]);
                            setTempSize("")
                        }
                    };
                    const isAddSizeButtonDisabled = !['sm', 'md', 'lg', 'xl'].includes(tempSize) || values.size.includes(tempSize);
                    const handleDeleteSize = (size) => {
                        setFieldValue('size', values.size.filter(sizevalues => sizevalues !== size))
                    }

                    const handleAddColor = (e) => {
                        e.preventDefault();
                        const newColor = tempColor.trim();
                        if (newColor && !values.colors.includes(newColor)) {
                            setFieldValue("colors", [...values.colors, newColor]);
                            setTempColor('');
                        }
                    };
                    const handleDeleteColor = (color) => {
                        setFieldValue('colors', values.colors.filter(colorvalues => colorvalues !== color))
                    }
                    const isAddColorButtonDisabled = !tempColor.trim() || values.colors.includes(tempColor.trim());

                    // handle image Cover
                    const handleImageChange = (event) => {
                        const file = event.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            setImageCover(file)
                            reader.onloadend = () => {
                                setImageCovershow(reader.result)
                            };

                            reader.readAsDataURL(file);
                        }
                    };



                    // handle Images 
                    const handleImagesChange = (event) => {
                        const file = event.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                if (reader.result && !multiImagesCopyShow.includes(reader.result) && multiImagesCopy.length < 2) {
                                    setImages(prevImages => [...prevImages, file])
                                    setImagesShow(prevImages => [...prevImages, reader.result])
                                } else {
                                    toast.error("you can't add more than 2 images and can't add dublicated")
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    const handleRemoveImage = (imageToRemove, idxtoremove) => {
                        setImagesShow(prevImages => prevImages.filter(image => image !== imageToRemove));
                        setImages(prevFiles => prevFiles.filter((_, index) => index !== idxtoremove));
                    };


                    const chooseCategory = (e) => {
                        setFieldValue('category', e.target.value)
                        setCategoryId(e.target.value)
                    }
                    const handleDiscountChange = () => {
                        if (values.discount && values.price) {
                            if (values.price > 0 && values.discount >= 0 && values.discount <= 90) {
                                let discountedPrice = values.price - ((values.discount / 100) * values.price)
                                setFieldValue('priceAfterDisc', discountedPrice)
                            }
                        }
                    }


                    return (
                        <form onSubmit={handleSubmit} className={style.formAddProduct}>
                            <div className={style.formAddProductContainer}>
                                <div>
                                    <div className={style.formGroup}>
                                        <div className={style.formInput}>
                                            <label htmlFor="title">Product Title</label>
                                            <FormController
                                                control="input"
                                                type="text"
                                                name="title"
                                                id="title"
                                                className={` ${styles.input} ${style.addProductInupt}`}
                                                divStyle={styles.formControl}
                                            />
                                        </div>
                                        <div className={style.formInput}>
                                            <label htmlFor='description'>Description</label>
                                            <FormController
                                                control="textarea"
                                                name="description"
                                                id="description"
                                                className={`${styles.textArea} ${style.addProductInupt}`}
                                                divStyle={styles.formControl}
                                            />
                                        </div>
                                        <div className={style.formSubGroup}>
                                            <div className={style.subGroup}>
                                                <label htmlFor='size'>Size</label>
                                                <div>
                                                    <FormController
                                                        control="input"
                                                        name="size"
                                                        placeholder="size"
                                                        id="size"
                                                        className={`${style.formGroubSubInput} ${style.size}`}

                                                        value={tempSize}
                                                        onChange={(e) => setTempSize(e.target.value)}
                                                    />
                                                    <button onClick={handleAddSize} disabled={isAddSizeButtonDisabled}><i className="fa-solid fa-plus"></i> </button>
                                                </div>
                                                <div>
                                                    <div style={{ padding: "10px 0" }} >
                                                        {values.size.map((s, i) => (
                                                            <span key={i} className={style.displaySizes} onDoubleClick={() => handleDeleteSize(s)}>{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.subGroup}>

                                                <label htmlFor='color' className={style.colorLabel}>Color</label>
                                                <div>
                                                    <FormController
                                                        control="input"
                                                        type="color"
                                                        name="colors"
                                                        placeholder="color"
                                                        id="color"
                                                        className={` ${style.formGroubSubInput} ${style.colorInput}`}
                                                        value={tempColor}
                                                        onChange={(e) => setTempColor(e.target.value)}
                                                    />
                                                    <button onClick={handleAddColor} disabled={isAddColorButtonDisabled}><i className="fa-solid fa-plus"></i> </button>
                                                </div>
                                                <div>
                                                    <div style={{ padding: "10px 0" }}>
                                                        {values.colors.map((c, i) => (
                                                            <span key={i} onDoubleClick={() => handleDeleteColor(c)} style={{
                                                                backgroundColor: c, display: "inline-block", width: "20px", height: "20px", marginRight: "10px"
                                                            }}></span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={` ${style.formSubGroup}`}>
                                        <div className={style.priceConatiner}>
                                            <div className={style.subGroup}>
                                                <label htmlFor="price">Price</label>
                                                <FormController
                                                    control="input"
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    min="1"
                                                    className={` ${styles.input} ${style.addProductInupt}`}
                                                    divStyle={styles.formControl}
                                                    onBlur={handleDiscountChange}
                                                />
                                            </div>
                                            <div className={style.subGroup}>
                                                <label htmlFor="discount">discount</label>
                                                <FormController
                                                    control="input"
                                                    type="number"
                                                    name="discount"
                                                    id="discount"
                                                    min="0"
                                                    max="90"
                                                    className={` ${styles.input} ${style.addProductInupt}`}
                                                    divStyle={styles.formControl}
                                                    onBlur={handleDiscountChange}
                                                />
                                            </div>
                                        </div>
                                        <div className={style.priceConatiner}>

                                            <div className={style.subGroup}>
                                                <label htmlFor="priceAfterDisc">priceAfterDisc</label>
                                                <FormController
                                                    control="input"
                                                    type="number"
                                                    name="priceAfterDisc"
                                                    id="priceAfterDisc"
                                                    readonly='readonly'
                                                    className={` ${styles.input} ${style.addProductInupt}`}
                                                    divStyle={styles.formControl}

                                                />
                                            </div>
                                            <div className={style.subGroup}>
                                                <label htmlFor="stock">stock</label>
                                                <FormController
                                                    control="input"
                                                    type="number"
                                                    name="stock"
                                                    id="stock"
                                                    min="1"
                                                    className={` ${styles.input} ${style.addProductInupt}`}
                                                    divStyle={styles.formControl}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={` mt-3 ${style.formGroup}`}>
                                        <div >
                                            <label htmlFor="brand">brand</label>
                                            <FormController
                                                control="input"
                                                type="text"
                                                name="brand"
                                                id="brand"
                                                className={` ${styles.input} ${style.addProductInupt}`}
                                                divStyle={styles.formControl}
                                            />
                                        </div>
                                        <div >
                                            <label htmlFor="category">category</label>
                                            <FormController
                                                name="category"
                                                control="select"
                                                id="category"
                                                options={fullMainCategoriesoption}
                                                selectClass={styles.select}
                                                optionClass={styles.option}
                                                divStyle={styles.formControl}
                                                onChange={chooseCategory}
                                                disabled
                                            />
                                        </div>
                                        <div  >

                                            <label htmlFor="subCategories">sub category</label>
                                            <FormController
                                                name="subcategories"
                                                control="select"
                                                id="subCategories"
                                                options={fullSubCategoriesoption}
                                                selectClass={styles.select}
                                                optionClass={styles.option}
                                                divStyle={styles.formControl}
                                                multiple
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <div className={style.formGroup}>
                                        <div className={`d-flex flex-column  justify-content-center align-items-center`} >
                                            <div className={style.formInput}>
                                                <label htmlFor="imageCover" className={style.uploadImgProduct}><i class="fa-solid fa-cloud-arrow-up"></i> click here to upload image cover</label>
                                                <FormController
                                                    control="input"
                                                    type="file"
                                                    name="imageCover"
                                                    id="imageCover"
                                                    className={` ${styles.input} ${style.addProductInupt}`}
                                                    divStyle={styles.formControl}
                                                    hidden
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                            <div

                                                style={{
                                                    display: imageCoverCopyShow ? 'block' : 'none',
                                                    backgroundImage: imageCoverCopyShow ? `url(${imageCoverCopyShow})` : 'none',
                                                    width: '75%',
                                                    height: '150px',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    margin: "0 0 20px 25px",
                                                    padding: '0',
                                                    alignSelf: 'start',

                                                }}
                                            ></div>

                                        </div>
                                    </div>
                                    <div className={style.formGroup} style={{ padding: "55px 0" }}>
                                        <div className={`d-flex flex-column  justify-content-center align-items-center`} >
                                            <div className={style.formInput}>
                                                <label htmlFor="images" className={style.uploadImgProduct}><i class="fa-solid fa-cloud-arrow-up"></i> click here to upload multi images </label>
                                                <FormController
                                                    control="input"
                                                    type="file"
                                                    name="images"
                                                    id="images"
                                                    className={` ${styles.input} ${style.addProductInupt}`}
                                                    divStyle={styles.formControl}
                                                    hidden
                                                    multiple
                                                    onChange={handleImagesChange}
                                                />
                                            </div>
                                            <div style={{
                                                display: multiImagesCopyShow.length > 0 ? 'flex' : 'none',
                                                display: "flex",
                                                width: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: "20px",
                                            }}>
                                                {

                                                    multiImagesCopyShow.map((image, index) => (
                                                        <div
                                                            key={index}
                                                            onDoubleClick={() => handleRemoveImage(image, index)}
                                                            style={{
                                                                backgroundImage: multiImagesCopyShow ? `url(${image})` : 'none',
                                                                width: '45%',
                                                                height: '150px',
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',

                                                            }}
                                                        ></div>
                                                    ))
                                                }

                                            </div>

                                        </div>
                                    </div>
                                    {/* <div >
                                        <div >
                                            <label htmlFor="brand">brand</label>
                                            <FormController
                                                control="input"
                                                type="text"
                                                name="brand"
                                                id="brand"
                                                className={` ${styles.input} ${style.addProductInupt}`}
                                                divStyle={styles.formControl}
                                            />
                                        </div>
                                        <div >
                                            <label htmlFor="category">category</label>
                                            <FormController
                                                name="category"
                                                control="select"
                                                id="category"
                                                options={fullMainCategoriesoption}
                                                selectClass={styles.select}
                                                optionClass={styles.option}
                                                divStyle={styles.formControl}
                                                onChange={chooseCategory}
                                                disabled
                                            />
                                        </div>
                                        <div >

                                            <label htmlFor="subCategories">sub category</label>
                                            <FormController
                                                name="subcategories"
                                                control="select"
                                                id="subCategories"
                                                options={fullSubCategoriesoption}
                                                selectClass={styles.select}
                                                optionClass={styles.option}
                                                divStyle={styles.formControl}
                                                multiple
                                            />
                                        </div>

                                    </div> */}

                                </div>
                            </div>

                            <button type="submit" className={styles.submit} disabled={!isValid}>update product</button>

                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default UpdateProduct;

