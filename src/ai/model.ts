import axios from "axios";
import config from "../config";
import { functions } from "./functions";
import { SYSTEM_PROMPT, TOOL_CHECK_PROMPT, MODEL_NAME } from "../utils/constants";

export async function callModel(userMessage: string) {
    const toolCheckMessages = [
        { role: "system", content: TOOL_CHECK_PROMPT },
        { role: "user", content: userMessage }
    ];

    const modelMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
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
        messages: modelMessages
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

//prompt: I need a flight from Bucharest to Rome from 22 may until 26 may for 2 adults on economy class 