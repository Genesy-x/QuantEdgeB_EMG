import nodemailer from 'nodemailer';

export const createTransporter = () => {
  // Use Resend for email sending (already installed)
  return nodemailer.createTransporter({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY
    }
  });
};