import "./index.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <main className="home-page">

            <nav className="home-nav">
                <div className="home-brand">

                    <img
                        src="/taskit-logo.png"
                        alt="TaskIt logo"
                        className="home-logo"
                    />

                    TaskIt

                </div>

                <button
                    onClick={() => navigate("/login")}
                    className="home-login"
                >
                    Login
                </button>
            </nav>


            <section className="hero">

                <div className="hero-content">

                    <p className="hero-tag">
                        YOUR PERSONAL PRODUCTIVITY SPACE
                    </p>

                    <h1>
                        Organize your tasks.
                        <br />
                        <span>Focus on what matters.</span>
                    </h1>

                    <p className="hero-description">
                        Plan your day, track your progress,
                        and complete your goals with TaskIt.
                    </p>


                    <div className="hero-buttons">

                        <button
                            onClick={() => navigate("/register")}
                            className="get-started"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="hero-login"
                        >
                            Login
                        </button>

                    </div>

                </div>


                <div className="hero-card">

                    <div>
                        <span>✓</span>
                        Finish assignments
                    </div>

                    <div>
                        ⚡ Build projects
                    </div>

                    <div>
                        🎯 Stay focused
                    </div>

                </div>

            </section>

        </main>
    );
}

export default Home;