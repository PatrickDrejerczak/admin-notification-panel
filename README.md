# Admin Notification Panel

A simple Angular application that allows admins to create and send notifications to users. The app features role-based access control, clean architecture, and reactive state management.

---

## 🚀 Build and Run the Application

1. Open a terminal in your desired location and clone the repository:

   ```bash
   git clone https://github.com/PatrickDrejerczak/admin-notification-panel.git
   ```

2. Navigate into the project directory:

   ```bash
   cd admin-notification-panel
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Serve the application locally:

   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

---

## 🧪 Run Unit Tests

To run the unit tests:

```bash
ng test
```

---

## 🔐 Login Credentials

- **User:**

  - Username: `user`
  - Password: `user`

- **Admin:**
  - Username: `admin`
  - Password: `admin`

---

## 🧭 Application Overview

This is a simple notification page that displays messages to the user based on their role.

### Key Features:

- **Role-based Access:**  
  A basic login system controls access to routes and content. Route guards prevent unauthorized access to the admin and notifications pages if the user is not authenticated.

- **User Role:**

  - Can view their notifications
  - Can dismiss notifications
  - Can log out

- **Admin Role:**

  - Has access to an additional **Admin Panel** from the notifications page
  - Can:
    - View all created notifications
    - Create, edit, delete notifications
    - Send notifications to users (not to self)

- **UX Feedback:**
  - All forms include validation
  - Toast notifications are used to confirm successful actions

---

## ⚙️ Technical Decisions

### Role Management

- **User Role Handling:**  
  Roles are stored in `sessionStorage` during login to simulate short-lived access tokens. All critical routes are protected by guards that check the user's role.

---

### 🏗️ Application Architecture

- Follows the **Nx** folder structure: `features`, `ui`, `data-access`
- Extended with: `interfaces`, `guards`
- Uses **Smart/Dumb Component** pattern for:

  - Component reusability
  - Separation of concerns

- Declarative approach:
  - Example: The `ModalComponent` uses declarative logic — it opens only when a notification is set to be edited, avoiding imperative methods like `open()`.

---

### 🧠 State Management

- Local state is managed using **Observables** with **Signals**, inspired by the Redux pattern.
- Influenced by:

  - [Deborah Kurata](https://www.youtube.com/watch?v=rHQa4SpekaA&ab_channel=DeborahKurata)
  - [Joshua Morony](https://www.youtube.com/watch?v=1Q7r4tagFns&ab_channel=JoshuaMorony)

---

### 📝 Forms

- Built with **Angular Reactive Forms**
- Uses built-in validators
- External libraries like `ngx-formly` were intentionally avoided to keep dependencies minimal

---

### ✅ Testing

- **Testing Framework:** Jest
- Coverage:
  - Services
  - Guards
  - `notification-form`
  - `modal` component
- Some repetitive or trivial components (e.g., login form) were not tested to reduce redundancy

---

## 🐛 Known Issues

1. **Mobile Responsiveness:**  
   The app is responsive for tablets and laptops, but forms may not display properly on phones.

2. **Notification Sync:**  
   If an admin deletes a notification after sending it, the user will not receive it.  
   Storing user notifications under separate keys in local storage was considered overkill for this scope.

---

## 🤖 Use of AI

AI was used throughout the development process for:

- **Styling (80%)**: SCSS/CSS generation based on instructions, with custom adjustments
- **Boilerplate Generation**: Especially for heavy components like `notification-form`
- **Regex Creation**: For URL validation
- **Material Modal Setup**: For the `ModalComponent`, with manual adjustments
- **Initial Guard & Form Test Creation**: With manual corrections for required signal inputs and test contexts
- **Documentation**: This README formatting and polishing
