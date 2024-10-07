import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'realTimeNotification',
    initialState: {
        likeNotification: [],
    },
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload === null) {
                state.likeNotification = [];
            } else {
                if (action.payload.type === 'like') {
                    state.likeNotification.push(action.payload);
                } else if (action.payload.type === 'dislike') {
                    state.likeNotification = state.likeNotification.filter((item) => item.userId !== action.payload.userId);
                }
            }
        }
    }
});
export const { setLikeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;