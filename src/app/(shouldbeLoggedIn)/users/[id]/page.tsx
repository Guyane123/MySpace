/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import styles from "./page.module.css";
import { FollowButton } from "@/components/FollowButton/FollowButton";
import { SendMessage } from "@/components/Buttons/Buttons";
import Post from "@/components/Post/Post";
import fetchCurrentUser from "@/app/api/fetchCurrentUser";
import { fetchPosts } from "@/app/api/fetchPosts";

type Props = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const user = await fetchCurrentUser();
    const { name } = user ?? {};

    return { title: `user profile of ${name}` };
}

export default async function UserProfile({ params }: Props) {
    const user = await fetchCurrentUser(params.id);

    const currentUser = await fetchCurrentUser();
    const { name, image, bio, createdAt } = user ?? {};
    const posts = await fetchPosts();

    // await prisma.post.findMany({
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    //     where: {
    //         authorId: params.id,
    //     },
    //     include: {
    //         likedBy: true,
    //         comments: true,
    //         author: {
    //             select: {
    //                 name: true,
    //                 image: true,
    //                 id: true,
    //             },
    //         },
    //     },
    // });

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
                                    image ??
                                    "https://thispersondoesnotexist.com"
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
                            <h1 className={styles.title}>{name}&#128507;</h1>
                            <p className={styles.bio}>{bio}</p>
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

                {posts.map((post) => {
                    return <Post post={post} key={post!.id} />;
                })}
            </div>
        </div>
    );
}
