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
import { EventHandler } from "react";

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

// interface virtualKeyboard {
//     boundingRect: DOMRect;
//     ongeometrychange: (event: Event) => void;
//     overlaysContent: boolean;
//     addEventListener: (e: "ongeometrychange", f: (e: UIEvent) => void) => void;
// }
// interface virtualKeyboardTarget extends Event, virtualKeyboard {}

// interface ExtendedNavigator extends Navigator {
//     virtualKeyboard: virtualKeyboard;
// }

declare global {
    interface Navigator {
        virtualKeyboard: VirtualKeyboard;
    }

    interface VirtualKeyboard extends EventTarget {
        show(): void;
        hide(): void;
        readonly boundingRect: DOMRect;
        overlaysContent: boolean;
        ongeometrychange: EventHandler<
            React.SyntheticEvent<GeometryChangeEvent, Event>
        >;
    }

    interface ElementContentEditable extends Element {
        virtualKeyboardPolicy: "auto" | "manual" | "";
    }

    interface GeometryChangeEvent extends Event {
        // Define any specific properties related to the geometry change event
        // For example, you might want to include information about the new boundingRect

        el: {
            target: VirtualKeyboard;
        };
        newBoundingRect: DOMRect;
    }
}

export {};

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

