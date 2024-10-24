CODE Student Task Manager

Overview

The Student Task Manager is designed specifically for students at CODE University of Applied Sciences in Berlin. This app organizes tasks and projects in one place to make student life easier.

Problem

Students often use multiple tools like Google Calendar, Notion, and Slack. Juggling these platforms can be confusing and time-consuming.

Why It's Important

Centralizing tools means less time switching between apps and more focus on learning and projects. This app integrates these tools, simplifying task and schedule management.

Goals

Centralized Hub: Combine daily tools into one platform.
Seamless Integration: Sync with Google Calendar and Notion.
Easy to Use: User-friendly interface for everyone.

Features

Index (Dashboard): Overview of tasks, progress, priorities, activities, and reminders.
My Lists: Manage task lists for projects or subjects.
New Lists: Add new lists for projects or organization.
Completed Tasks: Track and review completed tasks.
Settings: Customize preferences and update profiles.
Login: Secure access to tasks and information.

Backend Implementation

Static Routes: For pages like Dashboard, My Lists, New Lists, Completed Tasks, Settings, and Login.
Dynamic Route: /tasks/:id for accessing task pages with unique URLs.

Installation

Clone the Repository:

   

Install Dependencies:

   

Set Up MongoDB:

   Update the MongoDB URI in server.js with your credentials.

Start the Server:

   

Access the App:

   Open your browser and navigate to http://localhost:3000.

Usage

Dashboard: Get an overview of tasks and activities.
Manage Lists: Use "My Lists" and "New Lists" to organize tasks.
Track Progress: Check "Completed Tasks" for accomplishments.
Customize Settings: Adjust preferences in the settings page.

Dark Mode

Toggle dark mode; your preference is saved for future logins.

Contributing

Contributions are welcome! Fork the project and submit a pull request with ideas or improvements.

License

This project is licensed under the MIT License.

Contact

For questions or feedback, contact me at abeikusompa.nyarkolartey@code.berlin.
