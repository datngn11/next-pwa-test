import { SyntheticEvent, useState } from "react";
import s from "styles/styles.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.location.href = "http://" + value;
  };

  return (
    <div className={s.container}>
      <h1>Enter link</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit">Go</button>
      </form>
    </div>
  );
}
