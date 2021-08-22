const io = require("socket.io")(8000, {
    cors: {
        origin: "http://localhost:8000"
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const getUser = (userId) => {
    return users.find(user => use.userId === userId)
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
};

io.on("connection", (socket) => {

    // This is called when User connects
    // return the Id and socketId of a User
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // This is called when User sends a message
    socket.on("sendMessage", ({senderId, receiverId, message}) => {
        const User = getUser(receiverId);
        io.to(User.socketId).emit("getMessage", {
            senderId,
            message
        });
    });

    // This is called when User disconnects
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});
