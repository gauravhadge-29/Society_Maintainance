# System Design Write-up: Society Maintenance Tracker

## 1. Complaint History Model
The platform handles the lifecycle of a complaint robustly through two core models: `Complaint` and `ComplaintHistory`. 

- **Complaint Model**: Stores the current, most up-to-date state of the issue, including title, description, category, photos, status, and the resident who created it.
- **ComplaintHistory Model**: Designed as an append-only ledger. Every time a complaint's status is modified (e.g., from Open to In Progress, or In Progress to Resolved), a new `ComplaintHistory` document is created referencing the original `complaintId`. It captures the `status`, the `changedBy` user (admin or resident), an optional `remark`, and an automated timestamp (`createdAt`).
  
This separation ensures that fetching the current state is fast and efficient (by querying `Complaint`), while a detailed audit trail is preserved (in `ComplaintHistory`), enabling both transparency for the resident and accountability for the admins.

## 2. Overdue Detection
To manage pending issues effectively, the system implements an overdue detection mechanism based on a configurable threshold (`OVERDUE_THRESHOLD_DAYS`, set to 7 days by default).

Rather than running a continuous background job, the system leverages a **Lazy Update pattern**:
- Whenever an admin accesses the dashboard or the complaint list (`getAllComplaints` or `getDashboardStats`), the backend executes `updateOverdueComplaints()`.
- This function queries for all complaints where `status` is not `resolved`, `isOverdue` is `false`, and `createdAt` is older than `Date.now() - 7 days`. 
- It updates the `isOverdue` flag to `true` for these matched documents.
- Overdue complaints are then surfaced at the top of the admin views using a sort query (`{ isOverdue: -1, createdAt: -1 }`).

This approach minimizes unnecessary database polling while ensuring admins always see the latest overdue issues exactly when they need them.

## 3. Photo Handling
To allow visual evidence of complaints, the system handles image uploads using **Multer** and **Cloudinary**.

- When a resident creates a complaint or an admin creates a notice, they can upload image files. 
- The backend uses `multer` configured with memory storage to intercept the file during the API request. 
- The file buffer is then sent to the Cloudinary API using an upload stream (`uploadOnCloudinary` utility function).
- Cloudinary securely hosts the image, optimizes it, and returns a public, secure URL (`secure_url`). 
- This URL is saved in the MongoDB document. This decoupling prevents the backend servers from being bloated by large media files and provides fast image delivery to the React frontend.

## 4. Notification Flow
Email notifications ensure that residents remain informed about critical updates. The system uses **Nodemailer** integrated with a free-tier email provider (e.g., Gmail SMTP).

- **Status Changes**: When an admin updates a complaint's status, the `updateComplaintStatus` controller identifies the complaint owner. An email is immediately dispatched informing the user of the new status and any admin remarks.
- **Notice Board**: When an admin posts a new notice, they can mark it as "important". If flagged as important, the `createNotice` controller asynchronously queries all users with the `resident` role and loops through them to send an email broadcast about the pinned notice. This asynchronous processing prevents the API response from blocking, ensuring the admin experiences a fast UI interaction while notifications are sent in the background.
