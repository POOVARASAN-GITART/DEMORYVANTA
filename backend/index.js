require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ryvanta').then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Schemas
const memberSchema = new mongoose.Schema({
  name: String,
  email: String
});

const registrationSchema = new mongoose.Schema({
  registration_id: { type: String, unique: true },
  team_name: String,
  institution: String,
  year: String,
  leader_name: String,
  leader_email: String,
  leader_phone: String,
  event_name: String,
  domain: String,
  user_upi_id: String,
  upi_ref: String,
  payment_status: { type: String, default: "pending" },
  members: [memberSchema],
}, { timestamps: true });

// Pre-save hook to generate registration_id
registrationSchema.pre('save', async function(next) {
  if (!this.registration_id) {
    const eventNameLower = (this.event_name || '').toLowerCase();
    let prefix = 'TIC0';
    if (eventNameLower.includes('hackathon')) {
      prefix = 'TIC1';
    } else if (eventNameLower.includes('game') || eventNameLower.includes('2d')) {
      prefix = 'TIC2';
    } else if (eventNameLower.includes('ctf') || eventNameLower.includes('capture')) {
      prefix = 'TIC3';
    }

    const lastReg = await this.constructor.findOne({ registration_id: new RegExp('^' + prefix) })
                                          .sort({ createdAt: -1 });

    let newNumber = 1;
    if (lastReg && lastReg.registration_id && lastReg.registration_id.length > prefix.length) {
      const lastNumberStr = lastReg.registration_id.substring(prefix.length);
      const parsed = parseInt(lastNumberStr, 10);
      if (!isNaN(parsed)) {
        newNumber = parsed + 1;
      }
    }
    
    this.registration_id = `${prefix}${newNumber.toString().padStart(2, '0')}`;
  }
  next();
});

const Registration = mongoose.model('Registration', registrationSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_HOST_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_HOST_PASSWORD || 'your-app-password',
  }
});
// Nodemailer port 587 uses STARTTLS, so secure: false is correct for port 587. Let's fix that.
// Let me update the transporter setup after writing this.

const sendConfirmationEmail = async (registration) => {
  const subject = `Registration Confirmation - ${registration.event_name}`;
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background-color: #0ea5e9; color: #ffffff; text-align: center; padding: 20px; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; color: #333333; line-height: 1.6; }
        .highlight { background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .id-badge { font-size: 20px; font-weight: bold; color: #0ea5e9; }
        .footer { background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>RYVANTA Registration Confirmed</h1>
        </div>
        <div class="content">
            <p>Dear <strong>${registration.leader_name}</strong>,</p>
            <p>Thank you for registering your team <strong>${registration.team_name}</strong> for <strong>${registration.event_name}</strong> at RYVANTA.</p>
            
            <div class="highlight">
                <p style="margin: 0;">Your Official Team ID is:</p>
                <p class="id-badge" style="margin: 10px 0 0 0;">${registration.registration_id}</p>
            </div>
            
            <p>Your payment is currently pending verification. You will receive further instructions and event details shortly.</p>
            <p>Please keep this Team ID handy, as it will be required for all future communications and check-ins during the event.</p>
            
            <p>Best Regards,<br>The RYVANTA Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2026 RYVANTA. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
  const textContent = htmlContent.replace(/<[^>]+>/g, '');

  try {
    await transporter.sendMail({
      from: process.env.DEFAULT_FROM_EMAIL || process.env.EMAIL_HOST_USER || 'noreply@ryvanta.com',
      to: registration.leader_email,
      subject: subject,
      text: textContent,
      html: htmlContent
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

app.get('/', (req, res) => {
  res.send('RYVANTA API is running. The frontend application is available at http://localhost:5173');
});

const registerHandler = async (req, res) => {
  try {
    const data = req.body;
    const payload = {
      team_name: data.teamName,
      institution: data.institution,
      year: data.year,
      leader_name: data.leaderName,
      leader_email: data.leaderEmail,
      leader_phone: data.leaderPhone,
      event_name: data.eventName,
      domain: data.domain,
      user_upi_id: data.userUpiId,
      upi_ref: data.upiRef,
      payment_status: data.paymentStatus || 'pending',
      members: data.members || []
    };

    const registration = new Registration(payload);
    await registration.save();
    
    // Send email asynchronously
    sendConfirmationEmail(registration);

    return res.status(201).json({ success: true, data: registration });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, errors: error.message });
  }
};

app.post('/api/register', registerHandler);
app.post('/.netlify/functions/index/register', registerHandler);
app.post('/.netlify/functions/index/api/register', registerHandler);

const serverless = require('serverless-http');

// Local Development
if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Netlify Serverless Export
module.exports.handler = serverless(app);
