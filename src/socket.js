import { io } from "socket.io-client";
let renderLocalHostUrl="https://safe-wrapper-backend.onrender.com"
export const socket = io(renderLocalHostUrl);