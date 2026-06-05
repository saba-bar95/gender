const sanitizeFilename = (name) =>
  (name || "chart").replace(/[<>:"/\\|?*]+/g, "_").trim() || "chart";

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const svgToCanvas = (svgElement, scale = 2) =>
  new Promise((resolve, reject) => {
    const clone = svgElement.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if (!clone.getAttribute("viewBox")) {
      const { width, height } = svgElement.getBoundingClientRect();
      clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      const viewBox = clone.viewBox.baseVal;
      const width = viewBox.width || img.width;
      const height = viewBox.height || img.height;
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render chart image"));
    };

    img.src = url;
  });

/**
 * @param {SVGSVGElement} svgElement
 * @param {string} filename
 */
export async function downloadChartPng(svgElement, filename) {
  const canvas = await svgToCanvas(svgElement);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create PNG"));
        return;
      }
      triggerDownload(blob, `${sanitizeFilename(filename)}.png`);
      resolve();
    }, "image/png");
  });
}

/**
 * @param {SVGSVGElement} svgElement
 * @param {string} filename
 */
export async function downloadChartPdf(svgElement, filename) {
  const canvas = await svgToCanvas(svgElement);
  const imgData = canvas.toDataURL("image/png");
  const { jsPDF } = await import("jspdf");

  const orientation = canvas.width >= canvas.height ? "landscape" : "portrait";
  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [canvas.width, canvas.height],
  });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${sanitizeFilename(filename)}.pdf`);
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * @param {Record<string, number | null>[]} chartData
 * @param {string[]} seriesKeys
 * @param {string} yearLabel
 * @param {string} filename
 * @param {string[]} [seriesHeaders]
 */
export function downloadChartXls(
  chartData,
  seriesKeys,
  yearLabel,
  filename,
  seriesHeaders = seriesKeys,
) {
  const headers = [yearLabel, ...seriesHeaders];
  const rows = chartData.map((row) => [
    row.year,
    ...seriesKeys.map((key) => (row[key] ?? "")),
  ]);

  let html =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table border="1">';
  html += `<tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr>`;
  for (const row of rows) {
    html += `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`;
  }
  html += "</table></body></html>";

  const blob = new Blob([html], {
    type: "application/vnd.ms-excel;charset=utf-8",
  });
  triggerDownload(blob, `${sanitizeFilename(filename)}.xls`);
}

const escapeCsvCell = (value) => {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

/**
 * @param {Record<string, number | null>[]} chartData
 * @param {string[]} seriesKeys
 * @param {string} yearLabel
 * @param {string} filename
 * @param {string[]} [seriesHeaders]
 */
export function downloadChartCsv(
  chartData,
  seriesKeys,
  yearLabel,
  filename,
  seriesHeaders = seriesKeys,
) {
  const headers = [yearLabel, ...seriesHeaders];
  const lines = [
    headers.map(escapeCsvCell).join(","),
    ...chartData.map((row) =>
      [row.year, ...seriesKeys.map((key) => row[key] ?? "")]
        .map(escapeCsvCell)
        .join(","),
    ),
  ];
  const blob = new Blob([`\uFEFF${lines.join("\n")}`], {
    type: "text/csv;charset=utf-8",
  });
  triggerDownload(blob, `${sanitizeFilename(filename)}.csv`);
}
