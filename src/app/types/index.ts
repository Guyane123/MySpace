import {
    Post,
    Conversations,
    Messages,
    User,
    Notification,
} from "@prisma/client";

type PostType = Post;
type ConversationType = Conversations;
type MessageType = Messages;
type UserType = User;
type NotificationType = Notification;

export type {
    PostType,
    ConversationType,
    MessageType,
    UserType,
    NotificationType,
};
