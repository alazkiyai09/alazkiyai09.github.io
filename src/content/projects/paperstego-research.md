---
title: "Steganography Research (Published)"
status: "completed"
category: "security-research"
tags:
  - "steganography"
  - "research"
  - "publication"
  - "image-processing"
summary: "Published steganography research implementing PVD+LSB+Modulo encoding with CTR_DRBG randomization and empirical image-quality evaluation."
technologies:
  - Python
  - OpenCV
  - NumPy
  - PyCryptodome
  - AES-128
repository: "https://github.com/alazkiyai09/pvd-lsb-modulo-steganography"
metrics:
  trialsEvaluated: 1310
  publications: 1

startDate: "2025-01-01"
completedDate: "2025-01-31"
---

## Overview

Published research in Springer LNNS (vol 285) on improving steganography imperceptibility using PVD, LSB substitution, and modulo encoding with NIST SP 800-90A CTR_DRBG. 1,310 embedding trials evaluated with PSNR, MSE, and SSIM metrics.

## Project Details

This project documents the implementation behind my Springer LNNS publication on image steganography imperceptibility.

## Technologies Used

- Python
- OpenCV
- NumPy
- PyCryptodome
- AES-128

## Repository

Full source code available on GitHub: [https://github.com/alazkiyai09/pvd-lsb-modulo-steganography](https://github.com/alazkiyai09/pvd-lsb-modulo-steganography)

## Key Features

- Combined PVD, LSB, and modulo encoding workflow
- NIST SP 800-90A CTR_DRBG randomization (AES-128)
- Reproducible evaluation using PSNR, MSE, and SSIM

## Results

- 1,310 total embedding trials (131 images × 10 message sizes)
- Quantitative quality comparison using PSNR, MSE, and SSIM
- Peer-reviewed publication in Springer LNNS volume 285
