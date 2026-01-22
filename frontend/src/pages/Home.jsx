import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaStickyNote,
    FaEdit,
    FaTrash,
    FaMoon,
    FaSun,
} from "react-icons/fa";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const [dark, setDark] = useState(false);

    return (
        <div
            style={{
                ...styles.page,
                background: dark
                    ? "linear-gradient(120deg, #020617, #0f172a)"
                    : "linear-gradient(120deg, #f8fafc, #eef2ff)",
                color: dark ? "#e5e7eb" : "#0f172a",
            }}
        >
            {/* 🌙 Theme Toggle */}
            <div style={styles.themeBtn}>
                <Button
                    size="sm"
                    variant={dark ? "outline-light" : "outline-dark"}
                    onClick={() => setDark(!dark)}
                >
                    {dark ? <FaSun /> : <FaMoon />}
                </Button>
            </div>

            <Container style={styles.container}>
                {/* HERO SECTION */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h1 style={styles.title}>
                            Manage Your Notes <br />
                            <span style={styles.highlight}>
                                Smart & Simple
                            </span>
                        </h1>

                        <p
                            style={{
                                ...styles.text,
                                color: dark ? "#cbd5f5" : "#334155",
                            }}
                        >
                            A modern note-taking application to create, edit,
                            and manage notes with a clean and powerful interface.
                        </p>

                        <Button
                            style={styles.primaryBtn}
                            onClick={() => navigate("/notes")}
                        >
                            Get Started
                        </Button>
                    </Col>

                    <Col md={6}>
                        <div
                            style={{
                                ...styles.heroBox,
                                background: dark ? "#020617" : "#ffffff",
                            }}
                        >
                            <FaStickyNote size={90} color="#2563EB" />
                            <p style={styles.heroText}>
                                “All your ideas, tasks, and thoughts in one
                                place.”
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* FEATURES */}
                <Row className="g-4">
                    {features.map((item, index) => (
                        <Col md={4} key={index}>
                            <Card
                                style={styles.card}
                                onClick={() => item.link && navigate(item.link)}
                                onMouseEnter={(e) =>
                                (e.currentTarget.style.transform =
                                    "translateY(-6px)")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.transform =
                                    "translateY(0)")
                                }
                            >
                                <Card.Body>
                                    {item.icon}
                                    <h5>{item.title}</h5>
                                    <p style={styles.cardText}>
                                        {item.text}
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* FOOTER */}
            <footer style={styles.footer}>
                <p style={styles.footerText}>
                    © {new Date().getFullYear()} Note App • Built with React
                </p>
            </footer>
        </div>
    );
}

/* ================= STYLES ================= */

const styles = {
    page: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
    themeBtn: {
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
    },
    container: {
        paddingTop: "90px",
        paddingBottom: "60px",
    },
    title: {
        fontSize: "3rem",
        fontWeight: 700,
        lineHeight: 1.2,
    },
    highlight: {
        color: "#2563EB",
    },
    text: {
        fontSize: "1.05rem",
        marginTop: "15px",
        marginBottom: "20px",
    },
    primaryBtn: {
        backgroundColor: "#2563EB",
        border: "none",
        padding: "10px 24px",
        fontSize: "1rem",
    },
    heroBox: {
        padding: "40px",
        borderRadius: "16px",
        textAlign: "center",
        boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
    },
    heroText: {
        marginTop: "15px",
        fontStyle: "italic",
        opacity: 0.8,
    },
    card: {
        cursor: "pointer",
        border: "none",
        borderRadius: "16px",
        padding: "15px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease",
    },
    cardText: {
        fontSize: "0.95rem",
        color: "#64748b",
    },
    footer: {
        marginTop: "auto",
        padding: "15px",
        textAlign: "center",
    },
    footerText: {
        fontSize: "0.9rem",
        opacity: 0.75,
    },
};

/* ================= DATA ================= */

const features = [
    {
        title: "Create Notes",
        text: "Quickly write and save notes with ease.",
        icon: <FaStickyNote size={38} color="#2563EB" />,
        link: "/notes",
    },
    {
        title: "Edit Anytime",
        text: "Update your notes anytime smoothly.",
        icon: <FaEdit size={38} color="#2563EB" />,
    },
    {
        title: "Delete Securely",
        text: "Remove unnecessary notes safely.",
        icon: <FaTrash size={38} color="#2563EB" />,
    },
];
