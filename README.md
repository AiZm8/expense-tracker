# Expense Tracker

A full-stack expense tracking application built with modern cloud technologies. This project demonstrates the implementation of a React frontend with cloud deployment using AWS services and infrastructure as code principles. Currently has basic functionality as it was developed for the purpose of learning about the cloud technologies.

## Architecture

The application uses the following architecture:
- **Frontend**: React with TypeScript
- **Static Hosting**: AWS S3 (static file hosting) + CloudFront 
- **Database**: AWS DynamoDB (NoSQL database)
- **Infrastructure**: Managed with Terraform
- **Containerization**: Docker 

## Features
- Add and track expenses with descriptions and amounts
- View expense history
- Containerized for consistent development and deployment
- Cloud-based data persistence

## Project Structure
```
expense-tracker/
├── src/                  # React application source code
├── public/               # Static assets
├── terraform/            # Terraform configuration files
├── Dockerfile            # Multi-stage Docker configuration
├── nginx.conf           # Nginx configuration for production
└── README.md            # Project documentation
```

## Development Setup

### Prerequisites
- Node.js (v16+)
- AWS CLI configured with appropriate credentials
- Terraform CLI
- Docker Desktop

### Running Locally
1. Clone the repository
   ```
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

### Building with Docker
```
# Build the Docker image
docker build -t expense-tracker .

# Run the container locally
docker run -p 80:80 expense-tracker
```

## Deployment

### Infrastructure Setup with Terraform
1. Initialize Terraform
   ```
   cd terraform
   terraform init
   ```

2. Apply the configuration
   ```
   terraform apply
   ```

3. This will create:
   - S3 bucket for static hosting
   - CloudFront distribution
   - DynamoDB table for expense data

### Frontend Deployment
1. Build the React application
   ```
   npm run build
   ```

2. Deploy to S3
   ```
   aws s3 sync dist/ s3://your-bucket-name
   ```

## Learning Outcomes
- Implementing infrastructure as code with Terraform
- Configuring multi-stage Docker builds for production
- Setting up cloud services on AWS (S3, CloudFront, DynamoDB)
- Building a full-stack application with modern technologies
- Understanding cloud architecture principles

## Future Improvements
- Categorize expenses
- AI integration
- Expense analytics and reporting
- Budget setting and tracking
- Mobile responsive design
- Backend API deployment to EC2

## License
[MIT](LICENSE)
