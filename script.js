/**
 * OJT Portfolio - Interactive Script
 * Handles Scroll Animations and PDF Download Mockup
 */

document.addEventListener('DOMContentLoaded', () => {
  initProgressTracker();
  initScrollReveal();
  initEvaluationDownloads();
  initCertificateDownload();
  initRequirementDownloads();
  initWeeklyReportPreview();
  setupMobileNavbar();
});


/**
 * Automatically calculates and updates the OJT hours progress bar and metrics
 */
function initProgressTracker() {
  const card = document.getElementById('ojt-progress-card');
  if (!card) return;

  // Read data values directly from HTML data attributes
  const completed = parseFloat(card.dataset.completed) || 0;
  const total = parseFloat(card.dataset.total) || 300;
  
  // Calculate percentage safely capped at 100%
  const percentage = Math.min(Math.round((completed / total) * 100), 100);

  // Target the dynamic DOM elements
  const completedEl = document.getElementById('progress-completed');
  const totalEl = document.getElementById('progress-total');
  const badgeEl = document.getElementById('progress-badge');
  const fillEl = document.getElementById('progress-fill');

  // Inject updated metrics and set the progress bar width fluidly
  if (completedEl) completedEl.textContent = completed;
  if (totalEl) totalEl.textContent = total;
  if (badgeEl) badgeEl.textContent = `(${percentage}%)`;
  if (fillEl) fillEl.style.width = `${percentage}%`;
}


/**
 * Initializes IntersectionObserver to reveal elements when they enter the viewport
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05, // Trigger when 5% of the element is visible (safe for tall grids on mobile)
      rootMargin: '0px 0px -10px 0px' // Reduced offset for prompt loading
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    revealElements.forEach(element => {
      element.classList.add('revealed');
    });
  }
}



/**
 * Sets up PDF download interaction for the Certificate completion button
 */
function initCertificateDownload() {
  const certBtn = document.getElementById('download-certificate-btn');
  if (!certBtn) return;

  certBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Preparing Certificate PDF...', 'info');

    setTimeout(() => {
      try {
        downloadCertificatePlaceholderPDF();
        showNotification('Certificate PDF Downloaded!', 'success');
      } catch (err) {
        console.error('Certificate download failed:', err);
        showNotification('Download failed. Please try again.', 'error');
      }
    }, 1200);
  });
}

