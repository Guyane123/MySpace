/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import styles from "./page.module.css";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { SendMessage } from "@/components/Buttons/Buttons";
import Post from "@/components/Post/Post";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { fetchPosts } from "@/app/api/fetchPosts";
import LoadMore from "@/components/LoadMore/LoadMore";
import Posts from "@/components/Posts/Posts";
import fetchUser from "@/app/api/fetchUser";
import CheckIfAdmin from "../../../../../lib/CheckIfAdmin";
import Link from "next/link";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const user = await fetchUser(params.id);
    const { name } = user ?? {};

    return { title: `user profile of ${name}` };
}

export default async function UserProfile({ params }: Props) {
    const user = await fetchCurrentUser(params.id);

    const currentUser = await fetchCurrentUser();

    const { name, image, bio, createdAt, role, followedBy, following } =
        user ?? {};

    const posts = await fetchPosts(0, params.id);

    return (
        <div className={styles.user}>
            <div>
                <div>
                    <div className={styles.center}>
                        <div className={styles.images}>
                            <img
                                src={
                                    user?.bannerImage
                                        ? user.bannerImage
                                        : "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
                                }
                                className={styles.bannerImage}
                                alt={`${name}'s profile`}
                                width={"50vw"}
                                height={132}
                            />
                            <img
                                src={
                                    user?.image
                                        ? user.image
                                        : "https://thispersondoesnotexist.com"
                                }
                                alt={`${name}'s profile`}
                                className={styles.userImage}
                                width={112}
                                height={112}
                            />
                        </div>
                    </div>

                    <div className={styles.center}>
                        <div className={styles.profile}>
                            <div className={styles.right}>
                                {currentUser?.id != params.id ? (
                                    <>
                                        <FollowButton
                                            targetUserId={params.id}
                                        ></FollowButton>{" "}
                                        <SendMessage otherUserId={params.id} />
                                    </>
                                ) : (
                                    ""
                                )}
                                {/* settings */}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "end",
                                }}
                            >
                                <h1 className={styles.title}>
                                    {name}
                                    <span>
                                        {role == "ADMIN"
                                            ? "🤓"
                                            : role == "USER"
                                            ? "🗿"
                                            : ""}
                                    </span>
                                </h1>
                                <Link href="http://localhost:3000/settings/account">
                                    Edit profile
                                </Link>
                            </div>
                            <p className={styles.bio}>{bio}</p>

                            <p className={styles.info}>
                                <span>
                                    <span className={styles.nbr}>
                                        {posts.length}
                                    </span>{" "}
                                    Post(s)
                                </span>
                                <span>
                                    <span className={styles.nbr}>
                                        {followedBy?.length}
                                    </span>{" "}
                                    Follower(s)
                                </span>
                                <span>
                                    <span className={styles.nbr}>
                                        {following?.length}
                                    </span>{" "}
                                    Follow(s)
                                </span>
                            </p>

                            <p className={styles.date}>
                                Joined PinkBerries on{" "}
                                {createdAt?.toLocaleDateString("en-us", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>
                <Posts posts={posts}></Posts>
                <LoadMore authorId={params.id!} />
            </div>
        </div>
    );
}
