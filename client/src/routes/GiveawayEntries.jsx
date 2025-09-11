// client/src/pages/GiveawayEntries.jsx
import React, { useEffect, useMemo, useState } from "react";
import styles from "./GiveawayEntries.module.css";
import api from '../apis/Giveaway'; // ⬅️ use shared axios client

const GiveawayEntries = () => {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState("loading");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") || "";

  // Build CSV link using api baseURL; append token as query for a plain <a> link
  const csvHref = useMemo(() => {
    const u = new URL(
      `${api.defaults.baseURL.replace(/\/$/, "")}/entries.csv`,
      window.location.origin
    );
    if (/^https?:\/\//i.test(api.defaults.baseURL)) {
      // absolute dev baseURL; construct from that origin
      const absolute = new URL(`${api.defaults.baseURL.replace(/\/$/, "")}/entries.csv`);
      if (token) absolute.searchParams.set("token", token);
      return absolute.toString();
    }
    if (token) u.searchParams.set("token", token);
    return u.pathname + (u.search || "");
  }, [token]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await api.get("/entries?token=" + token);
        setEntries(resp.data || []);
        setStatus("ready");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    };
    load();
  }, [token]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Giveaway Entries</h1>

      <div className={styles.actions}>
        <a className={styles.csvBtn} href={csvHref}>Download CSV</a>
        {!token && (
          <p className={styles.note}>
            Tip: add <code>?token=YOUR_ADMIN_TOKEN</code> to the URL to authenticate.
          </p>
        )}
      </div>

      {status === "loading" && <p>Loading…</p>}
      {status === "error" && (
        <p className={styles.error}>Failed to fetch entries. Check your token and try again.</p>
      )}
      {status === "ready" && (
        entries.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td title={e.phone}>{e.phone}</td>
                  <td>{new Date(e.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No entries yet.</p>
        )
      )}
    </div>
  );
};

export default GiveawayEntries;
