# Split - The Easiest Way to Split Bills with Friends
Overview
Welcome to Split, your hassle-free solution for splitting bills and expenses with friends. Say goodbye to complex calculations and awkward conversations about money. With Split, you can effortlessly create groups, add expenses, and settle up with your friends in just a few clicks.

Features

1. User-Friendly Interface
  Split boasts an intuitive and user-friendly interface that makes the process of splitting bills a breeze. No more navigating through complicated menus or dealing with confusing features. With Split, simplicity is key.
  
2. Create Groups
  Easily organize your expenses by creating groups for different occasions. Whether it's a dinner with friends, a weekend getaway, or shared household expenses, Split lets you categorize and manage your bills efficiently.
  
3. Add Expenses
  Adding expenses has never been easier. Simply input the details of each expense, including the amount, description, and the participants involved. Split will handle the rest, ensuring accurate calculations without any manual effort.
  
4. Settle Up Seamlessly
  When it's time to settle up, Split streamlines the process. The platform calculates each participant's share, taking into account any adjustments or variations in contributions. No more headaches or disputes – just a clear, concise summary of who owes what.
  
5. No Math Required
  Forget about doing the math manually. Split automates the entire calculation process, saving you time and preventing errors. Enjoy the freedom to focus on your friendships rather than crunching numbers.
  

Getting Started
To get started with Split, follow these simple steps:

Create a Group: Start by creating a group for your shared expenses.
Add Expenses: Enter the details of each expense, specifying the participants involved.
Settle Up: When it's time to settle up, let Split do the calculations for you.
Support and Feedback
Have questions, feedback, or need assistance? I am here to help. Reach out to me at nitinkoche03@gmail.com.

Contribute
Interested in contributing to Split? Check out my GitHub repository and join the community.

# Setting Up Split Locally

To run Split locally on your machine, follow these steps:

1. **Create a PostgreSQL Database:**
  
  - Visit [https://neon.tech/](https://neon.tech/) or any other PostgreSQL provider to create a new database.
  - Obtain the connection URL for your PostgreSQL database.
2. **Copy .env.example to .env:**
  
  - Duplicate the `.env.example` file and rename the copy to `.env`.
3. **Populate the PostgreSQL Link in .env:**
  
  - Open the newly created `.env` file.
  - Replace the `DATABASE_URL` value with the connection URL you obtained from your PostgreSQL provider.
  
  Example `.env` file:
  
  ```
  DATABASE_URL=your_postgres_connection_url
  ```
  
4. **Run Prisma Migrate:**
  
  - Open your terminal and run the following command to set up the database schema:
  
  ```
  npx prisma migrate dev
  ```
  

5. **Install Dependencies:**
  
  - Run the following command to install the project dependencies:
    
  
  ```
  npm install
  ```
  
6. **Run the Development Server:**
  
  - Start the development server using the following commands:
    
  
  ```
  npm run dev
  ```
