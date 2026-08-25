// ==========================================
// MATHSCAPE CERTIFICATE GENERATOR
// ==========================================

import { progress } from './progress.js';

export function downloadCertificate() {

  // ==========================================
  // GET LIVE SCORE
  // ==========================================

  const totalScore =
    progress.getTotalScore();


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
    // SCORE
    // ==========================================

    ctx.fillStyle =
      '#ffffff';


    ctx.textAlign =
      'center';


    ctx.font =
      'bold 42px monospace';


    ctx.fillText(
      `${totalScore} / ${maxScore}`,
      canvas.width * 0.78,
      canvas.height * 0.56
    );


    // ==========================================
    // DATE
    // ==========================================

    ctx.textAlign =
      'left';


    ctx.font =
      '22px monospace';


    ctx.fillText(
      completionDate,
      canvas.width * 0.02,
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


  certificateImage.onerror = () => {

    alert(
      'Certificate template could not be loaded.'
    );

  };

}
