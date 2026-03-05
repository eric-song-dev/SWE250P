// ============================================================
// 1. BASIC TYPES — string, number, boolean
// ============================================================

const appTitle: string = "Study Tracker";
const appVersion: number = 1.0;
const isReady: boolean = true;

// Hexadecimal and octal number literals
const hexColor: number = 0x0064a4;
const octalPermission: number = 0o755;

// ============================================================
// 2. ENUMS — named constants for study status
// ============================================================

enum StudyStatus {
    NotStarted,
    InProgress,
    Completed
}

// ============================================================
// 3. TYPE ALIASES — custom type for course data
// ============================================================

type CourseInfo = {
    title: string;
    description: string;
    credits: number;
    status: StudyStatus;
    instructor?: string;   // optional field — the ? means this property can be omitted
};

// ============================================================
// 4. INTERFACES — contract for the tracker behavior
// ============================================================

interface ITracker {
    courses: CourseInfo[];
    addCourse(title: string, description: string, credits: number, instructor?: string): void;
    removeCourse(index: number): void;
    render(): void;
}

// ============================================================
// 5. FUNCTION TYPES — typed function variables
// ============================================================

let statusFormatter: (status: StudyStatus) => string;

statusFormatter = (status: StudyStatus): string => {
    switch (status) {
        case StudyStatus.NotStarted: return "📕 Not Started";
        case StudyStatus.InProgress: return "📖 In Progress";
        case StudyStatus.Completed: return "✅ Completed";
        default: return "Unknown";
    }
};

// ============================================================
// 6. ARROW FUNCTIONS — with default & optional parameters
// ============================================================

// Arrow function with default parameter
const formatTitle = (title: string, prefix: string = "📚"): string => `${prefix} ${title}`;

// Arrow function with optional parameter
const formatCredits = (credits?: number): string => {
    if (credits !== undefined) {
        return `${credits} credits`;
    }
    return "N/A";
};

// Arrow function — single-expression body
const getProgressPercent = (courses: CourseInfo[]): number =>
    courses.length === 0 ? 0 : Math.round((courses.filter(c => c.status === StudyStatus.Completed).length / courses.length) * 100);

// ============================================================
// 7. GENERICS — reusable search function
// ============================================================

function findItem<T>(items: T[], predicate: (item: T) => boolean): T | undefined {
    for (const item of items) {
        if (predicate(item)) return item;
    }
    return undefined;
}

// ============================================================
// 8. UNION TYPES & TYPE GUARDS
// ============================================================

function describeValue(value: number | string): string {
    if (typeof value === "string") {
        return `String of length ${value.length}`;
    } else if (typeof value === "number") {
        return `Number with value ${value}`;
    }
    return "Unknown";
}

// ============================================================
// 9. TUPLES — fixed-length typed arrays
// ============================================================

const courseEntry: [string, number] = ["TypeScript Fundamentals", 4];
// Tuple with optional element — the third position (instructor) is optional
const courseEntry2: [string, number, string?] = ["React Basics", 3];        // ✅ OK — omit optional
const courseEntry3: [string, number, string?] = ["Node.js", 4, "Prof. Lee"]; // ✅ OK — provide optional

// ============================================================
// 10. ARRAYS & SPREAD OPERATOR
// ============================================================

const defaultCourses: string[] = ["HTML & CSS", "JavaScript", "React"];
const allTopics: string[] = [...defaultCourses, "TypeScript", "Node.js"];

// ============================================================
// 11. DESTRUCTURING — object and array
// ============================================================

const sampleCourse = { title: "TypeScript", description: "Learn TS", credits: 3 };
const { title: courseTitle, description: courseDesc, credits: courseCredits } = sampleCourse;

const scores: number[] = [95, 88, 72];
const [firstScore, secondScore, thirdScore] = scores;

// ============================================================
// 12. ABSTRACT CLASS — base tracker with abstract render
// ============================================================

abstract class BaseTracker {
    name: string;
    createdAt: Date;

    constructor(inName: string) {
        this.name = inName;
        this.createdAt = new Date();
    }

    abstract render(): void;

    getInfo(): string {
        return `${this.name} — created ${this.createdAt.toLocaleDateString()}`;
    }
}

// ============================================================
// 13. CLASS with inheritance, access modifiers, getter/setter, static
// ============================================================

class Course {
    // Public and private fields with typed properties
    public title: string;
    public description: string;
    public credits: number;
    private _status: StudyStatus;

    // Static member — tracks total courses created
    static totalCreated: number = 0;

