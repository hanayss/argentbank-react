import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserName } from "../../store/userSlice";
import InputEdit from "./InputEdit";

const HeaderUser = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [editUserName, setEditUserName] = useState(user?.userName);
    const [editMode, setEditMode] = useState(false);
    if (editMode) {
        return (
            <>
                <p>Edit user info</p>
                <InputEdit
                    label="User name"
                    value={editUserName}
                    onChange={(e) => setEditUserName(e.target.value)}
                    className="input-edit"
                />
                <InputEdit
                    label="First name"
                    value={user?.firstName}
                    disabled
                    className="input-edit-disabled"
                />
                <InputEdit
                    label="Last name"
                    value={user?.lastName}
                    disabled
                    className="input-edit-disabled"
                />
                <div>
                    <button
                        onClick={() => {
                            dispatch(updateUserName(editUserName)).then(() => {
                                setEditMode(false);
                            });
                        }}
                        className="edit-save-cancel-button"
                    >
                        Save
                    </button>
                    <button
                        className="edit-save-cancel-button"
                        onClick={() => setEditMode(false)}
                    >
                        Cancel
                    </button>
                </div>
            </>
        );
    }
    return (
        <>
            <h1>
                Welcome back
                <br />
                {user.firstName} {user.lastName}
            </h1>
            <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit Username
            </button>
        </>
    );
};
export default HeaderUser;
