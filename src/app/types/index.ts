import {
    Post,
    Conversation,
    Messages,
    User,
    Notification,
    Setting,
    Like,
    Image,
} from "@prisma/client";

type PostType = Post;
type ConversationType = Conversation;
type MessageType = Messages;
type UserType = User;
type NotificationType = Notification;
type SettingType = Setting;
type LikeType = Like;
type ImageType = Image;

export type {
    PostType,
    ConversationType,
    MessageType,
    UserType,
    NotificationType,
    SettingType,
    LikeType,
    ImageType,
};
