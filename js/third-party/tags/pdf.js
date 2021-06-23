/* global NexT, CONFIG, PDFObject */

document.addEventListener('page:loaded', () => {
  if (document.querySelectorAll('.pdf-container').length) {
    NexT.utils.getScript(CONFIG.pdf.object_url, {
      condition: window.PDFObject
    }).then(() => {
      document.querySelectorAll('.pdf-container').forEach(element => {
        PDFObject.embed(element.dataset.target, element, {
          pdfOpenParams: {
            navpanes : 0,
            toolbar  : 0,
            statusbar: 0,
            pagemode : 'thumbs',
            view     : 'FitH'
          },
          height      : element.dataset.height,
          fallbackLink: '<p>This browser does not support inline PDFs. Please download the PDF to view it: '
                        + '<a href=\'[url]\' rel=\'noopener\' target=\'_blank\'>Download PDF</a></p>'
          // PDFJS_URL   : CONFIG.pdf.url,  // Disable pdf.js fallback; instead, we use fallbackLink
          // forcePDFJS  : true  // buggy
        });
      });
    });
  }
});
