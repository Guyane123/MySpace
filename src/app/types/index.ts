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

// interface UIEventVirtualKeyboard extends UIEvent {
//     target: {

//     }
// }

interface virtualKeyboard {
    boundingRect: DOMRect;
    ongeometrychange: Event | null;
    overlaysContent: boolean;
    addEventListener: (e: "ongeometrychange", f: (e: UIEvent) => void) => void;
}
interface virtualKeyboardTarget extends Event, virtualKeyboard {}

interface ExtendedNavigator extends Navigator {
    virtualKeyboard: virtualKeyboard;
}

export type {
    PostType,
    ConversationType,
    MessageType,
    UserType,
    NotificationType,
    SettingType,
    LikeType,
    ImageType,
    ExtendedNavigator,
    virtualKeyboard,
    virtualKeyboardTarget,
};

