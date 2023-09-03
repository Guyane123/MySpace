// /* eslint-disable @next/next/no-img-element */
// "use client";
// import { useState, useTransition } from "react";
// import DeleteButtonImage from "../../public/trash.svg";
// import styles from "./NewComment.module.css";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { prisma } from "../../lib/prisma";

// type Props = {
//     post: {
//         authorId: string;
//         id: string;
//     };
//     currentUserId: string;
// };

// export default function DeleteButton({ post, currentUserId }: Props) {
//     const router = useRouter();
//     const [isFetching, setIsFetching] = useState(false);
//     const [pending, startTransition] = useTransition();
//     const isMutating = isFetching || pending;

//     async function handleClick(e: React.MouseEvent<HTMLElement>) {
//         e.preventDefault();
//         setIsFetching(true);

//         const res = await fetch(`/api/comment?targetPostId=${post.id}`, {
//             method: "DELETE",
//         });

//         setIsFetching(false);

//         startTransition(() => router.refresh());
//     }

//     if (post.authorId == currentUserId) {
//         return (
//             <button className={styles.btn} onClick={handleClick}>
//                 <Image
//                     src={DeleteButtonImage}
//                     alt="Delete Button"
//                     width={16}
//                     height={16}
//                 />
//             </button>
//         );
//     } else {
//         return <h1>d</h1>;
//     }
// }
