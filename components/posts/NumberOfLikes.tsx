import { getNumberOfLikes } from "@/app/actions";

export default async function NumberOfLikes({ postId }: { postId: string }) {
    const nbrOfLikes = await getNumberOfLikes(postId);
    return nbrOfLikes;
}
