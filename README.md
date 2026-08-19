# Segment Seat Allocation System

A modern, standalone **Bus Reservation Web Application** built with React, Vite, and React Router.

## Core Innovation
When a passenger cannot get the same seat for the entire bus journey across intermediate stops (e.g., `A → B → C → D`), the system intelligently allocates different seats for different journey segments so that the passenger can still complete their entire trip:
- **Priority 1**: 100% full journey coverage.
- **Priority 2**: Minimizes seat changes (e.g., 1 change vs 2 changes).
- **Priority 3**: Maximizes continuous segment coverage.
- **Priority 4**: Explains recommendation advantages.

---

## 🚀 How to Run the Project

1. Navigate to the project directory:
   ```bash
   cd C:\Users\nikhil\.gemini\antigravity\scratch\segment-seat-allocation-app
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the URL shown in terminal (e.g. `http://localhost:5173`).

---

## 🔑 Demo Credentials

### Passenger Portal
- **Email**: `passenger@example.com`
- **Password**: `passenger123`

### Operator Admin Portal
- **Username**: `admin`
- **Password**: `admin123`

---

## 📱 Complete Flow Demonstration

1. Log in as Passenger (`passenger@example.com` / `passenger123`).
2. Search for buses on route: `Hyderabad` → `Bangalore` on `20 Aug 2026`.
3. Select **ABC Travels (Express)**.
4. Note that single continuous seat is unavailable. Click **Use Segment Seat Allocation**.
5. View the system recommendation:
   - `Hyderabad → Kurnool`: Seat 10
   - `Kurnool → Anantapur`: Seat 10
   - `Anantapur → Bangalore`: Seat 15
6. Accept the recommendation or compare options on the **Optimal Seat Allocation** page.
7. Enter passenger details & submit.
8. Complete mock payment (UPI / Card).
9. View & print your **Booking Confirmation Ticket**.
10. Check **Booking History** dashboard.

### Admin Flow Demonstration
1. Log in as Admin (`admin` / `admin123`).
2. View fleet dashboard KPIs.
3. Click **Manage Buses** → **Config Seats**.
4. Change bus layout (e.g., from `2+2` to `2+1` or `Sleeper`).
5. Save changes.
6. Switch to Passenger view — notice the bus seat selection map instantly reflects the updated layout!
