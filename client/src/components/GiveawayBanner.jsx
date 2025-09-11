// client/src/components/GiveawayBanner.jsx
import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./GiveawayBanner.module.css";
import api from '../apis/Giveaway'; // ⬅️ new import

const GiveawayBanner = ({
  description = "Enter our monthly giveaway for a chance to win free service credit and merch!",
  onSubmit, // still supported if you want to override
}) => {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const openBtnRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!open && openBtnRef.current) openBtnRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!visible) return null;

  return (
    <>
      <section className={styles.banner} aria-label="Giveaway announcement">
        <p className={styles.text}>{description}</p>

        <div className={styles.actions}>
          <button
            ref={openBtnRef}
            type="button"
            className={styles.cta}
            onClick={() => setOpen(true)}
          >
            Enter Giveaway
          </button>

          <button
            type="button"
            className={styles.dismiss}
            aria-label="Dismiss giveaway announcement"
            onClick={() => setVisible(false)}
          >
            <span className={styles.closeIcon} aria-hidden="true">×</span>
          </button>
        </div>
      </section>

      {open && (
        <Modal onClose={() => setOpen(false)} titleId={titleId}>
          <GiveawayForm
            titleId={titleId}
            onClose={() => setOpen(false)}
            // default submit uses axios client; still lets you pass a custom onSubmit if desired
            onSubmit={
              onSubmit ||
              (async ({ name, phone }) => {
                const resp = await api.post("/entry", { name, phone });
                return { ok: resp.status >= 200 && resp.status < 300 };
              })
            }
          />
        </Modal>
      )}
    </>
  );
};

export default GiveawayBanner;

/* Modal + GiveawayForm stay the same EXCEPT the form no longer uses fetch.
   In the form, you’re already calling onSubmit(entry) provided above. */


/* ---------- Modal (inline for convenience) ---------- */
const Modal = ({ children, onClose, titleId }) => {
  // Click overlay to close (but not clicks inside dialog)
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

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

/* ---------- Form ---------- */
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
          setStatus({ type: "success", message: res.message || "You’re in! We’ll be in touch." });
        } else {
          setStatus({ type: "error", message: res?.message || "Submission failed. Try again." });
        }
      } else {
        // Default: POST to a backend route you can implement
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
          <button
            type="button"
            className={styles.secondary}
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="submit"
            className={styles.primary}
            disabled={status.type === "loading"}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