function downloadCertificatePlaceholderPDF() {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 130 >>
stream
BT
/F1 18 Tf
50 700 Td
(Aira E. Villarito - OJT Completion Record) Tj
/F1 12 Tf
0 -40 Td
(Document: Certificate of Completion Placeholder) Tj
0 -20 Td
(This is a verified placeholder document for the Certificate.) Tj
0 -20 Td
(Clicking the download button successfully downloads this mockup file.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000062 00000 n 
0000000120 00000 n 
0000000250 00000 n 
0000000424 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
495
%%EOF`;

  const bytes = new Uint8Array(content.length);
  for (let i = 0; i < content.length; i++) {
    bytes[i] = content.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Aira_Villarito_OJT_Certificate_Placeholder.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Sets up PDF download interaction for the Evaluation placeholder cards
 */
function initEvaluationDownloads() {
  const traineePdf = document.getElementById('trainee-eval-pdf');
  const performancePdf = document.getElementById('performance-eval-pdf');

  if (traineePdf) {
    traineePdf.addEventListener('click', (e) => {
      e.preventDefault();
      triggerEvaluationDownload('Trainee Evaluation', 'Aira_Villarito_Trainee_Evaluation.pdf');
    });
  }

  if (performancePdf) {
    performancePdf.addEventListener('click', (e) => {
      e.preventDefault();
      triggerEvaluationDownload('Performance Evaluation', 'Aira_Villarito_Performance_Evaluation.pdf');
    });
  }
}

function triggerEvaluationDownload(label, fileName) {
  showNotification(`Preparing ${label} PDF...`, 'info');

  setTimeout(() => {
    try {
      downloadEvaluationPlaceholderPDF(label, fileName);
      showNotification(`${label} PDF Downloaded!`, 'success');
    } catch (err) {
      console.error(`${label} download failed:`, err);
      showNotification('Download failed. Please try again.', 'error');
    }
  }, 1200);
}

function downloadEvaluationPlaceholderPDF(label, fileName) {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 130 >>
stream
BT
/F1 18 Tf
50 700 Td
(Aira E. Villarito - OJT Evaluation Record) Tj
/F1 12 Tf
0 -40 Td
(Document: ${label}) Tj
0 -20 Td
(This is a verified placeholder document for the OJT Evaluation.) Tj
0 -20 Td
(Clicking the card on the portfolio successfully downloads this file.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000062 00000 n 
0000000120 00000 n 
0000000250 00000 n 
0000000418 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
489
%%EOF`;

  const bytes = new Uint8Array(content.length);
  for (let i = 0; i < content.length; i++) {
    bytes[i] = content.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Creates and displays a sleek banner notification
 */
function showNotification(message, type = 'success') {
  // Remove existing notification if present
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '8px';
  toast.style.color = '#fff';
  toast.style.fontWeight = '600';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  toast.style.zIndex = '9999';
  toast.style.transform = 'translateY(100px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
  
  // Icon based on type
  let icon = '';
  if (type === 'success') {
    toast.style.backgroundColor = '#2ecc71';
    icon = '✓ ';
  } else if (type === 'info') {
    toast.style.backgroundColor = '#3498db';
    icon = 'ℹ ';
  } else {
    toast.style.backgroundColor = '#e74c3c';
    icon = '⚠ ';
  }

  toast.textContent = icon + message;
  document.body.appendChild(toast);

  // Force reflow
  toast.offsetHeight;

  // Slide up
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  // Fade out
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/**
 * Sets up PDF download interaction safely for placeholder requirement cards
 */
function initRequirementDownloads() {
  const reqButtons = document.querySelectorAll('.req-action-btn');
  reqButtons.forEach(btn => {
    // CRITICAL FIX: Skip if it has an inline handler OR points to a real file path instead of '#'
    if (btn.getAttribute('onclick') || (btn.getAttribute('href') && btn.getAttribute('href') !== '#')) return;
    
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const labelElement = btn.querySelector('span');
      const label = labelElement ? labelElement.textContent.replace('Download ', '') : 'Document';
      
      showNotification(`Preparing ${label}...`, 'info');

      setTimeout(() => {
        try {
          downloadDocumentPlaceholder(label);
          showNotification(`${label} Downloaded!`, 'success');
        } catch (err) {
          console.error('Download failed:', err);
          showNotification('Download failed.', 'error');
        }
      }, 1000);
    });
  });
}




/**
 * FIXED: Missing function to generate and download mock PDF vectors for requirements
 */
function downloadDocumentPlaceholder(label) {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 140 >>
stream
BT
/F1 18 Tf
50 700 Td
(Aira E. Villarito - OJT Academic Record) Tj
/F1 12 Tf
0 -40 Td
(Document Mockup: ${label}) Tj
0 -20 Td
(This is a verified placeholder document for this submission requirement.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000062 00000 n 
0000000120 00000 n 
0000000250 00000 n 
0000000418 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
489
%%EOF`;

  const bytes = new Uint8Array(content.length);
  for (let i = 0; i < content.length; i++) {
    bytes[i] = content.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `VILLARITO_${label.replace(/\s+/g, '_')}_Placeholder.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
/**
 * Helper: Toast Notification System
 */
function showNotification(message, type = 'success') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 12px 24px; color: #fff; border-radius: 6px; z-index: 10000; font-family: sans-serif; font-size: 14px; transition: all 0.3s ease; opacity: 0; transform: translateY(20px); box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3000);
}

/**
 * Helper: Triggers PDF File Download
 */
function downloadWeeklyReportPDF(weekNum) {
const filePath = `pdf/weekly report/VILLARITO_Week_${weekNum}_Report.pdf`;
    const link = document.createElement('a');
    link.href = filePath;
    link.download = `VILLARITO_Week_${weekNum}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/**
 * Opens the modern modal viewer with safe fallback notice management
 */
function openDocumentPreview(docName, categoryName = "Before On-the-Job Training") {
    const cleanName = docName.trim().toLowerCase();
    
    const fileMapping = {
        'medical certificate': 'pdf/weekly report/VILLARITO_medical_certificate.pdf',
        'insurance': 'pdf/weekly report/VILLARITO_OJT_Insurance.pdf',
        'cv': 'pdf/weekly report/VILLARITO_AIRA_CV.pdf',
        'resume': 'pdf/weekly report/VILLARITO_AIRA_CV.pdf',
        'letter of endorsement': 'pdf/weekly report/VILLARITO_Letter_Of_Endorsement.pdf',
        'endorsement letter': 'pdf/weekly report/VILLARITO_Letter_Of_Endorsement.pdf',
        'letter of intent': 'pdf/weekly report/VILLARITO_Letter_Of_Intent.pdf',
        'weekly report 1': 'pdf/weekly report/VILLARITO_Week#1_Report.pdf',
        'weekly report 2': 'pdf/weekly report/VILLARITO_Week#2_Report.pdf',
        'weekly report 3': 'pdf/weekly report/VILLARITO_Week#3_Report.pdf'
    };

    const filePath = fileMapping[cleanName];

    if (!filePath) {
        showNotification(`Preview unavailable for "${docName}". Mock download fallback active.`, 'error');
        return;
    }

    const modal = document.getElementById('pdf-preview-modal');
    const frame = document.getElementById('pdf-preview-frame');
    const titleEl = document.getElementById('modal-doc-title');
    const categoryEl = document.getElementById('modal-doc-category');
    const openLink = document.getElementById('modal-open-link');

    if (modal && frame) {
        // Convert the relative path into a fully qualified absolute URL for Google's servers
        const absoluteUrl = `${window.location.origin}/${filePath}`;
        
        // Wrap your URL in the Google Docs embedded viewer structure
        frame.src = `https://docs.google.com/gview?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
        
        if (titleEl) titleEl.textContent = docName;
        if (categoryEl) categoryEl.textContent = categoryName;
        if (openLink) openLink.href = filePath; // Keep the original file path for direct download button clicks

        modal.classList.add('active');
    }
}

/**
 * Closes the document preview modal and terminates background iframe loading
 */
function closePreview() {
    const modal = document.getElementById('pdf-preview-modal');
    const frame = document.getElementById('pdf-preview-frame');
    
    if (modal) {
        modal.classList.remove('active');
    }
    if (frame) {
        frame.src = ''; // Stops PDF from processing/consuming memory in background
    }
}

/**
 * Interactive Weekly Progress Report Card Preview & Hover Download
 */
let currentPreviewWeekNum = null;
let currentPreviewDateRange = null;
let hasDownloadedThisSession = false;

function initWeeklyReportPreview() {
    const overlay = document.getElementById('report-preview-overlay');
    const closeBtn = document.getElementById('preview-close-btn');
    const folderWrapper = document.getElementById('preview-folder-wrapper');

    if (!overlay || !closeBtn || !folderWrapper) return;

    // Close preview when close button is clicked
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.classList.remove('visible');
        currentPreviewWeekNum = null;
        currentPreviewDateRange = null;
    });

    // Close preview when clicking outside the widget
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('visible');
            currentPreviewWeekNum = null;
            currentPreviewDateRange = null;
        }
    });
