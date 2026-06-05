import React, { useEffect, useState, useCallback } from "react";
import { GLOSSARY_KA_ITEMS } from "../data/glossaryKa";
import { GLOSSARY_EN_ITEMS } from "../data/glossaryEn";
import {
  escapeHtml,
  glossaryEntryHtml,
  splitGlossaryEntry,
} from "../utils/glossaryEntry";
import "./modalShared.scss";

/**
 * @param {string} text
 */
function GlossaryEntryText({ text }) {
  const { firstWord, rest } = splitGlossaryEntry(text);

  return (
    <>
      <strong>{firstWord}</strong>
      {rest}
    </>
  );
}

const GlossaryModal = ({ language, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const isGeorgian = language !== "EN";

  useEffect(() => {
    setSearch("");
    setItems(isGeorgian ? GLOSSARY_KA_ITEMS : GLOSSARY_EN_ITEMS);
    setError(null);
    setLoading(false);
  }, [isGeorgian]);

  const handleBackdrop = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const filtered = items.filter((item) =>
    item.text?.toLowerCase().includes(search.toLowerCase()),
  );

  const handlePrint = () => {
    const title = language === "EN" ? "Glossary" : "გლოსარიუმი";
    const entries = filtered
      .map(
        (item) =>
          `<div class="entry">${glossaryEntryHtml(item.text || "")}</div>`,
      )
      .join("");

    const printHtml = `<!DOCTYPE html>
<html lang="${isGeorgian ? "ka" : "en"}">
<head>
  <meta charset="utf-8"/>
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: FiraGO, sans-serif; color: #37496d; padding: 24px; }
    h1 { color: #005c97; font-size: 22px; margin-bottom: 24px; }
    .entry { margin-bottom: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .entry strong { color: #005c97; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  ${entries}
  <script>
    window.addEventListener("load", function () {
      window.focus();
      window.print();
    });
  <\/script>
</body>
</html>`;

    const triggerPrint = (targetWindow) => {
      targetWindow.document.open();
      targetWindow.document.write(printHtml);
      targetWindow.document.close();
    };

    const printWindow = window.open("about:blank", "_blank");
    if (printWindow) {
      triggerPrint(printWindow);
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.setAttribute(
      "style",
      "position:fixed;right:0;bottom:0;width:0;height:0;border:0;",
    );
    document.body.appendChild(iframe);
    const iframeWindow = iframe.contentWindow;
    if (!iframeWindow) {
      iframe.remove();
      return;
    }
    triggerPrint(iframeWindow);
    iframeWindow.addEventListener("afterprint", () => iframe.remove());
    setTimeout(() => iframe.remove(), 60_000);
  };

  return (
    <div
      onClick={handleBackdrop}
      className="modal-overlay"
      style={{ fontFamily: "FiraGO, sans-serif" }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <h2 className="modal-title">
            {language === "EN" ? "Glossary" : "გლოსარიუმი"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            aria-label={language === "EN" ? "Close" : "დახურვა"}
          >
            ×
          </button>
        </div>

        <div className="modal-section">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === "EN" ? "Search…" : "ძიება…"}
            className="modal-input"
            style={{ fontFamily: "FiraGO, sans-serif" }}
          />
        </div>

        <div className="modal-body modal-body--list">
          {loading && (
            <p className="modal-message" style={{ color: "#37496d" }}>
              {language === "EN" ? "Loading…" : "იტვირთება…"}
            </p>
          )}
          {error && (
            <p className="modal-message modal-message--error">{error}</p>
          )}
          {!loading && !error && filtered.length === 0 && (
            <p className="modal-message modal-message--muted">
              {language === "EN" ? "No results." : "შედეგი არ მოიძებნა."}
            </p>
          )}
          {!loading &&
            !error &&
            filtered.map((item) => (
              <div key={item.ID} className="modal-entry">
                <GlossaryEntryText text={item.text || ""} />
              </div>
            ))}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={handlePrint}
            className="modal-btn modal-btn--secondary"
            style={{ fontFamily: "FiraGO, sans-serif" }}
          >
            {language === "EN" ? "Print" : "ბეჭდვა"}
          </button>

          <hr className="modal-divider" />

          <div className="modal-footer-actions">
            <button
              type="button"
              onClick={onClose}
              className="modal-btn modal-btn--primary"
              aria-label={language === "EN" ? "Close" : "დახურვა"}
              style={{ fontFamily: "FiraGO, sans-serif" }}
            >
              {language === "EN" ? "Close" : "დახურვა"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlossaryModal;
