// ============================================================
// 1. BASIC TYPES — string, number, boolean
// ============================================================
const appTitle = "Study Tracker";
const appVersion = 1.0;
const isReady = true;
// Hexadecimal and octal number literals
const hexColor = 0x0064a4;
const octalPermission = 0o755;
// ============================================================
// 2. ENUMS — named constants for study status
// ============================================================
var StudyStatus;
(function (StudyStatus) {
    StudyStatus[StudyStatus["NotStarted"] = 0] = "NotStarted";
    StudyStatus[StudyStatus["InProgress"] = 1] = "InProgress";
    StudyStatus[StudyStatus["Completed"] = 2] = "Completed";
})(StudyStatus || (StudyStatus = {}));
// ============================================================
// 5. FUNCTION TYPES — typed function variables
// ============================================================
let statusFormatter;
statusFormatter = (status) => {
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
const formatTitle = (title, prefix = "📚") => `${prefix} ${title}`;
// Arrow function with optional parameter
const formatCredits = (credits) => {
    if (credits !== undefined) {
        return `${credits} credits`;
    }
    return "N/A";
};
// Arrow function — single-expression body
const getProgressPercent = (courses) => courses.length === 0 ? 0 : Math.round((courses.filter(c => c.status === StudyStatus.Completed).length / courses.length) * 100);
// ============================================================
// 7. GENERICS — reusable search function
// ============================================================
function findItem(items, predicate) {
    for (const item of items) {
        if (predicate(item))
            return item;
    }
    return undefined;
}
// ============================================================
// 8. UNION TYPES & TYPE GUARDS
// ============================================================
function describeValue(value) {
    if (typeof value === "string") {
        return `String of length ${value.length}`;
    }
    else if (typeof value === "number") {
        return `Number with value ${value}`;
    }
    return "Unknown";
}
// ============================================================
// 9. TUPLES — fixed-length typed arrays
// ============================================================
const courseEntry = ["TypeScript Fundamentals", 4];
// Tuple with optional element — the third position (instructor) is optional
const courseEntry2 = ["React Basics", 3]; // ✅ OK — omit optional
const courseEntry3 = ["Node.js", 4, "Prof. Lee"]; // ✅ OK — provide optional
// ============================================================
// 10. ARRAYS & SPREAD OPERATOR
// ============================================================
const defaultCourses = ["HTML & CSS", "JavaScript", "React"];
const allTopics = [...defaultCourses, "TypeScript", "Node.js"];
// ============================================================
// 11. DESTRUCTURING — object and array
// ============================================================
const sampleCourse = { title: "TypeScript", description: "Learn TS", credits: 3 };
const { title: courseTitle, description: courseDesc, credits: courseCredits } = sampleCourse;
const scores = [95, 88, 72];
const [firstScore, secondScore, thirdScore] = scores;
// ============================================================
// 12. ABSTRACT CLASS — base tracker with abstract render
// ============================================================
class BaseTracker {
    constructor(inName) {
        this.name = inName;
        this.createdAt = new Date();
    }
    getInfo() {
        return `${this.name} — created ${this.createdAt.toLocaleDateString()}`;
    }
}
// ============================================================
// 13. CLASS with inheritance, access modifiers, getter/setter, static
// ============================================================
class Course {
    constructor(title, description, credits) {
        this.title = title;
        this.description = description;
        this.credits = credits;
        this._status = StudyStatus.NotStarted;
        Course.totalCreated++;
    }
    // Getter — computed summary
    get summary() {
        return `${this.title} (${this.credits} cr) — ${statusFormatter(this._status)}`;
    }
    // Getter for status value
    get status() {
        return this._status;
    }
    // Setter with validation
    set status(newStatus) {
        this._status = newStatus;
    }
    // Public method — cycle status forward
    cycleStatus() {
        if (this._status === StudyStatus.NotStarted) {
            this._status = StudyStatus.InProgress;
        }
        else if (this._status === StudyStatus.InProgress) {
            this._status = StudyStatus.Completed;
        }
        else {
            this._status = StudyStatus.NotStarted;
        }
    }
}
// Static member — tracks total courses created
Course.totalCreated = 0;
// Inheritance — AdvancedCourse extends Course
class AdvancedCourse extends Course {
    constructor(title, description, credits, prerequisite) {
        super(title, description, credits);
        this.prerequisite = prerequisite;
    }
    // Override getter to include prerequisite info
    get summary() {
        return `${this.title} (${this.credits} cr) — ${statusFormatter(this.status)} | Prereq: ${this.prerequisite}`;
    }
}
// ============================================================
// 14. CLASS with getter/setter demo (like Planet2 from textbook)
// ============================================================
class CourseName {
    constructor() {
        this._name = "Untitled";
    }
    get name() {
        return `Course: ${this._name}`;
    }
    set name(inName) {
        if (inName.trim() === "") {
            this._name = "Untitled";
        }
        else {
            this._name = inName;
        }
    }
}
// ============================================================
// 15. TRACKER — concrete class extending abstract base, implementing interface
// ============================================================
class StudyTracker extends BaseTracker {
    constructor() {
        super("My Study Tracker");
        this.courses = [];
        this.courseObjects = [];
        // Seed with sample courses — note: instructor is optional, only the second one provides it
        this.addCourse("HTML & CSS Basics", "Learn the building blocks of the web", 3);
        this.addCourse("JavaScript Essentials", "Master JS fundamentals and the DOM", 4, "Prof. Smith");
        this.addAdvancedCourse("TypeScript Deep Dive", "Typed superset of JavaScript", 4, "JavaScript Essentials");
    }
    addCourse(title, description, credits, instructor) {
        const course = new Course(title, description, credits);
        this.courseObjects.push(course);
        const info = {
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
    addAdvancedCourse(title, description, credits, prereq, instructor) {
        const course = new AdvancedCourse(title, description, credits, prereq);
        this.courseObjects.push(course);
        const info = {
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
    removeCourse(index) {
        this.courseObjects.splice(index, 1);
        this.courses.splice(index, 1);
    }
    cycleStatus(index) {
        this.courseObjects[index].cycleStatus();
        this.courses[index].status = this.courseObjects[index].status;
    }
    getCompletedCount() {
        return this.courseObjects.filter(c => c.status === StudyStatus.Completed).length;
    }
    // Use the generic findItem helper
    findCourseByTitle(title) {
        return findItem(this.courseObjects, (c) => c.title === title);
    }
    render() {
        const app = document.getElementById("app");
        if (!app)
            return;
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
        this.courseObjects.forEach((course, i) => {
            const statusText = statusFormatter(course.status);
            const statusClass = course.status === StudyStatus.Completed ? "status-done" :
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
const addCourse = () => {
    const titleInput = document.getElementById("inputTitle");
    const descInput = document.getElementById("inputDesc");
    const creditsInput = document.getElementById("inputCredits");
    if (titleInput && titleInput.value.trim() !== "") {
        tracker.addCourse(titleInput.value.trim(), descInput ? descInput.value.trim() : "", creditsInput ? parseInt(creditsInput.value) || 3 : 3);
        tracker.render();
    }
};
const removeCourse = (index) => {
    tracker.removeCourse(index);
    tracker.render();
};
const cycleStatus = (index) => {
    tracker.cycleStatus(index);
    tracker.render();
};
// ---------- CourseName getter/setter demo (logged to console) ----------
const cn = new CourseName();
console.log(cn.name); // "Course: Untitled"
cn.name = "TypeScript 101";
console.log(cn.name); // "Course: TypeScript 101"
cn.name = "";
console.log(cn.name); // "Course: Untitled" (setter validation)
// ---------- Generic findItem demo (logged to console) ----------
const found = tracker.findCourseByTitle("JavaScript Essentials");
if (found) {
    console.log("Found via generic search:", found.summary);
}
// ---------- any type demo ----------
let flexible = "hello";
flexible = 42;
flexible = true;
console.log("any type demo — final value:", flexible);
// ---------- Initial render on page load ----------
window.onload = () => {
    tracker.render();
};
//# sourceMappingURL=app.js.map