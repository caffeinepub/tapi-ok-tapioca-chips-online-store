# Specification

## Summary
**Goal:** Increase the header logo size, add username/password authentication alongside Internet Identity, and add backend storage for user accounts, feedback submissions, and user-generated content.

**Planned changes:**
- Increase the TAPI OK logo size in the header while preserving layout and aspect ratio on all screen sizes
- Add username/password registration and login as an alternative auth option in the AuthModal alongside Internet Identity
- Add Motoko backend storage and functions for user accounts (`registerUser`, `loginUser`, `getUserProfile`) with hashed passwords and timestamps, persisted across upgrades
- Add Motoko backend storage and functions for feedback submissions (`submitFeedback`, `getAllFeedback` admin-only) with user ID, name, email, message, and timestamp, persisted across upgrades
- Add Motoko backend storage and functions for user-generated content (`createContent`, `getContentByUser`, `getAllContent` admin-only) with owner ID, content type, body, and timestamp, persisted across upgrades
- Update the FeedbackForm component to call the backend `submitFeedback` function and show success/error toasts based on the result

**User-visible outcome:** Users can register and log in with a username/email and password from any device, see a larger header logo, and have their feedback actually saved to the backend. Admins can retrieve all feedback and content via backend functions.
