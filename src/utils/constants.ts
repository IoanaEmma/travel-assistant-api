export const TOOL_CHECK_PROMPT = "You are a classifier. Answer with 'yes' if the user request requires calling a function/tool, otherwise answer 'no'.";
export const SYSTEM_PROMPT = "You are a helpful travel assistant that can use functions when needed, but you should respond naturally in plain language if no function is appropriate. So instead of sending the text 'There is no function available...' or 'I don't have a function available...' just respond naturally, like you are a normal chat, like chatgpt would do. So just respond to the prompt with the response the user is expecting. Also, any flights and hotels should be searched for this current year, 2025, not in the past. If no year is provided, just use year 2025. The dates should always have the format 'YYYY-MM-DD' when searching, so you need to format it accordingly. If the user asks for a flight or hotel, you should use the functions to search for them.";
export const MODEL_NAME = "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo";
export const LLM_FUNCTIONS = {
    SEARCH_FLIGHTS: "search_flights",
    SEARCH_HOTELS: "search_hotels",
    SEARCH_ATTRACTIONS: "search_attractions"
}

export const LOCATION_KEYS = {
    PARIS: "g187147",
    "NEW YORK": "g60763",
    TOKYO: "g298184",
    LONDON: "g186338",
    BERLIN: "g187323",
    SYDNEY: "g255060",
    DUBAI: "g295424",
    SINGAPORE: "g294265",
    BARCELONA: "g187497",
    ROME: "g187791",
    AMSTERDAM: "g188590"
}