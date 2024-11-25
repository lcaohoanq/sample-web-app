export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        expires +
        "; path=/; SameSite=Strict";
}

export function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            const rawValue = c.substring(nameEQ.length);
            // For access_token, remove any appended information
            if (name === "access_token") {
                const cleanedToken = rawValue.split("localhost")[0];
                return decodeURIComponent(cleanedToken);
            }
            return decodeURIComponent(rawValue);
        }
    }
    return null;
}

export function eraseCookie(name: string) {
    document.cookie =
        name +
        "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict";
}
