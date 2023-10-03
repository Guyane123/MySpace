import {
    Post,
    Conversations,
    Messages,
    User,
    Notification,
    Setting,
} from "@prisma/client";

type PostType = Post;
type ConversationType = Conversations;
type MessageType = Messages;
type UserType = User;
type NotificationType = Notification;
type SettingType = Setting;

export type {
    PostType,
    ConversationType,
    MessageType,
    UserType,
    NotificationType,
    SettingType,
};
