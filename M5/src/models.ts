// ============================================================
// 1. INTERFACE — defines the shape of a course object
// ============================================================

export interface ICourse {
    title: string;
    description: string;
    credits: number;
    grade?: string;                     // Optional property
    getLabel(): string;                 // Method signature in interface
}

// ============================================================
// 2. INTERFACE EXTENSION — extends ICourse with extra fields
// ============================================================

export interface IAdvancedCourse extends ICourse {
    prerequisite: string;
    difficulty: number;
}

// ============================================================
// 3. ENUM — exported for use across modules
// ============================================================

export enum StudyStatus {
    NotStarted = "Not Started",
    InProgress = "In Progress",
    Completed = "Completed"
}

// ============================================================
// 4. CLASS IMPLEMENTING INTERFACE — Course implements ICourse
// ============================================================

export class Course implements ICourse {
    title: string;
    description: string;
    credits: number;
    grade?: string;
    status: StudyStatus;

    constructor(title: string, description: string, credits: number) {
        this.title = title;
        this.description = description;
        this.credits = credits;
        this.status = StudyStatus.NotStarted;
    }

    // Implements the interface method
    getLabel(): string {
        const gradeStr = this.grade ? ` (${this.grade})` : "";
        return `${this.title} — ${this.credits} cr${gradeStr}`;
    }

    cycleStatus(): void {
        if (this.status === StudyStatus.NotStarted) {
            this.status = StudyStatus.InProgress;
        } else if (this.status === StudyStatus.InProgress) {
            this.status = StudyStatus.Completed;
        } else {
            this.status = StudyStatus.NotStarted;
        }
    }
}

// ============================================================
// 5. CLASS WITH INHERITANCE — AdvancedCourse extends Course, implements IAdvancedCourse
// ============================================================

export class AdvancedCourse extends Course implements IAdvancedCourse {
    prerequisite: string;
    difficulty: number;

    constructor(
        title: string,
        description: string,
        credits: number,
        prerequisite: string,
        difficulty: number
    ) {
        super(title, description, credits);
        this.prerequisite = prerequisite;
        this.difficulty = difficulty;
    }

    // Override getLabel to include prerequisite and difficulty info
    getLabel(): string {
        return `${this.title} — ${this.credits} cr | Prereq: ${this.prerequisite} | Difficulty: ${this.difficulty}/5`;
    }
}

// ============================================================
// 6. TYPE ASSERTION — create an object conforming to ICourse via assertion
// ============================================================

export function createQuickCourse(title: string): ICourse {
    let c = {} as ICourse;
    c.title = title;
    c.description = "Quick-created course";
    c.credits = 3;
    c.getLabel = function () {
        return `${this.title} — ${this.credits} cr`;
    };
    return c;
}
