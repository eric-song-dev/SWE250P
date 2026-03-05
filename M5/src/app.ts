// ============================================================
// MODULE IMPORTS — ES module syntax (Chapter 6)
// ============================================================

import {
    ICourse,
    IAdvancedCourse,
    StudyStatus,
    Course,
    AdvancedCourse,
    createQuickCourse
} from "./models.js";

import {
    statusBadge,
    calcProgress,
    formatDate,
    capitalize,
    logConstructor
} from "./utils.js";

// ============================================================
// DECORATOR USAGE — @logConstructor logs class registration
// ============================================================

@logConstructor
class StudyTracker {
    private courses: Course[] = [];
    private createdAt: Date = new Date();

    constructor() {
        // Seed with sample courses
        this.addCourse("HTML & CSS Basics", "Learn the building blocks of the web", 3);
        this.addCourse("JavaScript Essentials", "Master JS fundamentals and the DOM", 4);
        this.addAdvancedCourse(
            "TypeScript Deep Dive", "Typed superset of JavaScript", 4,
            "JavaScript Essentials", 4
        );
    }

    addCourse(title: string, description: string, credits: number): void {
        this.courses.push(new Course(title, description, credits));
    }

    addAdvancedCourse(
        title: string, description: string, credits: number,
        prereq: string, difficulty: number
    ): void {
        this.courses.push(new AdvancedCourse(title, description, credits, prereq, difficulty));
    }

    removeCourse(index: number): void {
        this.courses.splice(index, 1);
    }

    cycleStatus(index: number): void {
        this.courses[index].cycleStatus();
    }

    getCompletedCount(): number {
        return this.courses.filter(c => c.status === StudyStatus.Completed).length;
    }

    render(): void {
        const app = document.getElementById("app");
        if (!app) return;

        const total = this.courses.length;
        const completed = this.getCompletedCount();
        const progress = calcProgress(completed, total);
        const dateStr = formatDate(this.createdAt);

        let html = `
            <div class="container">
                <h1>📚 ${capitalize("study")} ${capitalize("tracker")} — M5</h1>
                <p class="subtitle">Advanced TypeScript with Modules — created ${dateStr}</p>

                <div class="stats">
                    <div class="stat-card">
                        <span class="stat-number">${total}</span>
                        <span class="stat-label">Courses</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${completed}</span>
                        <span class="stat-label">Completed</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">${progress}%</span>
                        <span class="stat-label">Progress</span>
                    </div>
                </div>

                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width:${progress}%"></div>
                </div>

                <div class="form-section">
                    <h2>Add a New Course</h2>
                    <div class="form-row">
                        <input type="text" id="inputTitle" placeholder="Course title" />
                        <input type="text" id="inputDesc" placeholder="Short description" />
                        <input type="number" id="inputCredits" placeholder="Credits" min="1" max="6" value="3" />
                        <button id="btnAdd" class="btn btn-add">+ Add</button>
                    </div>
                </div>

                <h2>Course List</h2>
                <ul class="course-list">`;

        this.courses.forEach((course: Course, i: number) => {
            // Use the interface method getLabel()
            const label = course.getLabel();

            html += `
                    <li class="course-item">
                        <div class="course-info">
                            <strong>${label}</strong>
                            <span class="course-desc">${course.description}</span>
                        </div>
                        <div class="course-actions">
                            ${statusBadge(course.status)}
                            <button class="btn btn-cycle" data-index="${i}">Cycle Status</button>
                            <button class="btn btn-remove" data-index="${i}">✕</button>
                        </div>
                    </li>`;
        });

        html += `
                </ul>

                <div class="demo-section">
                    <h2>Module & Feature Demos</h2>
                    <p><strong>Type Assertion:</strong> createQuickCourse("Demo") → "${createQuickCourse("Demo").getLabel()}"</p>
                    <p><strong>Interface method:</strong> Course.getLabel() provides formatted labels above</p>
                    <p><strong>Namespace:</strong> Formatter.capitalize, Formatter.formatDate, Formatter.statusEmoji</p>
                    <p><strong>Decorator:</strong> @logConstructor on StudyTracker (check console)</p>
                    <p><strong>Modules:</strong> app.ts imports from models.ts and utils.ts via ES import/export</p>
                    <p><strong>Enum (string):</strong> StudyStatus.InProgress = "${StudyStatus.InProgress}"</p>
                </div>
            </div>`;

        app.innerHTML = html;

        // Attach event listeners using event delegation
        const btnAdd = document.getElementById("btnAdd");
        if (btnAdd) {
            btnAdd.addEventListener("click", () => this.handleAdd());
        }

        // Event delegation for cycle and remove buttons
        const courseList = app.querySelector(".course-list");
        if (courseList) {
            courseList.addEventListener("click", (e: Event) => {
                const target = e.target as HTMLElement;
                const index = parseInt(target.getAttribute("data-index") || "-1");
                if (index < 0) return;

                if (target.classList.contains("btn-cycle")) {
                    this.cycleStatus(index);
                    this.render();
                } else if (target.classList.contains("btn-remove")) {
                    this.removeCourse(index);
                    this.render();
                }
            }, false);
        }
    }

    private handleAdd(): void {
        const titleInput = document.getElementById("inputTitle") as HTMLInputElement;
        const descInput = document.getElementById("inputDesc") as HTMLInputElement;
        const credInput = document.getElementById("inputCredits") as HTMLInputElement;
        if (titleInput && titleInput.value.trim() !== "") {
            this.addCourse(
                titleInput.value.trim(),
                descInput ? descInput.value.trim() : "",
                credInput ? parseInt(credInput.value) || 3 : 3
            );
            this.render();
        }
    }
}

// ============================================================
// TYPE ASSERTION DEMO (logged to console)
// ============================================================

const quickCourse: ICourse = createQuickCourse("Quick TypeScript");
console.log("Type assertion demo:", quickCourse.getLabel());

// ============================================================
// INTERFACE EXTENSION DEMO (logged to console)
// ============================================================

const advCourse: IAdvancedCourse = new AdvancedCourse(
    "Advanced Node.js", "Server frameworks", 4, "JavaScript Essentials", 5
);
console.log("Interface extension demo:", advCourse.getLabel());
console.log("Prerequisite:", advCourse.prerequisite, "| Difficulty:", advCourse.difficulty);

// ============================================================
// INITIAL RENDER
// ============================================================

const tracker = new StudyTracker();

window.addEventListener("load", () => {
    tracker.render();
});