    constructor(title: string, description: string, credits: number) {
        this.title = title;
        this.description = description;
        this.credits = credits;
        this._status = StudyStatus.NotStarted;
        Course.totalCreated++;
    }

    // Getter — computed summary
    get summary(): string {
        return `${this.title} (${this.credits} cr) — ${statusFormatter(this._status)}`;
    }

    // Getter for status value
    get status(): StudyStatus {
        return this._status;
    }

    // Setter with validation
    set status(newStatus: StudyStatus) {
        this._status = newStatus;
    }

    // Public method — cycle status forward
    public cycleStatus(): void {
        if (this._status === StudyStatus.NotStarted) {
            this._status = StudyStatus.InProgress;
        } else if (this._status === StudyStatus.InProgress) {
            this._status = StudyStatus.Completed;
        } else {
            this._status = StudyStatus.NotStarted;
        }
    }
}

// Inheritance — AdvancedCourse extends Course
class AdvancedCourse extends Course {
    private prerequisite: string;

    constructor(title: string, description: string, credits: number, prerequisite: string) {
        super(title, description, credits);
        this.prerequisite = prerequisite;
    }

    // Override getter to include prerequisite info
    get summary(): string {
        return `${this.title} (${this.credits} cr) — ${statusFormatter(this.status)} | Prereq: ${this.prerequisite}`;
    }
}

// ============================================================
// 14. CLASS with getter/setter demo (like Planet2 from textbook)
// ============================================================

class CourseName {
    private _name: string = "Untitled";

    get name(): string {
        return `Course: ${this._name}`;
    }

    set name(inName: string) {
        if (inName.trim() === "") {
            this._name = "Untitled";
        } else {
            this._name = inName;
        }
    }
}

// ============================================================
// 15. TRACKER — concrete class extending abstract base, implementing interface
// ============================================================

class StudyTracker extends BaseTracker implements ITracker {
    courses: CourseInfo[] = [];
    private courseObjects: Course[] = [];

    constructor() {
        super("My Study Tracker");
        // Seed with sample courses — note: instructor is optional, only the second one provides it
        this.addCourse("HTML & CSS Basics", "Learn the building blocks of the web", 3);
        this.addCourse("JavaScript Essentials", "Master JS fundamentals and the DOM", 4, "Prof. Smith");
        this.addAdvancedCourse("TypeScript Deep Dive", "Typed superset of JavaScript", 4, "JavaScript Essentials");
    }

    addCourse(title: string, description: string, credits: number, instructor?: string): void {
        const course = new Course(title, description, credits);
        this.courseObjects.push(course);
        const info: CourseInfo = {
            title: course.title,
            description: course.description,
            credits: course.credits,
            status: course.status
        };
        if (instructor) {
            info.instructor = instructor;
        }
        this.courses.push(info);
    }

    addAdvancedCourse(title: string, description: string, credits: number, prereq: string, instructor?: string): void {
        const course = new AdvancedCourse(title, description, credits, prereq);
        this.courseObjects.push(course);
        const info: CourseInfo = {
            title: course.title,
            description: course.description,
            credits: course.credits,
            status: course.status
        };
        if (instructor) {
            info.instructor = instructor;
        }
        this.courses.push(info);
    }

    removeCourse(index: number): void {
        this.courseObjects.splice(index, 1);
        this.courses.splice(index, 1);
    }

    cycleStatus(index: number): void {
        this.courseObjects[index].cycleStatus();
        this.courses[index].status = this.courseObjects[index].status;
    }

    getCompletedCount(): number {
        return this.courseObjects.filter(c => c.status === StudyStatus.Completed).length;
    }

    // Use the generic findItem helper
    findCourseByTitle(title: string): Course | undefined {
        return findItem<Course>(this.courseObjects, (c) => c.title === title);
    }

