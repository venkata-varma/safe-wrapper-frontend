import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./auth/registerSlice";
import loginReducer from './auth/loginSlice'
import dashboardReducer from './Dashboard slices/dashboardSlice'
import chatRoomsReducer from './Chat/getChatRoomsOfSender';
import getUsersReducer from './Chat/getUsersSlice'
import findOrCreateChatRoomReducer from './Chat/findOrCreateChatRoom'
import getMessagesReducer from './Chat/getMessagesSlice'
import sendMessageReducer from './Chat/sendMessageSlice'
import onlineUsersReducer from  './Chat/onlineUsersSlice'

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login:loginReducer,
    dashboard:dashboardReducer,
    getLatestChatRooms:chatRoomsReducer,
    getUsers:getUsersReducer,
    findOrCreateChatRoom:findOrCreateChatRoomReducer,
    getMessagesOfChat:getMessagesReducer,
    sendMessage:sendMessageReducer,
    onlineUsers:onlineUsersReducer
  },
});