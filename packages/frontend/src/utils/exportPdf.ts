export function exportToPdf(elementId: string, filename: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Dynamic import to avoid SSR issues
  import('html2pdf.js' as any).then((html2pdfModule) => {
    const html2pdf = html2pdfModule.default || html2pdfModule;
    html2pdf()
      .set({
        margin: 10,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#0a1929' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      })
      .from(element)
      .save();
  });
}
