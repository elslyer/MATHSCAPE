// ==========================================
// MATHSCAPE CERTIFICATE GENERATOR
// ==========================================

import { totalScore } from './progress.js';


export function downloadCertificate() {

  // ==========================================
  // GET LIVE SCORE
  // ==========================================

  const score =
    totalScore();


  // ==========================================
  // MAXIMUM SCORE
  // ==========================================

  const maxScore = 500;


  // ==========================================
  // COMPLETION DATE
  // ==========================================

  const completionDate =
    new Date().toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    );


  // ==========================================
  // LOAD CERTIFICATE TEMPLATE
  // ==========================================

  const certificateImage =
    new Image();


  certificateImage.src =
    'assets/Certificate.png';


  certificateImage.onload = () => {

    // ==========================================
    // CREATE CANVAS
    // ==========================================

    const canvas =
      document.createElement('canvas');


    canvas.width =
      certificateImage.width;


    canvas.height =
      certificateImage.height;


    const ctx =
      canvas.getContext('2d');


    // ==========================================
    // DRAW CERTIFICATE TEMPLATE
    // ==========================================

    ctx.drawImage(
      certificateImage,
      0,
      0
    );


    // ==========================================
    // DRAW LIVE SCORE
    // ==========================================

    ctx.fillStyle =
      '#ffffff';


    ctx.textAlign =
      'center';


    ctx.font =
      'bold 80px monospace';


    ctx.fillText(
      score,
      canvas.width * 0.75,
      canvas.height * 0.57
    );


    // ==========================================
    // DRAW DATE
    // ==========================================

    ctx.textAlign =
      'left';


    ctx.font =
      '50px monospace';


    ctx.fillText(
      completionDate,
      canvas.width * 0.16,
      canvas.height * 0.84
    );


    // ==========================================
    // DOWNLOAD CERTIFICATE
    // ==========================================

    const link =
      document.createElement('a');


    link.download =
      'Mathscape-Certificate.png';


    link.href =
      canvas.toDataURL(
        'image/png'
      );


    link.click();

  };


  // ==========================================
  // ERROR HANDLING
  // ==========================================

  certificateImage.onerror = () => {

    alert(
      'Certificate template could not be loaded.'
    );

  };

}
