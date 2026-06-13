type ExportFullPdfOptions = {
  element: HTMLElement;
  fileName?: string;
};

const PAGE_WIDTH_MM = 210;

function waitForAnimationFrame() {
  return new Promise<void>(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll('img'));

  await Promise.all(
    images.map(
      image =>
        new Promise<void>(resolve => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }

          const done = () => resolve();
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
        })
    )
  );
}

function getRenderedSize(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const width = Math.ceil(
    Math.max(rect.width, element.scrollWidth, element.clientWidth)
  );
  const height = Math.ceil(
    Math.max(rect.height, element.scrollHeight, element.clientHeight)
  );

  return { width, height };
}

async function loadRenderers() {
  const [html2canvasMod, jspdfMod] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  return {
    html2canvas: html2canvasMod.default,
    jsPDF: jspdfMod.jsPDF,
  };
}

export async function exportFullResumePdf({
  element,
  fileName = 'resume-full.pdf',
}: ExportFullPdfOptions): Promise<void> {
  const { html2canvas, jsPDF } = await loadRenderers();
  const { width, height } = getRenderedSize(element);

  if (!width || !height) {
    throw new Error('Empty resume content');
  }

  await waitForImages(element);
  await waitForAnimationFrame();

  const scale = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    useCORS: true,
    allowTaint: false,
    scale,
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: width,
    windowHeight: height,
    onclone: clonedDoc => {
      clonedDoc.documentElement.style.background = '#ffffff';
      clonedDoc.body.style.margin = '0';
      clonedDoc.body.style.padding = '0';
      clonedDoc.body.style.background = '#ffffff';

      const style = clonedDoc.createElement('style');
      style.textContent = `
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
        }
        .resume-content {
          margin: 0 !important;
          box-shadow: none !important;
          overflow: visible !important;
        }
      `;
      clonedDoc.head.appendChild(style);

      const clonedRoot = clonedDoc.querySelector('.resume-content');
      if (clonedRoot instanceof HTMLElement) {
        clonedRoot.style.margin = '0';
        clonedRoot.style.boxShadow = 'none';
        clonedRoot.style.overflow = 'visible';
      }
    },
  });

  const imgData = canvas.toDataURL('image/png');
  const pageHeightMm = (canvas.height / canvas.width) * PAGE_WIDTH_MM;
  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: [PAGE_WIDTH_MM, pageHeightMm],
    compress: true,
  });

  pdf.addImage(
    imgData,
    'PNG',
    0,
    0,
    PAGE_WIDTH_MM,
    pageHeightMm,
    undefined,
    'FAST'
  );
  pdf.save(fileName);
}
