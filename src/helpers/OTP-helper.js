import crypto from 'crypto';
import nodemailer from 'nodemailer';

import { EMAIL_ID, EMAIL_PASSWORD } from '../config/server-config.js';

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};

export const hashOTP = (otp) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
};

export const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export const verifyHashedOTP = (otp, hashedOtp) => {
    if (!otp || !hashedOtp) {
        console.log('verifyHashedOTP: Missing OTP or hashedOtp', { otp, hashedOtp });
        return false;
    }

    const hashedInputOTP = hashOTP(otp);
    console.log('verifyHashedOTP comparison:', {
        inputOtp: otp,
        hashedInputOTP,
        storedHashedOtp: hashedOtp,
        match: hashedInputOTP === hashedOtp
    });

    return hashedInputOTP === hashedOtp;
};

export const verifyHashedPassword = (password, hashedPassword) => {
    const hashedInputPassword = hashOTP(password);
    return hashedInputPassword === hashedPassword;
};
export const sendOTPByEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_ID,
                pass: EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: EMAIL_ID,
            to: email,
            subject: 'Email Verification - Your OTP',
            text: `Your OTP for email verification is: ${otp}. Please use this OTP within 10 minutes.`,
        };
        await transporter.sendMail(mailOptions);

        console.log(`OTP sent successfully to ${email}`);
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};
