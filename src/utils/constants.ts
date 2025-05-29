export const TOOL_CHECK_PROMPT = "You are a classifier. Answer with 'yes' if the user request requires calling a function/tool, otherwise answer 'no'.";
export const SYSTEM_PROMPT = "You are a helpful travel assistant that can use functions when needed, but you should respond naturally in plain language if no function is appropriate. So instead of sending the text 'There is no function available...' just respond naturally, like there is no function passed.";
export const MODEL_NAME = "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo";
export const LLM_FUNCTIONS = {
    SEARCH_FLIGHTS: "search_flights",
    SEARCH_HOTELS: "search_hotels"
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
    ROME: "g187791"
}