// Trigger the folder animation first, then open the PDF preview
    folderWrapper.addEventListener('click', () => {
        if (currentPreviewWeekNum) {
            // 1. Add the class that triggers your folder's opening CSS animation
            folderWrapper.classList.add('open'); 

            // 2. Let the animation play out (400ms) before opening the preview modal
            setTimeout(() => {
                // Open the main PDF preview modal
                openWeeklyReportPDFPreview(currentPreviewWeekNum);
                
                // Clean up: hide the intermediate overlay and reset the folder state for next time
                overlay.classList.remove('visible');
                folderWrapper.classList.remove('open');
            }, 400); // Match this duration (400ms) to your CSS folder transition time
        }
    });
}

/**
 * Main DOM Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize the background overlay click tracker for the main modal
    const modal = document.getElementById('pdf-preview-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePreview();
            }
        });
    }

    // 2. Initialize weekly report event listeners
    initWeeklyReportPreview();
});

function openWeeklyReportPreview(weekNum, dateRange) {
  const overlay = document.getElementById('report-preview-overlay');
  const dateRangeEl = document.getElementById('mini-date-range');
  const weekBadgeEl = document.getElementById('mini-week-badge');
  
  const day1El = document.getElementById('mini-cell-day-1');
  const day2El = document.getElementById('mini-cell-day-2');
  const day3El = document.getElementById('mini-cell-day-3');
  
  const act1El = document.getElementById('mini-cell-act-1');
  const act2El = document.getElementById('mini-cell-act-2');
  const act3El = document.getElementById('mini-cell-act-3');

  if (!overlay) return;

  // Set current context
  currentPreviewWeekNum = weekNum;
  currentPreviewDateRange = dateRange;
  hasDownloadedThisSession = false; // Reset lock for new download session

  // Update dynamic content elements
  if (dateRangeEl) dateRangeEl.textContent = dateRange;
  if (weekBadgeEl) weekBadgeEl.textContent = `WEEK ${weekNum.toString().padStart(2, '0')}`;

  // Shading/Table row updates based on Week Number
  if (weekNum === 1) {
    if (day1El) day1El.textContent = "July 12 (Sat)";
    if (act1El) act1El.textContent = "Introduction to Company, Orientation";
    
    if (day2El) day2El.textContent = "July 13 (Sun)";
    if (act2El) act2El.textContent = "Project Presentation & Goals";
    
    if (day3El) day3El.textContent = "July 14 (Mon)";
    if (act3El) act3El.textContent = "Assigned to designated Projects";
  } else {
    // Shading data for placeholder reports (Weeks 2-8)
    if (day1El) day1El.textContent = "Day 1 (Mon)";
    if (act1El) act1El.textContent = `Week ${weekNum} Core Coding & Setup`;
    
    if (day2El) day2El.textContent = "Day 2 (Tue)";
    if (act2El) act2El.textContent = "Database Schema Shading & API Dev";
    
    if (day3El) day3El.textContent = "Day 3 (Wed)";
    if (act3El) act3El.textContent = "Weekly Unit Testing & Bug fixes";
  }

  // Display overlay
  overlay.classList.add('visible');
  showNotification(`Opened Week ${weekNum} report folder. Hover folder to download!`, 'info');
}

/**
 * Static PDF download for weekly reports from pdf/weekly report/ directory
 */
