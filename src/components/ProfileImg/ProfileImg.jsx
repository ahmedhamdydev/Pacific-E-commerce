import style from "../../components/UpdateProfile/updarePrpfile.module.css"
const ProfileImage = ({ profilePicture, setProfilePicture, onDelete }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={style.ProfileImg}>
            <img src={profilePicture} alt="Profile" />
            <div>
                <label htmlFor="profilePicture" className={style.imgBtn}>Choose Image</label>
                <input
                    type="file"
                    id="profilePicture"
                    onChange={handleFileChange}
                    hidden
                />
                <button type="button" onClick={onDelete} className={style.imgBtn}>
                    <i className="fa-solid fa-trash"></i> Delete
                </button>
            </div>
        </div>
    );
};
export default ProfileImage