import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoMdDownload } from "react-icons/io";

function ChapterContent({ chapter }) {
  const [loading, setLoading] = useState(false);
  const pdfExportRef = useRef(null);
  const currentOrigin = window.location.origin;

  const handleDownloadPdf = async () => {
    const element = pdfExportRef.current;
    if (!element) return;

    setLoading(true);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          const styles = clonedDoc.querySelectorAll(
            'style, link[rel="stylesheet"]',
          );
          styles.forEach((s) => s.remove());

          const exportArea = clonedDoc.getElementById("pdf-export-safe-area");
          if (!exportArea) return;

          exportArea.style.background = "#ffffff";
          exportArea.style.color = "#1e293b";
          exportArea.style.fontFamily = "Arial, sans-serif";
        },
      });

      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = 210; // A4 width
      const imgProps = new Image();
      imgProps.src = imgData;

      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, imgHeight],
      });

      const margin = 10;

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin,
        pdfWidth - margin * 2,
        imgHeight,
      );

      const fileName =
        chapter?.chapterName?.replace(/[^a-z0-9]/gi, "_").toLowerCase() ||
        "lesson";

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("PDF export failed.");
    } finally {
      setLoading(false);
    }
  };

  const formatCode = (code) => {
    if (!code) return "";

    return code
      .replace(/;/g, ";\n")
      .replace(/{/g, "{\n")
      .replace(/}/g, "\n}\n")
      .replace(/\n\s*\n/g, "\n")
      .trim();
  };

  const formatTextForPdf = (text = "") => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let html = "";
    let listBuffer = [];

    lines.forEach((line) => {
      if (/^\d+\./.test(line)) {
        listBuffer.push(line.replace(/^\d+\.\s*/, ""));
      } else {
        if (listBuffer.length) {
          html += `<ol>${listBuffer.map((i) => `<li>${i}</li>`).join("")}</ol>`;
          listBuffer = [];
        }
        html += `<p style="margin-bottom:12px;">${line}</p>`;
      }
    });

    if (listBuffer.length) {
      html += `<ol>${listBuffer.map((i) => `<li>${i}</li>`).join("")}</ol>`;
    }

    return html
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /\b(int|double|boolean|char|Scanner)\b/g,
        "<code style='background:#e2e8f0;padding:2px 6px;border-radius:4px;'>$1</code>",
      );
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {chapter?.chapterName}
          </h2>
          <p className="text-sm text-gray-500 font-medium">Study Materials</p>
        </div>

        <button
          disabled={loading}
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <IoMdDownload className="text-2xl" />
          )}
          <span className="font-bold">
            {loading ? "Exporting..." : "Download PDF"}
          </span>
        </button>
      </div>

      <div className="bg-white">
        {chapter?.videos && chapter.videos.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 text-gray-700 italic border-l-4 border-blue-600 pl-4">
              Lecture Videos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {chapter.videos.filter(Boolean).map((videoId) => (
                <div
                  key={videoId}
                  className="rounded-2xl overflow-hidden shadow-xl aspect-video bg-black"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?origin=${currentOrigin}`}
                    width="100%"
                    height="100%"
                    title="Video Player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        )}

        {chapter?.content && chapter.content.length > 0 && (
          <div className="space-y-12">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-100 pb-3">
              Chapter Summary & Notes
            </h3>
            {chapter.content.map((item, index) => (
              <div key={index} className="space-y-4">
                {item.title && (
                  <h4 className="text-2xl font-bold text-blue-700">
                    {item.title}
                  </h4>
                )}
                {item.description && (
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {item.description}
                  </p>
                )}
                {item.codeExample && (
                  <div className="relative">
                    <div className="absolute top-0 right-0 bg-gray-800 text-white px-3 py-1 text-xs rounded-bl-lg uppercase font-mono z-10">
                      Code
                    </div>

                    <pre
                      className="bg-gray-900 text-green-400 p-6 rounded-2xl 
                 font-mono text-sm border-l-[6px] border-green-500 
                 shadow-inner overflow-x-hidden"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        lineHeight: "1.7",
                      }}
                    >
                      <code>{formatCode(item.codeExample)}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div
          ref={pdfExportRef}
          id="pdf-export-safe-area"
          style={{
            width: "800px",
            padding: "50px",
            backgroundColor: "#ffffff",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#1e293b",
                borderBottom: "5px solid #2563eb",
                paddingBottom: "15px",
                marginBottom: "30px",
              }}
            >
              {chapter?.chapterName}
            </h1>

            {chapter?.videos && chapter.videos.length > 0 && (
              <div style={{ marginBottom: "40px" }}>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#475569",
                    marginBottom: "20px",
                    borderLeft: "5px solid #3b82f6",
                    paddingLeft: "15px",
                  }}
                >
                  Lecture Videos
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "25px",
                  }}
                >
                  {chapter.videos.filter(Boolean).map((videoId) => (
                    <div
                      key={videoId}
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Thumbnail"
                        style={{ width: "100%", display: "block" }}
                      />
                      <div
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          fontSize: "12px",
                          color: "#2563eb",
                          fontWeight: "bold",
                        }}
                      >
                        Scan/Click to Watch: https://youtu.be/{videoId}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
              {chapter?.content?.map((item, index) => (
                <div
                  key={index}
                  style={{ pageBreakInside: "avoid", marginBottom: "50px" }}
                >
                  {item.title && (
                    <h2
                      style={{
                        fontSize: "26px",
                        color: "#1d4ed8",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >
                      {item.title}
                    </h2>
                  )}
                  {item.description && (
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#334155",
                        lineHeight: "1.8",
                        marginBottom: "22px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: formatTextForPdf(item.description),
                      }}
                    />
                  )}

                  {item.codeExample && (
                    <div
                      style={{
                        backgroundColor: "#0f172a",
                        padding: "24px",
                        borderRadius: "16px",
                        borderLeft: "6px solid #22c55e",
                        overflowX: "hidden",
                      }}
                    >
                      <pre
                        style={{
                          color: "#4ade80",
                          fontFamily: "Courier New, monospace",
                          fontSize: "14px",
                          lineHeight: "1.8",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          margin: 0,
                        }}
                      >
                        <code>{formatCode(item.codeExample)}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "50px",
                textAlign: "center",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "20px",
                color: "#94a3b8",
                fontSize: "12px",
              }}
            >
              Generated via your LMS Portal • {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterContent;
