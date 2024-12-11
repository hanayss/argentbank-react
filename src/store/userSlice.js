import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        connectUser: (state, action) => {
            state.value = action.payload;
        },
        disconnectUser: (state) => {
            state.value = undefined;
        },
    },
});

// Action creators are generated for each case reducer function
export const { connectUser, disconnectUser } = userSlice.actions;

export const fetchToConnectUser =
    (token, rememberMe = false) =>
    async (dispatch) => {
        const response = await fetch(
            "http://localhost:3001/api/v1/user/profile",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const dataUser = await response.json();

        if (dataUser?.status === 200) {
            if (rememberMe) {
                localStorage.setItem("token", token);
            }

            dispatch(connectUser({ ...dataUser?.body, token: token }));
        } else {
            localStorage.removeItem("token");
        }
    };

export const updateUserName = (newUsername) => async (dispatch, getState) => {
    const { user } = getState();
    console.log("user =>", user);
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.value.token}`,
        },
        body: JSON.stringify({
            userName: newUsername,
        }),
    });
    const data = await response.json();

    console.log("data =>", data);
    if (data?.status === 200) {
        dispatch(connectUser({ ...data.body, token: user.value.token }));
    }
};

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
