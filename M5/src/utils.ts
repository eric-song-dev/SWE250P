import { StudyStatus } from "./models.js";

// ============================================================
// 1. NAMESPACE — groups related formatting functions together
// ============================================================

namespace Formatter {
    export function statusEmoji(status: StudyStatus): string {
        switch (status) {
            case StudyStatus.NotStarted: return "📕";
            case StudyStatus.InProgress: return "📖";
            case StudyStatus.Completed: return "✅";
            default: return "❓";
        }
    }

    export function formatDate(date: Date): string {
        return date.toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
        });
    }

    export function capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Re-export namespace functions for external use
export const statusEmoji = Formatter.statusEmoji;
export const formatDate = Formatter.formatDate;
export const capitalize = Formatter.capitalize;

// ============================================================
// 2. DECORATOR — class decorator that logs construction
// ============================================================

export function logConstructor(constructor: Function) {
    console.log(`[Decorator] Class registered: ${constructor.name}`);
    console.log(`[Decorator] Constructor:`, constructor);
}

// ============================================================
// 3. EXPORTED ARROW FUNCTIONS — typed utility helpers
// ============================================================

// Format a course status badge as HTML
export const statusBadge = (status: StudyStatus): string => {
    const emoji = Formatter.statusEmoji(status);
    const cssClass =
        status === StudyStatus.Completed ? "status-done" :
            status === StudyStatus.InProgress ? "status-wip" : "status-new";
    return `<span class="badge ${cssClass}">${emoji} ${status}</span>`;
};

// Calculate progress percentage
export const calcProgress = (completed: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
};
