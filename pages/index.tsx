import Link from "next/link";
import s from "styles/styles.module.css";

const HomePage = () => {
  return (
    <div className={s.container}>
      <h1>Go to page</h1>
      <nav className={s.nav}>
        <Link href="/redirect" className={s["nav-link"]}>
          1. Test Redirect
        </Link>

        <Link href="/qr-scanner" className={s["nav-link"]}>
          2. Test QR Code Scanner
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