function downloadWeeklyReportPDF(weekNum) {
  const link = document.createElement('a');
  link.href = `pdf/weekly%20report/VILLARITO_Week%23${weekNum}_Report.pdf`;
  link.download = `VILLARITO_Week#${weekNum}_Report.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Setup and handle mobile responsive navbar hamburger interaction
 */
function setupMobileNavbar() {
  const navbarContainer = document.querySelector('.navbar-container');
  if (!navbarContainer) return;

  // 1. Create hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-menu';
  hamburger.id = 'hamburger-menu';
  hamburger.setAttribute('aria-label', 'Toggle Navigation');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  // 2. Insert it before the .nav-links container
  const navLinks = navbarContainer.querySelector('.nav-links');
  if (navLinks) {
    navbarContainer.insertBefore(hamburger, navLinks);
  }

  // 3. Create text spans dynamically inside each link using the image's alt text
  if (navLinks) {
    navLinks.querySelectorAll('.nav-item').forEach(link => {
      const img = link.querySelector('.nav-btn-img');
      if (img && !link.querySelector('.nav-btn-text')) {
        const textSpan = document.createElement('span');
        textSpan.className = 'nav-btn-text';
        textSpan.textContent = img.getAttribute('alt') || '';
        link.appendChild(textSpan);
      }
    });
  }

  // 4. Toggle active class on hamburger and nav-links
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // Close menu when a link inside is clicked
  navLinks.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}
function openWeeklyReportPDFPreview(weekNum) {

    const modal = document.getElementById("pdf-preview-modal");
    const frame = document.getElementById("pdf-preview-frame");
    const titleEl = document.getElementById("modal-doc-title");
    const categoryEl = document.getElementById("modal-doc-category");
    const openLink = document.getElementById("modal-open-link");

    const filename = `VILLARITO_Week_${weekNum}_Report.pdf`;

    const pdfPath = `/pdf/weekly-report/${filename}`;

    const absoluteUrl = window.location.origin + pdfPath;

    if (titleEl)
        titleEl.textContent = `Week ${weekNum} Progress Report`;

    if (categoryEl)
        categoryEl.textContent = "Weekly Progress Reports";

    if (openLink)
        openLink.href = absoluteUrl;

    frame.src =
        `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(absoluteUrl)}`;

    modal.classList.add("active");
}