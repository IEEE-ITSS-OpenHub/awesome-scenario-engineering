export function getBaseURL() {
    if (process && process.env && process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    } else {
        return "https://IEEE-ITSS-OpenHub.github.io/awesome-scenario-engineering"
    }
}