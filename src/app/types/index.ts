import { Post, Conversations, Messages, User } from "@prisma/client";

type PostType = Post;
type ConversationType = Conversations;
type MessageType = Messages;
type UserType = User;

export type { PostType, ConversationType, MessageType, UserType };
