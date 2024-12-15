# Craftors Corner

Craftors Corner is a platform that connects creators and enthusiasts of handmade crafts, offering a vibrant marketplace for showcasing, selling, and buying unique artisan products.

## Features
- **User Registration and Login**: Secure authentication for creators and buyers.
- **Marketplace**: Display and sell handmade crafts with detailed product pages.
- **Search and Filters**: Advanced search functionality to find specific craft items easily.
- **Custom Orders**: Option to request personalized creations from artisans.
- **Reviews and Ratings**: Buyers can leave feedback to help other users make informed decisions.
- **Secure Payments**: Integrated Stripe payment gateway for seamless and secure transactions.
- **Cloud Deployment**: Hosted on AWS for high availability and scalability.

## Technologies Used
- **Frontend**: Angular
- **Backend**: .NET Core
- **Database**: Dapper with SQL Server
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe
- **Deployment**: AWS (Amazon Web Services)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shubhamkohli19/workspace-management-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd craftors-corner
   ```
3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```
4. Set up the backend:
   - Navigate to the backend folder:
     ```bash
     cd ../backend
     ```
   - Restore .NET packages:
     ```bash
     dotnet restore
     ```
5. Set up environment variables:
   - Create a `appsettings.json` file in the `backend` folder and configure the following:
     ```json
     {
       "ConnectionStrings": {
        "DefaultConnection": "Server=craftercornerdb.c78we0yek9rn.ap-south-1.rds.amazonaws.com; Database=CraftersCornerDB; User ID=admin; Password=Shubham3630; Trusted_Connection=False; Encrypt=True;           
          TrustServerCertificate=True;"
      },
       "Jwt": {
        "Issuer": "*",
        "Audience": "*",
        "Key": "qB7x1Ust9DQV7Puk3eifZsmrUcEZuT2IKl2+eON9nbw="
      },
       "StripeSettings": {
          "SecretKey": "sk_test_51PGvrNSEMVeuq0qXfOAzDKRnh5YrQusvkMfVMdlYhiGhXfRCZxT2cQ3AkRZ850k64qspPU9yXgweTkPnZvuFiY2W00QksbgYsP",
          "PublishableKey": "pk_test_51PGvrNSEMVeuq0qXJOFBL5AeFsECL3PGA4ny7E3GJcEFTeLHY5RjfsY7oTmZxNOebZWBTO0CU42FGszCkPWU0fQS003qNdT5Kl"
        },
        "AllowedHosts": "*"
     }
     ```
6. Start the development servers:
   - Backend:
     ```bash
     dotnet run
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```

## How to Use
1. Sign up as a creator or buyer.
2. Creators can upload and manage their craft listings.
3. Buyers can browse, search, and purchase craft items.
4. Use the custom order feature to request tailored creations.
5. Complete payments securely using the Stripe integration.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```

