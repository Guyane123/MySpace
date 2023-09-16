import { prisma } from "../../../lib/prisma";

type conversation = {
    conversaterId: string;
    conversatingId: string;
};

export default async function CurrentConversation({
    conversation,
}: {
    conversation: conversation;
}) {
    // const conversatingUser = await prisma.user.findUnique({
    //     where: { id: conversation.conversatingId },
    // });
    // const conversaterUser = await prisma.user.findUnique({
    //     where: { id: conversation.conversaterId },
    // });

    // console.log(conversaterUser?.id! + conversatingUser?.id!);
    // const messages = await prisma.messages.findMany({
    //     where: {
    //         conversationId: conversaterUser?.id! + conversatingUser?.id!,
    //     },
    // });

    return (
        // <div>
        //     {messages
        //         ? messages.map((message, k) => {
        //               return <div key={k}>{message.content}</div>;
        //           })
        //         : ""}
        // </div>
        <div>DD</div>
    );
}
