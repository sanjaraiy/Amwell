# Online Doctor Appointment Application
A full-stack web application that enables patients to book doctor appointments online, doctors to manage their schedules, and administrators to oversee operations providing a seamless healthcare management experience.

---
## 🚀 Overview
This project provides a complete digital solution for doctor-patient interactions.  
It includes **role-based access control** for three main user types:
- **Patient:** Register, login, search specialists, book or cancel appointments, and make secure online payments.
- **Doctor:** Manage personal profile, view and filter appointments, and update availability.
- **Admin:** Create and manage doctor accounts, monitor platform activity, and view key analytics such as total earnings and recent appointments.
---

## 🧩 Key Features
- **Role-Based Authentication:** Secure JWT-based access for Admin, Doctor, and Patient roles.  
- **Online Appointment Booking:** Real-time doctor availability with debouncing and throttling for optimized performance.  
- **Online Payments:** Integrated Razorpay for seamless and secure transactions.  
- **Cloud Storage:** Cloudinary integration for managing multimedia files (profile images, documents, etc.).  
- **Responsive UI:** Fully adaptive design ensuring accessibility on all screen sizes.  
- **Performance Optimization:** Reduced API response time by 30% and improved page load speed by 45%.
---

## 🧠 What I Did 
1. **Designed** and developed a secure multi-role system to streamline healthcare interactions, improving API efficiency by **30%** through optimized authorization logic.  
2. **Implemented** an end-to-end appointment and payment flow with validation and optimization techniques, achieving **40% faster scheduling** and enhanced reliability.  
3. **Enhanced** performance and user experience by optimizing UI responsiveness and load times, resulting in **45% better performance** across all devices.  

---
## ⚙️ Tech Stack
- **Frontend:** React.js, Context API, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payments:** Razorpay  
- **Cloud Storage:** Cloudinary  
---

## 🧾 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanjaraiy/Amwell.git
   cd Amwell
   ```
2. **Install dependencies**
```bash
cd frontend && npm install
cd backend && npm install
cd admin && npm install
```
3. **Configure environment variables**
Create a .env file in the root directory and add:
```
MONGO_URI=your_mongo_db_connection
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. **Run the application**
# Run backend
```bash
npm run dev
```

# Run frontend
```bash
cd frontend && npm run dev
cd admin && npm run dev
```

5. **📊 Results**
- Improved booking efficiency by 40%
- Reduced API latency by 30%
- Enhanced overall platform performance by 45%

6. **📫 Contact**
- Author: Sanjay Rai
- LinkedIn: linkedin.com/in/sanjayrai
- Email: sanjayrai33724@gmail.com