    render(): void {
        const app = document.getElementById("app");
        if (!app) return;

        // ---------- Summary Bar ----------
        const total = this.courseObjects.length;
        const completed = this.getCompletedCount();
        const progress = getProgressPercent(this.courses);

        // Use describeValue (union type demo)
        const totalDesc = describeValue(total);

        let html = `
            <div class="container">
                <h1>${formatTitle(appTitle)}</h1>
                <p class="subtitle">Version ${appVersion} — ${this.getInfo()}</p>

                <!-- Summary stats -->
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
                    <div class="stat-card">
                        <span class="stat-number">${Course.totalCreated}</span>
                        <span class="stat-label">Total Created (static)</span>
                    </div>
                </div>

                <!-- Progress bar -->
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width:${progress}%"></div>
                </div>

                <!-- Add course form -->
                <div class="form-section">
                    <h2>Add a New Course</h2>
                    <div class="form-row">
                        <input type="text" id="inputTitle" placeholder="Course title" />
                        <input type="text" id="inputDesc" placeholder="Short description" />
                        <input type="number" id="inputCredits" placeholder="Credits" min="1" max="6" value="3" />
                        <button id="btnAdd" class="btn btn-add">+ Add</button>
                    </div>
                </div>

                <!-- Course list -->
                <h2>Course List</h2>
                <ul class="course-list">`;

        // Render each course using arrow function forEach
        this.courseObjects.forEach((course: Course, i: number) => {
            const statusText = statusFormatter(course.status);
            const statusClass =
                course.status === StudyStatus.Completed ? "status-done" :
                    course.status === StudyStatus.InProgress ? "status-wip" : "status-new";

            // Use destructuring for display
            const { title, description, credits } = course;

            html += `
                    <li class="course-item">
                        <div class="course-info">
                            <strong>${title}</strong>
                            <span class="course-desc">${description}</span>
                            ${this.courses[i].instructor ? `<span class="course-credits">Instructor: ${this.courses[i].instructor}</span>` : ""}
                            <span class="course-credits">${formatCredits(credits)}</span>
                        </div>
                        <div class="course-actions">
                            <span class="badge ${statusClass}">${statusText}</span>
                            <button class="btn btn-cycle" onclick="cycleStatus(${i})">Cycle Status</button>
                            <button class="btn btn-remove" onclick="removeCourse(${i})">✕</button>
                        </div>
                    </li>`;
        });

        html += `
                </ul>

                <!-- Tuple & destructuring demo info -->
                <div class="demo-section">
                    <h2>TypeScript Feature Demos</h2>
                    <p><strong>Tuple:</strong> courseEntry = ["${courseEntry[0]}", ${courseEntry[1]}]</p>
                    <p><strong>Spread:</strong> allTopics = [${allTopics.map(t => `"${t}"`).join(", ")}]</p>
                    <p><strong>Destructuring:</strong> title="${courseTitle}", desc="${courseDesc}", credits=${courseCredits}</p>
                    <p><strong>Array destructuring:</strong> scores = [${firstScore}, ${secondScore}, ${thirdScore}]</p>
                    <p><strong>Union type guard:</strong> describeValue(${total}) → "${totalDesc}"</p>
                    <p><strong>Enum value:</strong> StudyStatus.InProgress = ${StudyStatus.InProgress}</p>
                    <p><strong>Hex literal:</strong> 0x0064a4 = ${hexColor}</p>
                </div>
            </div>`;

        app.innerHTML = html;

        // Attach add-course handler after render
        const btnAdd = document.getElementById("btnAdd");
        if (btnAdd) {
            btnAdd.onclick = () => addCourse();
        }
    }
}

// ============================================================
// GLOBAL TRACKER INSTANCE & EVENT HANDLERS
// ============================================================

const tracker = new StudyTracker();

// Arrow function event handlers (globally accessible for onclick)
const addCourse = (): void => {
    const titleInput = document.getElementById("inputTitle") as HTMLInputElement;
    const descInput = document.getElementById("inputDesc") as HTMLInputElement;
    const creditsInput = document.getElementById("inputCredits") as HTMLInputElement;
    if (titleInput && titleInput.value.trim() !== "") {
        tracker.addCourse(
            titleInput.value.trim(),
            descInput ? descInput.value.trim() : "",
            creditsInput ? parseInt(creditsInput.value) || 3 : 3
        );
        tracker.render();
    }
};

const removeCourse = (index: number): void => {
    tracker.removeCourse(index);
    tracker.render();
};

const cycleStatus = (index: number): void => {
    tracker.cycleStatus(index);
    tracker.render();
};

// ---------- CourseName getter/setter demo (logged to console) ----------
const cn = new CourseName();
console.log(cn.name);            // "Course: Untitled"
cn.name = "TypeScript 101";
console.log(cn.name);            // "Course: TypeScript 101"
cn.name = "";
console.log(cn.name);            // "Course: Untitled" (setter validation)

// ---------- Generic findItem demo (logged to console) ----------
const found = tracker.findCourseByTitle("JavaScript Essentials");
if (found) {
    console.log("Found via generic search:", found.summary);
}

// ---------- any type demo ----------
let flexible: any = "hello";
flexible = 42;
flexible = true;
console.log("any type demo — final value:", flexible);

// ---------- Initial render on page load ----------
window.onload = () => {
    tracker.render();
};
