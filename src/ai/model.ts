import axios from "axios";
import config from "../config";
import { functions } from "./functions";
import { TOOL_CHECK_PROMPT, MODEL_NAME } from "../utils/constants";

export async function callModel(messages: Array<{role: string, content: string}>) {
    const latestUserMessage = messages[messages.length - 1].content;
    const toolCheckMessages = [
        { role: "system", content: TOOL_CHECK_PROMPT },
        { role: "user", content: latestUserMessage }
    ];

    const headers = {
        Authorization: `Bearer ${config.TOGETHER_API_KEY}`,
        "Content-Type": "application/json"
    };

    // Check if the user message requires calling a function/tool
    const check = await axios.post(config.TOGETHER_API, {
        model: MODEL_NAME,
        messages: toolCheckMessages,
        temperature: 0
    }, {
        headers
    });

    const answer = check.data.choices[0].message.content.trim().toLowerCase();
    const shouldUseTools = answer === "yes";

    const payload: any = {
        model: MODEL_NAME,
        messages: messages
    };

    if (shouldUseTools) {
        payload.tools = functions;
        payload.tool_choice = "auto";
    }

    const response = await axios.post(
        config.TOGETHER_API,
        payload,
        { headers }
    );

    return response.data;
}