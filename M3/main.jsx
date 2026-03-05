// main.jsx — React with JSX syntax (Chapter 4 approach)
// This file must be transpiled by Babel before it can run in the browser:
//   npx babel main.jsx --out-file main.js
// JSX lets us write HTML-like syntax directly within JavaScript,
// which Babel compiles down to React.createElement() calls.

function start() {
    class CourseCard extends React.Component {
        constructor(props) {
            super(props);
            console.log("CourseCard component created:", props.title);
        }

        static defaultProps = { description: "No description available" };

        static propTypes = {
            title: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            description: PropTypes.string
        };

        title = this.props.title;
        titleStyle = { color: "#0064a4" };

        render() {
            return (
                <li className="card">
                    <h2 style={this.titleStyle}>{this.title}</h2>
                    <a href={this.props.href} target="_blank" rel="noopener noreferrer">
                        {this.props.description}
                    </a>
                    <br />
                    <button onClick={() => {
                        if (this.title.includes("✓")) {
                            this.title = this.title.replace(" ✓", "");
                        } else {
                            this.title = this.title + " ✓";
                        }
                        this.setState({});
                    }}>
                        Mark Visited
                    </button>
                </li>
            );
        }
    }

    // ReactDOM.render() mounts the React component tree into the real DOM.
    ReactDOM.render(
        <div className="container">
            <h1>My Course Resources</h1>
            <p>Built with React JSX — transpiled by Babel</p>
            <ul>
                <CourseCard
                    title={"React Documentation"}
                    href={"https://react.dev"}
                    description={"Official React docs — learn React fundamentals"}
                />
                <CourseCard
                    title={"Eloquent JavaScript"}
                    href={"https://eloquentjavascript.net"}
                    description={"A modern intro to programming by Marijn Haverbeke"}
                />
                <CourseCard
                    title={"MDN Web Docs"}
                    href={"https://developer.mozilla.org"}
                    description={"Comprehensive web technology references"}
                />
                <CourseCard
                    title={"UCI SWE 250P"}
                    href={"https://www.uci.edu"}
                />
            </ul>
        </div>,

        document.getElementById("mainContainer")
    );
}
