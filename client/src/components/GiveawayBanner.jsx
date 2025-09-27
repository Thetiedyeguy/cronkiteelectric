import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./GiveawayBanner.module.css"; // re-use existing dialog/form styles
import api from "../apis/Giveaway";

const GiveawayModal = ({ open, onClose, onSubmit }) => {
  const titleId = useId();
  if (!open) return null;

  return (
    <Modal onClose={onClose} titleId={titleId}>
      <GiveawayForm
        titleId={titleId}
        onClose={onClose}
        onSubmit={
          onSubmit ||
          (async ({ name, phone }) => {
            const resp = await api.post("/entry", { name, phone });
            return { ok: resp.status >= 200 && resp.status < 300 };
          })
        }
      />
    </Modal>
  );
};

export default GiveawayModal;

/* ---------- Modal (unchanged behavior) ---------- */
const Modal = ({ children, onClose, titleId }) => {
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onMouseDown={onOverlayClick}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {children}
      </div>
    </div>
  );
};

/* ---------- Form (unchanged behavior) ---------- */
const GiveawayForm = ({ titleId, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });

    try {
      const entry = { name: name.trim(), phone: phone.trim() };
      if (!entry.name || !entry.phone) {
        setStatus({ type: "error", message: "Please enter your name and phone." });
        return;
      }

      if (onSubmit) {
        const res = await onSubmit(entry);
        if (res?.ok) {
          setStatus({
            type: "success",
            message: res.message || "You’re in! We’ll be in touch.",
          });
        } else {
          setStatus({
            type: "error",
            message: res?.message || "Submission failed. Try again.",
          });
        }
      } else {
        const resp = await fetch("/api/giveaway-entry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        if (!resp.ok) {
          const data = await resp.json().catch(() => ({}));
          throw new Error(data?.error || "Submission failed.");
        }
        setStatus({ type: "success", message: "You’re in! We’ll be in touch." });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Something went wrong." });
    }
  };

  return (
    <>
      <h2 id={titleId} className={styles.dialogTitle}>Enter the Giveaway</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.label}>
          <span className={styles.labelText}>Name</span>
          <input
            ref={nameInputRef}
            className={styles.input}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelText}>Phone</span>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="(555) 555-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            inputMode="tel"
          />
        </label>

        {status.type !== "idle" && (
          <div
            className={
              status.type === "success"
                ? styles.statusSuccess
                : status.type === "error"
                ? styles.statusError
                : styles.statusInfo
            }
            role="status"
            aria-live="polite"
          >
            {status.type === "loading" ? "Submitting…" : status.message}
          </div>
        )}

        <div className={styles.formActions}>
          <button type="button" className={styles.secondary} onClick={onClose}>
            Close
          </button>
          <button type="submit" className={styles.primary} disabled={status.type === "loading"}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
