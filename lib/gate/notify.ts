import { notifySlack } from "@/lib/notify/slack";

type HeaderReader = { get(name: string): string | null };

export const shouldNotify = () =>
    process.env.VERCEL_ENV === "production" || process.env.SLACK_NOTIFY_DEV === "true";

function formatLocation(cityHeader: string | null, code: string | null) {
    const country = code ? (new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code) : null;

    let city: string | null = null;
    if (cityHeader) {
        try {
            city = decodeURIComponent(cityHeader);
        } catch {
            city = cityHeader;
        }
    }

    return [city, country].filter(Boolean).join(", ") || "an unknown location";
}

function formatLocalTime(tz: string | null, now: Date) {
    if (!tz) return "";
    try {
        const time = new Intl.DateTimeFormat("en-GB", {
            timeZone: tz,
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
        }).format(now);
        return `their time: ${time} (${tz})`;
    } catch {
        return ""; // invalid timezone header
    }
}

export async function notifyUnlock(h: HeaderReader) {
    const now = new Date();
    const ts = Math.floor(now.getTime() / 1000);

    const text = [
        `:unlock: Investor site unlocked from *${formatLocation(h.get("x-vercel-ip-city"), h.get("x-vercel-ip-country"))}*`,
        formatLocalTime(h.get("x-vercel-ip-timezone"), now),
        `your time: <!date^${ts}^{date_short_pretty} at {time}|${now.toISOString()}>`,
    ]
        .filter(Boolean)
        .join(" · ");

    await notifySlack(text);
}