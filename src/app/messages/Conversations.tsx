"use client";

import { useState } from "react";
import Conversation from "../../../components/Conversation/Conversation";
import CurrentConversation from "./currentConversation";

type conversation = {
    conversaterId: string;
    conversatingId: string;
};

type propsType = {
    conversations: Array<conversation>;
};

export function Conversations({ conversations }: propsType) {
    const [currentConversation, setCurrentConversation] =
        useState<conversation | null>(null);

    return (
        <div>
            <div>
                <h1>Conversations : </h1>
                {conversations
                    ? conversations.map((conversation, k) => {
                          return (
                              <Conversation
                                  conversation={conversation}
                                  onConversationChange={setCurrentConversation}
                                  key={k}
                              ></Conversation>
                          );
                      })
                    : "HEY"}
            </div>
            <div>
                <CurrentConversation conversation={currentConversation!} />
            </div>
        </div>
    );
}
